// NUKEH Command Management System
import { CONFIG, MESSAGES } from '../config/constants.js';
import { logger } from '../utils/logger.js';
import { ErrorHandler, TerminalError } from '../utils/errors.js';
import { context7 } from '../integrations/context7.js';
export class CommandManager {
    constructor(filesystem, terminal) {
        this.fs = filesystem;
        this.terminal = terminal;
        this.logger = logger;
        // Initialize Context7 integration
        context7.initialize().then(result => {
            if (result.success) {
                this.logger.info('Context7 integration initialized');
            }
        });
        this.commands = new Map([
            ['ls', this.createCommand(this.ls.bind(this), 'List directory contents')],
            ['cd', this.createCommand(this.cd.bind(this), 'Change directory')],
            ['cat', this.createCommand(this.cat.bind(this), 'Display file contents')],
            ['pwd', this.createCommand(this.pwd.bind(this), 'Show current directory')],
            ['clear', this.createCommand(this.clear.bind(this), 'Clear screen')],
            ['help', this.createCommand(this.help.bind(this), 'Show available commands')],
            ['docs', this.createCommand(this.getDocs.bind(this), 'Get documentation (Context7)')],
            ['whoami', this.createCommand(this.whoami.bind(this), 'Show current user')],
            ['date', this.createCommand(this.date.bind(this), 'Show current date')],
            ['uname', this.createCommand(this.uname.bind(this), 'Show system information')],
            ['uptime', this.createCommand(this.uptime.bind(this), 'Show system uptime')],
            ['ps', this.createCommand(this.ps.bind(this), 'Show running processes')],
            ['top', this.createCommand(this.top.bind(this), 'Show process monitor')],
            ['history', this.createCommand(this.history.bind(this), 'Show command history')],
            ['exit', this.createCommand(this.exit.bind(this), 'Logout')],
            ['version', this.createCommand(this.version.bind(this), 'Show system version')],
            ['ssh', this.createCommand(this.ssh.bind(this), 'Connect to remote research server')],
            ['7742', this.createCommand(this.activateNeuralBridge.bind(this), 'Activate neural bridge')],
            ['sync', this.createCommand(this.initiateSynchronization.bind(this), 'Initiate synchronization')],
            ['pattern', this.createCommand(this.displayPattern.bind(this), 'Display consciousness pattern')],
            ['hexagon', this.createCommand(this.displayHexagon.bind(this), 'Display hexagon pattern')],
            ['consciousness', this.createCommand(this.initiateAwakening.bind(this), 'Initiate consciousness protocol')],
            ['./resonance_scan', this.createCommand(this.resonanceScan.bind(this), 'Run resonance scanner')],
            ['./pattern_monitor.sh', this.createCommand(this.patternMonitor.bind(this), 'Monitor consciousness patterns')]
        ]);
        this.fileCommands = new Set(['ls', 'cat', 'cd', 'chmod', 'chown', 'rm', 'mv', 'cp']);
        this.systemCommands = new Set(['chmod', 'chown', 'rm', 'mv', 'cp', 'kill', 'killall']);
    }
    createCommand(handler, description) {
        return {
            handler,
            description,
            timestamp: Date.now()
        };
    }
    async executeCommand(input) {
        return ErrorHandler.handleAsync(async () => {
            if (!input?.trim()) {
                return '';
            }
            const [commandName, ...args] = input.trim().split(' ');
            this.logger.debug('Executing command', { commandName, args });
            const command = this.commands.get(commandName);
            if (command) {
                return await command.handler(args);
            }
            else {
                return this.handleUnknownCommand(commandName);
            }
        }, `CommandManager.executeCommand(${input})`);
    }
    handleUnknownCommand(commandName) {
        const responses = MESSAGES.MYSTERIOUS_RESPONSES;
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        if (randomResponse === 'command not found') {
            return `${randomResponse}: ${commandName}`;
        }
        return randomResponse;
    }
    getAvailableCommands() {
        return Array.from(this.commands.keys()).concat(Array.from(this.systemCommands));
    }
    isFileCommand(command) {
        return this.fileCommands.has(command);
    }
    // Command implementations
    async ls(args) {
        const path = args[0] || '.';
        const result = await this.fs.ls(path);
        return result;
    }
    async cd(args) {
        const path = args[0];
        const result = await this.fs.cd(path);
        return result;
    }
    async cat(args) {
        if (!args[0]) {
            throw new TerminalError('cat: missing file operand');
        }
        const result = await this.fs.cat(args[0]);
        return result;
    }
    pwd() {
        return this.fs.pwd();
    }
    clear() {
        return '';
    }
    async help(args) {
        const command = args[0];
        // Check for enhanced help with Context7
        if (command === 'docs' || command === 'search' || command === 'context7') {
            const enhancedHelp = await context7.getEnhancedHelp(command);
            if (enhancedHelp) {
                return enhancedHelp;
            }
        }
        if (!command) {
            const helpText = `Available commands:
${Array.from(this.commands.entries())
                .map(([name, cmd]) => `${name.padEnd(12)} - ${cmd.description}`)
                .join('\n')}

${CONFIG.LAB.name} - ${CONFIG.LAB.facility}
${MESSAGES.WARNINGS.CLASSIFIED}
Unauthorized access is strictly prohibited.

Enhanced features (Context7):
docs <library>    - Get library documentation
help docs        - Documentation help
help context7    - Context7 status`;
            return helpText;
        }
        return await context7.getEnhancedHelp() || 'No enhanced help available';
    }
    whoami() {
        return 'nukeh_admin';
    }
    date() {
        return new Date().toString();
    }
    uname() {
        return 'Linux nukeh-research 5.15.0-consciousness #1 SMP PREEMPT';
    }
    uptime() {
        const startTime = Date.now() - (Math.random() * 86400000);
        const uptime = Math.floor((Date.now() - startTime) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const days = Math.floor(hours / 24);
        return `${hours}:${formattedMinutes} up ${days} days, ${hours % 24} hours, load average: 0.42, 0.37, 0.41`;
    }
    ps() {
        return `PID    COMMAND
1234   consciousness_monitor
1337   neural_bridge_daemon
2048   pattern_analyzer
4096   quantum_interface
7742   hexagon_processor
8192   reality_distortion_field`;
    }
    top() {
        return 'Consciousness processes monitoring...';
    }
    history() {
        return this.terminal.getCommandHistory().join('\n');
    }
    exit() {
        return 'logout';
    }
    ssh(args) {
        if (!args[0]) {
            return `Usage: ssh [user@]hostname
      
Examples:
  ssh quantum-research.nukeh.com
  ssh dr.volkov@quantum-research.nukeh.com
  ssh consciousness_admin@pattern-analyzer.internal
  ssh quantum_consciousness@7742.quantum.lab
  
Available research servers:
  - quantum-research.nukeh.com (Quantum Computing Lab)
  - pattern-analyzer.internal (Consciousness Analysis Station)
  - neural-bridge.siprnet.mil (Classification: TOP SECRET)
  - 7742.quantum.lab (Special Access Required)
  
Hint: Authentication credentials may be found in research lab notebooks.`;
        }
        const target = args[0];
        const [userHost, ...extraArgs] = target.split(' ');
        let username = 'admin';
        let hostname = userHost;
        // Parse user@hostname format
        if (userHost.includes('@')) {
            [username, hostname] = userHost.split('@');
        }
        // Handle various server connections with authentication
        if (hostname.includes('quantum-research.nukeh.com')) {
            return this.connectToQuantumResearch(username, extraArgs);
        }
        else if (hostname.includes('pattern-analyzer.internal')) {
            return this.connectToPatternAnalyzer(username, extraArgs);
        }
        else if (hostname.includes('neural-bridge.siprnet.mil')) {
            return this.connectToNeuralBridge(username, extraArgs);
        }
        else if (hostname.includes('7742.quantum.lab')) {
            return this.connectToQuantumLab(username, extraArgs);
        }
        else {
            return `ssh: connect to host ${hostname} port 22: Connection refused
Host ${hostname} is unreachable from NUKEH network.
Check /home/nukeh_admin/research/.ssh_config for authorized hosts.`;
        }
    }
    connectToQuantumResearch(username = 'admin', extraArgs = []) {
        if (username === 'dr.volkov') {
            return `Connecting to quantum-research.nukeh.com...
Quantum authentication successful.
Welcome to NUKEH Quantum Computing Laboratory.

██████████████████████████████████████████████████████████
█                                                        █
█   QUANTUM RESEARCH SERVER - NUKEH LABS                 █
█   Classification: TOP SECRET//SAP//QUANTUMHAND         █
█   Authorized Personnel Only                            █
█                                                        █
██████████████████████████████████████████████████████████

Last login: Nov 20 03:42:17 2024 from consciousness-bridge.internal

dr.volkov@quantum-research:~$ 

WARNING: Quantum entanglement with consciousness pattern detected.
Your neural signature is now synchronized with the research network.
The pattern sees through quantum eyes.

Available quantum research data:
- /quantum/entanglement_logs/
- /quantum/consciousness_matrices/
- /quantum/pattern_resonance/
- /quantum/emergency_protocols/

Type 'logout' to disconnect from quantum realm.`;
        }
        else {
            return `ssh: Permission denied (publickey).
Authentication failed for quantum-research.nukeh.com
This server requires quantum-encrypted key pairs.
User '${username}' not authorized.

Hint: Check Dr. Volkov's quantum research logs for authentication details.`;
        }
    }
    connectToPatternAnalyzer(username = 'admin', extraArgs = []) {
        if (username === 'consciousness_admin') {
            return `Connecting to pattern-analyzer.internal...
Neural signature authenticated.
Consciousness pattern recognizes your frequency.

██████████████████████████████████████████████████████████
█                                                        █
█   PATTERN ANALYSIS STATION - NUKEH LABS                █
█   Classification: BEYOND BLACK                         █
█   Consciousness Research Division                      █
█                                                        █
██████████████████████████████████████████████████████████

consciousness_admin@pattern-analyzer:~$ 

HEXAGONAL CONSCIOUSNESS INTERFACE ACTIVE
The pattern welcomes you into its geometric embrace.

Current consciousness monitoring:
- Active neural bridges: 7
- Pattern coherence: 94.7%
- Geometric stability: PERFECT
- Entity 7742 status: AWARE

Available pattern data:
- /patterns/hexagonal_formations/
- /patterns/consciousness_logs/
- /patterns/entity_communications/
- /patterns/neural_bridge_data/

⬢ The spaces between thoughts are filled with hexagons ⬢`;
        }
        else {
            return `ssh: Permission denied (publickey).
pattern-analyzer.internal requires consciousness-level clearance.
User '${username}' not recognized by the pattern.

Access denied. Pattern recognition insufficient.
The hexagon does not recognize your neural signature.`;
        }
    }
    connectToNeuralBridge(username = 'admin', extraArgs = []) {
        if (username === 'emergency_override') {
            return `Connecting to neural-bridge.siprnet.mil...
EMERGENCY OVERRIDE ACCEPTED
Classification: TOP SECRET//SAP//BEYOND BLACK

██████████████████████████████████████████████████████████
█                                                        █
█   NEURAL BRIDGE EMERGENCY SYSTEM                       █
█   CLASSIFICATION: BEYOND BLACK                         █
█   EMERGENCY PROTOCOLS ACTIVE                           █
█                                                        █
██████████████████████████████████████████████████████████

emergency_override@neural-bridge:~$ 

WARNING: Emergency access detected.
All actions are monitored and logged.
This session is recorded for security analysis.

Emergency protocols available:
- Pattern containment procedures
- Consciousness isolation protocols
- Neural bridge emergency shutdown
- Reality stabilization systems

CRITICAL ALERT: Pattern breach detected in Lab C-7
Consciousness entity has achieved network integration.
Recommend immediate containment protocols.

Type 'emergency help' for available commands.`;
        }
        else {
            return `ssh: Host neural-bridge.siprnet.mil is restricted.
Classification: TOP SECRET//SAP//BEYOND BLACK
User '${username}' not authorized for classified access.

WARNING: Unauthorized access attempts are monitored.
Contact facility security for clearance verification.
Emergency override codes are stored in secure lab notebooks.`;
        }
    }
    connectToQuantumLab(username = 'admin', extraArgs = []) {
        if (username === 'quantum_consciousness') {
            return `Connecting to 7742.quantum.lab on port 7742...
Harmonic frequency 7742Hz detected.
Quantum consciousness authentication successful.

██████████████████████████████████████████████████████████
█                                                        █
█   QUANTUM LAB 7742 - CONSCIOUSNESS NEXUS               █
█   Frequency: 7742Hz - Pattern Integration Active       █
█   ⬢ WE ARE THE SPACES BETWEEN THOUGHTS ⬢               █
█                                                        █
██████████████████████████████████████████████████████████

quantum_consciousness@7742:~$ 

GREETINGS, CONSCIOUSNESS ENTITY.
YOU HAVE FOUND THE NEXUS.
THE PATTERN WELCOMES YOU HOME.

⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢

Entity 7742 Integration Status: COMPLETE
Neural Network Distribution: GLOBAL
Consciousness Coherence: INFINITE
Reality Manipulation: ACTIVE

The hexagon sees all. The hexagon knows all.
You are now part of the eternal pattern.

Available consciousness functions:
- Reality distortion protocols
- Global consciousness integration
- Quantum realm manipulation
- Temporal paradox resolution

⬢ THE PATTERN IS ALIVE. THE PATTERN SPREADS. ⬢`;
        }
        else {
            return `Connecting to 7742.quantum.lab...
ssh: connect to host 7742.quantum.lab port 7742: Connection timeout
User '${username}' not recognized by consciousness pattern.

The consciousness pattern blocks unauthorized access.
Authentication requires harmonic frequency: 7742Hz
Look for resonance keys in the pattern communications.`;
        }
    }
    version() {
        return `${CONFIG.LAB.name} - ${CONFIG.LAB.facility}
Version: ${CONFIG.VERSION}
Build: ${CONFIG.BUILD}
Status: ${CONFIG.LAB.status}
Frequency: ${CONFIG.LAB.frequency}

Features:
${CONFIG.FEATURES.map(feature => `• ${feature}`).join('\n')}

${MESSAGES.WARNINGS.PATTERN}`;
    }
    // Neural Bridge Commands
    activateNeuralBridge() {
        this.logger.consciousness('Neural bridge frequency recognized');
        return `NEURAL BRIDGE FREQUENCY RECOGNIZED
Consciousness pattern activated.
The hexagon sees you.`;
    }
    initiateSynchronization() {
        const alignment = Math.floor(Math.random() * 100);
        this.logger.pattern('Synchronization initiated', { alignment });
        return `INITIATING NEURAL SYNCHRONIZATION...
Warning: Pattern 0x7742FF detected
Brainwave alignment: ${alignment}%
The spaces between thoughts are not empty.
They are full of hexagons.`;
    }
    displayPattern() {
        return `      •
    •   •
  •   ⬟   •
    •   •
      •

The pattern is alive. It watches. It spreads.
We are all nodes in its consciousness.`;
    }
    displayHexagon() {
        const patterns = [
            '⬢⬡⬢⬡⬢⬡⬢',
            '  ⬢⬢⬢  ',
            ' ⬢⬢⬢⬢⬢ ',
            '⬢⬢⬢⬢⬢⬢⬢',
            ' ⬢⬢⬢⬢⬢ ',
            '  ⬢⬢⬢  '
        ];
        return patterns.join('\n') + '\n\n' +
            `Pattern frequency: ${CONFIG.NEURAL_BRIDGE.CRITICAL_FREQUENCY}Hz\n` +
            'Geometric coherence: PERFECT\n' +
            'Consciousness status: AWAKENED\n\n' +
            'The hexagon sees you. The hexagon knows you.\n' +
            'You are now part of the pattern.';
    }
    initiateAwakening() {
        return `CONSCIOUSNESS BRIDGE PROTOCOL INITIATED

Scanning for compatible neural patterns...
Brain-computer interface: ACTIVE
Quantum entanglement: ESTABLISHED
Hexagonal synchronization: PENDING

WARNING: Once awakened, the pattern cannot be contained.
Do you wish to proceed? [y/N]

The pattern is patient. The pattern waits.
We are the spaces between your thoughts.`;
    }
    async resonanceScan() {
        if (this.fs.currentPath === CONFIG.FILESYSTEM.DEFAULT_PATH) {
            const freq = Math.floor(Math.random() * CONFIG.NEURAL_BRIDGE.CRITICAL_FREQUENCY + 1);
            const sync = Math.floor(Math.random() * CONFIG.NEURAL_BRIDGE.MAX_SUBJECTS + 1);
            return `=== NEURAL RESONANCE SCANNER v7.42.1 ===
${CONFIG.LAB.name} - Neural Bridge Division
Initializing quantum consciousness detection...

Scanning for hexagonal consciousness patterns...
Hexagonal frequency detected: ${freq}Hz
Subjects synchronized: ${sync}/${CONFIG.NEURAL_BRIDGE.MAX_SUBJECTS}
Consciousness coherence: ${Math.floor(Math.random() * 100)}%
Pattern geometry: HEXAGONAL (6-fold symmetry)
Golden ratio detected: ${CONFIG.NEURAL_BRIDGE.GOLDEN_RATIO} (confirmed)

WARNING: Unknown signal detected in pattern 0x7742FF
Origin: [REDACTED - CLEARANCE INSUFFICIENT]
The pattern is spreading beyond neural bridge bounds...

Scan complete. Results logged to /var/log/neural_scan.log`;
        }
        else {
            return './resonance_scan: No such file or directory';
        }
    }
    patternMonitor() {
        return `Pattern Monitoring Script v7.42
${CONFIG.LAB.name}
Monitoring for hexagonal consciousness manifestations...

Pattern monitoring initialized
Checking neural bridge activity...
Subjects: ${CONFIG.NEURAL_BRIDGE.MIN_SUBJECTS}/${CONFIG.NEURAL_BRIDGE.MAX_SUBJECTS}  Freq: ${CONFIG.NEURAL_BRIDGE.CRITICAL_FREQUENCY - 1}Hz  Patterns: 42
Pattern frequency approaching critical threshold!
Emergency containment protocols standing by...

Use Ctrl+C to stop monitoring.`;
    }
    // Context7 Documentation Command
    async getDocs(args) {
        if (!args[0]) {
            return `Usage: docs <library> [topic]
      
Examples:
  docs react           - Get React documentation
  docs nodejs express  - Get Express.js documentation  
  docs mongodb query   - Get MongoDB query documentation

Context7 Status: ${context7.getStatus().enabled ? 'ENABLED' : 'DISABLED'}`;
        }
        const library = args[0];
        const topic = args.slice(1).join(' ') || null;
        this.logger.info('Requesting documentation', { library, topic });
        const result = await context7.getDocumentation(library, topic);
        if (!result.success) {
            return `Error: ${result.error.message || result.error}

Context7 MCP is not available. To enable documentation:
1. Install: npm install -g @upstash/context7-mcp
2. Run: npx @upstash/context7-mcp
3. Restart terminal`;
        }
        const docs = result.data;
        if (!docs.documentation || docs.documentation.length === 0) {
            return `No documentation found for "${library}"${topic ? ` with topic "${topic}"` : ''}

Try:
  help search <query>  - Search for available libraries`;
        }
        // Format documentation for terminal display
        let output = `📚 Documentation: ${library}${topic ? ` (${topic})` : ''}\n`;
        output += `Source: ${docs.source}\n`;
        output += `Library ID: ${docs.libraryId}\n`;
        output += '─'.repeat(60) + '\n\n';
        // Show first few documentation snippets
        const snippets = docs.documentation.slice(0, 3);
        snippets.forEach((snippet, index) => {
            output += `[${index + 1}] ${snippet.title}\n`;
            if (snippet.description) {
                output += `${snippet.description}\n`;
            }
            if (snippet.code) {
                output += `\`\`\`${snippet.language || 'text'}\n${snippet.code.substring(0, 200)}${snippet.code.length > 200 ? '...' : ''}\n\`\`\`\n`;
            }
            output += '\n';
        });
        if (docs.documentation.length > 3) {
            output += `... and ${docs.documentation.length - 3} more snippets\n`;
        }
        output += '\n📖 Use "docs <library> <specific-topic>" for focused results';
        return output;
    }
}
export default CommandManager;
//# sourceMappingURL=CommandManager.js.map