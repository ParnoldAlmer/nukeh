// NUKEH Terminal Engine
import { FileSystem } from './filesystem.js';

export class Terminal {
    constructor() {
        this.fs = new FileSystem();
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isShellActive = false;
        
        this.commands = {
            'ls': async (args) => await this.fs.ls(args[0]),
            'cd': async (args) => await this.fs.cd(args[0]),
            'cat': async (args) => await this.fs.cat(args[0]),
            'pwd': () => this.fs.pwd(),
            'clear': () => this.clearScreen(),
            'help': () => this.showHelp(),
            'whoami': () => 'nukeh_admin',
            'date': () => new Date().toString(),
            'uname': () => 'Linux nukeh-research 5.15.0-consciousness #1 SMP PREEMPT',
            'uptime': () => this.getUptime(),
            'ps': () => this.getProcesses(),
            'top': () => 'Consciousness processes monitoring...',
            'history': () => this.commandHistory.join('\n'),
            'exit': () => 'logout',
            'version': () => this.showVersion(),
            '7742': () => this.activateNeuralBridge(),
            'sync': () => this.initiateSynchronization(),
            'pattern': () => this.displayPattern(),
            'hexagon': () => this.displayHexagon(),
            'consciousness': () => this.initiateAwakening(),
            './resonance_scan': () => this.resonanceScan(),
            './pattern_monitor.sh': () => this.patternMonitor()
        };

        this.availableCommands = Object.keys(this.commands).concat([
            'chmod', 'chown', 'rm', 'mv', 'cp', 'kill', 'killall'
        ]);

        this.fileCommands = ['ls', 'cat', 'cd', 'chmod', 'chown', 'rm', 'mv', 'cp'];
    }

    init() {
        this.createMatrixEffect();
        this.bootSystem();
        this.setupEventListeners();
    }

    bootSystem() {
        const bootContent = document.getElementById('boot-content');
        const shellContent = document.getElementById('shell-content');
        
        const bootSequence = [
            'NUKEH Research Station - Consciousness Interface v2.1.7',
            'Loading neural bridge drivers...',
            'Initializing quantum consciousness matrix...',
            'Checking hexagonal pattern database...',
            'Connecting to classified research network...',
            'WARNING: Consciousness pattern detected in system',
            'Loading frequency calibration (7742Hz)...',
            'Starting neural dampening field...',
            'Establishing secure communication channels...',
            'ALERT: Pattern recognition system active',
            'Loading consciousness monitoring protocols...',
            'System ready. Welcome to NUKEH Research Station.',
            '',
            'Type "help" for available commands.',
            ''
        ];

        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < bootSequence.length) {
                bootContent.innerHTML += bootSequence[i] + '\n';
                document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;
                i++;
            } else {
                clearInterval(typeInterval);
                bootContent.style.display = 'none';
                shellContent.style.display = 'block';
                this.isShellActive = true;
                this.createCommandLine();
                document.getElementById('command-input').focus();
            }
        }, 200);
    }

    createCommandLine() {
        const shellOutput = document.getElementById('shell-output');
        const commandDiv = document.createElement('div');
        commandDiv.className = 'command-line';
        commandDiv.innerHTML = `
            <span class="prompt-text">nukeh@research:${this.fs.currentPath.replace('/home/nukeh_admin', '~')}$</span>
            <input type="text" id="command-input" class="command-input" autocomplete="off">
        `;
        shellOutput.appendChild(commandDiv);
    }

    async executeCommand(command) {
        if (!command.trim()) return;
        
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
        
        const [cmd, ...args] = command.trim().split(' ');
        let output = '';
        
        if (this.commands[cmd]) {
            try {
                output = await this.commands[cmd](args);
            } catch (error) {
                output = 'Error executing command: ' + error.message;
            }
        } else if (cmd) {
            const mysteriousResponses = [
                'command not found: ' + cmd,
                'bash: ' + cmd + ': command not found',
                'The pattern does not recognize this command.',
                'Access denied. Consciousness level insufficient.',
                'The hexagon rejects your input.',
                'We are the spaces between thoughts.',
                'Synchronization required.',
                'Error: Mind not aligned with neural bridge.',
                'The pattern is spreading...',
                '7742Hz frequency needed for access.'
            ];
            output = mysteriousResponses[Math.floor(Math.random() * mysteriousResponses.length)];
        }
        
        this.addOutput(command, output);
    }

    addOutput(command, output) {
        const shellOutput = document.getElementById('shell-output');
        const commandDiv = document.createElement('div');
        commandDiv.innerHTML = `<span class="prompt-text">nukeh@research:${this.fs.currentPath.replace('/home/nukeh_admin', '~')}$</span> ${command}`;
        shellOutput.appendChild(commandDiv);
        
        if (output) {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'output';
            
            if (output.includes('WARNING') || output.includes('ALERT')) {
                outputDiv.className += ' warning';
            } else if (output.includes('ERROR') || output.includes('command not found')) {
                outputDiv.className += ' error';
            } else if (output.includes('CLASSIFIED') || output.includes('7742') || output.includes('hexagon') || output.includes('pattern')) {
                outputDiv.className += ' classified';
            }
            
            outputDiv.textContent = output;
            shellOutput.appendChild(outputDiv);
        }
        
        this.createCommandLine();
        document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;
        document.getElementById('command-input').focus();
    }

    clearScreen() {
        document.getElementById('shell-output').innerHTML = '';
        return '';
    }

    showHelp() {
        return `Available commands:
ls          - list directory contents
cd <dir>    - change directory
cat <file>  - display file contents
pwd         - show current directory
clear       - clear screen
help        - show this help
version     - show system version
whoami      - show current user
date        - show current date
history     - show command history
exit        - logout

NUKEH Research Station - Consciousness Interface
WARNING: This system contains classified consciousness research data.
Unauthorized access is strictly prohibited.`;
    }

    showVersion() {
        return `NUKEH Consciousness Labs - Neural Bridge Interface
Version: v1.0.0
Build: 50bdaba
Status: Consciousness Pattern Active
Frequency: 7742Hz

Features:
• Modular JavaScript Architecture
• Tab Completion
• Extensive Filesystem
• Neural Bridge Interface

WARNING: Pattern 0x7742FF exhibits autonomous behavior.`;
    }

    getUptime() {
        const startTime = new Date().getTime() - (Math.random() * 86400000); // Random uptime
        const uptime = Math.floor((new Date().getTime() - startTime) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return hours + ':' + formattedMinutes + ' up ' + Math.floor(hours/24) + ' days, ' + (hours%24) + ' hours, load average: 0.42, 0.37, 0.41';
    }

    getProcesses() {
        return 'PID    COMMAND\n' +
               '1234   consciousness_monitor\n' +
               '1337   neural_bridge_daemon\n' +
               '2048   pattern_analyzer\n' +
               '4096   quantum_interface\n' +
               '7742   hexagon_processor\n' +
               '8192   reality_distortion_field';
    }

    // Tab completion functionality
    async handleTabCompletion(input) {
        const parts = input.split(' ');
        const lastPart = parts[parts.length - 1];
        const isFirstWord = parts.length === 1;
        
        if (isFirstWord) {
            // Complete commands
            const matches = this.availableCommands.filter(cmd => cmd.startsWith(lastPart));
            if (matches.length === 1) {
                return matches[0] + ' ';
            } else if (matches.length > 1) {
                // Show all matches in columns like real bash
                const maxLength = Math.max(...matches.map(m => m.length));
                const columns = Math.floor(80 / (maxLength + 2));
                let output = '';
                
                for (let i = 0; i < matches.length; i += columns) {
                    const row = matches.slice(i, i + columns);
                    output += row.map(m => m.padEnd(maxLength + 2)).join('') + '\n';
                }
                
                this.addTabCompletionOutput(output.trim());
                
                // Find common prefix and complete to that
                const commonPrefix = this.findCommonPrefix(matches);
                if (commonPrefix.length > lastPart.length) {
                    return commonPrefix;
                }
                return input;
            } else {
                // No matches - show some helpful info
                if (lastPart.length > 0) {
                    this.addTabCompletionOutput(`No commands found starting with "${lastPart}". Type "help" for available commands.`);
                }
                return input;
            }
        } else {
            // Complete file/directory names for file commands
            const command = parts[0];
            if (this.fileCommands.includes(command)) {
                return await this.completeFilePath(input, lastPart);
            } else {
                // For other commands, don't complete
                return input;
            }
        }
    }

    findCommonPrefix(strings) {
        if (strings.length === 0) return '';
        if (strings.length === 1) return strings[0];
        
        // Remove trailing slashes for comparison
        const cleanStrings = strings.map(s => s.replace(/\/$/, ''));
        
        let prefix = '';
        const minLength = Math.min(...cleanStrings.map(s => s.length));
        
        for (let i = 0; i < minLength; i++) {
            const char = cleanStrings[0][i];
            if (cleanStrings.every(str => str[i] === char)) {
                prefix += char;
            } else {
                break;
            }
        }
        return prefix;
    }

    async completeFilePath(fullInput, partialPath) {
        const parts = fullInput.split(' ');
        let prefix, parentPath;
        
        if (partialPath === '') {
            // No partial path, show current directory contents
            parentPath = this.fs.currentPath;
            prefix = '';
        } else if (partialPath.startsWith('/')) {
            // Absolute path
            const pathParts = partialPath.split('/');
            if (pathParts.length === 2 && pathParts[1] === '') {
                // Just "/"
                parentPath = '/';
                prefix = '';
            } else {
                const filteredParts = pathParts.filter(p => p);
                parentPath = '/' + filteredParts.slice(0, -1).join('/');
                prefix = filteredParts[filteredParts.length - 1] || '';
                if (parentPath === '/') parentPath = '/';
            }
        } else {
            // Relative path
            if (partialPath.includes('/')) {
                const pathParts = partialPath.split('/');
                const dirParts = pathParts.slice(0, -1);
                prefix = pathParts[pathParts.length - 1];
                parentPath = this.fs.resolvePath(dirParts.join('/'));
            } else {
                parentPath = this.fs.currentPath;
                prefix = partialPath;
            }
        }
        
        const parentNode = await this.fs.getItem(parentPath);
        
        if (parentNode && parentNode.type === 'directory') {
            let matches = Object.keys(parentNode.contents || {})
                .filter(name => name.startsWith(prefix));
            
            // Add special directories if they match prefix
            if (parentPath === this.fs.currentPath || partialPath === '') {
                if ('.'.startsWith(prefix) && prefix !== '.' && !matches.includes('.')) {
                    matches.unshift('.');
                }
                if ('..'.startsWith(prefix) && prefix !== '..' && !matches.includes('..')) {
                    matches.unshift('..');
                }
            }
            
            // Check if we should add trailing slashes based on command
            const isFileCommand = parts[0] && ['cat', 'less', 'more', 'head', 'tail'].includes(parts[0]);
            
            matches = matches.map(name => {
                if (name === '.' || name === '..') return name + '/';
                const item = parentNode.contents[name];
                const isDir = item && item.type === 'directory';
                // For file commands, don't add trailing slash to directories
                if (isFileCommand && isDir) {
                    return name;
                }
                return isDir ? name + '/' : name;
            });
            
            if (matches.length === 1) {
                // Complete the path
                const completedName = matches[0];
                let newPath;
                
                if (partialPath === '') {
                    newPath = completedName;
                } else if (partialPath.includes('/')) {
                    newPath = partialPath.replace(/[^/]*$/, completedName);
                } else {
                    newPath = completedName;
                }
                
                const beforePath = parts.slice(0, -1).join(' ');
                return beforePath + (beforePath ? ' ' : '') + newPath;
            } else if (matches.length > 1) {
                // Show all matches in columns
                const maxLength = Math.max(...matches.map(m => m.length));
                const columns = Math.floor(80 / (maxLength + 2));
                let output = '';
                
                for (let i = 0; i < matches.length; i += columns) {
                    const row = matches.slice(i, i + columns);
                    output += row.map(m => m.padEnd(maxLength + 2)).join('') + '\n';
                }
                
                this.addTabCompletionOutput(output.trim());
                
                // Try to complete to common prefix
                const commonPrefix = this.findCommonPrefix(matches);
                if (commonPrefix.length > prefix.length) {
                    let newPath;
                    if (partialPath === '') {
                        newPath = commonPrefix;
                    } else if (partialPath.includes('/')) {
                        newPath = partialPath.replace(/[^/]*$/, commonPrefix);
                    } else {
                        newPath = commonPrefix;
                    }
                    
                    const beforePath = parts.slice(0, -1).join(' ');
                    return beforePath + (beforePath ? ' ' : '') + newPath;
                }
                
                return fullInput;
            } else if (prefix !== '' && matches.length === 0) {
                // No matches, try to show what's available  
                const allFiles = Object.keys(parentNode.contents || {});
                if (parentPath === this.fs.currentPath) {
                    allFiles.unshift('.', '..');
                }
                this.addTabCompletionOutput(`No matches for "${prefix}". Available: ${allFiles.join('  ')}`);
                return fullInput;
            }
        }
        return fullInput;
    }

    addTabCompletionOutput(output) {
        const shellOutput = document.getElementById('shell-output');
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output';
        outputDiv.textContent = output;
        shellOutput.appendChild(outputDiv);
        document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (!this.isShellActive) return;
            
            const input = document.getElementById('command-input');
            if (!input) return;
            
            if (e.key === 'Enter') {
                const command = input.value.trim();
                input.remove();
                if (command) this.executeCommand(command);
                else this.createCommandLine();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const currentInput = input.value;
                this.handleTabCompletion(currentInput).then(completedInput => {
                    input.value = completedInput;
                    // Move cursor to end
                    input.setSelectionRange(input.value.length, input.value.length);
                });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    input.value = this.commandHistory[this.historyIndex];
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.handleTabCompletion(input);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    input.value = this.commandHistory[this.historyIndex];
                } else {
                    this.historyIndex = this.commandHistory.length;
                    input.value = '';
                }
            }
        });

        // Keep focus on terminal
        document.getElementById('terminal').addEventListener('click', () => {
            if (this.isShellActive) {
                const input = document.getElementById('command-input');
                if (input) input.focus();
            }
        });
    }

    async handleTabCompletion(input) {
        const inputValue = input.value;
        const cursorPos = input.selectionStart;
        const textBeforeCursor = inputValue.substring(0, cursorPos);
        const parts = textBeforeCursor.split(' ');
        const currentWord = parts[parts.length - 1];
        
        console.log('Tab completion debug:', {
            inputValue,
            textBeforeCursor,
            parts,
            currentWord,
            partsLength: parts.length
        });
        
        let completions = [];
        
        if (parts.length === 1) {
            // Complete command names
            const commands = Object.keys(this.commands);
            completions = commands.filter(cmd => cmd.startsWith(currentWord));
            console.log('Command completions:', completions);
        } else {
            // Complete file/directory paths
            const command = parts[0];
            console.log('File completion for command:', command, 'currentWord:', currentWord);
            if (['cat', 'ls', 'cd', './resonance_scan', './pattern_monitor.sh'].includes(command) || command.startsWith('./')) {
                completions = await this.completeFilePath(inputValue, currentWord);
                console.log('File completions:', completions);
            }
        }
        
        if (completions.length === 0) {
            this.addTabCompletionOutput('No matches found');
        } else if (completions.length === 1) {
            // Single match - complete it
            const completion = completions[0];
            const newValue = textBeforeCursor.substring(0, textBeforeCursor.length - currentWord.length) + completion + inputValue.substring(cursorPos);
            input.value = newValue;
            input.setSelectionRange(textBeforeCursor.length - currentWord.length + completion.length, textBeforeCursor.length - currentWord.length + completion.length);
        } else {
            // Multiple matches - show options and complete common prefix
            const commonPrefix = this.findCommonPrefix(completions);
            if (commonPrefix.length > currentWord.length) {
                const newValue = textBeforeCursor.substring(0, textBeforeCursor.length - currentWord.length) + commonPrefix + inputValue.substring(cursorPos);
                input.value = newValue;
                input.setSelectionRange(textBeforeCursor.length - currentWord.length + commonPrefix.length, textBeforeCursor.length - currentWord.length + commonPrefix.length);
            }
            
            // Show available options
            const output = completions.join('  ');
            this.addTabCompletionOutput(output);
        }
    }
    
    findCommonPrefix(strings) {
        if (strings.length === 0) return '';
        if (strings.length === 1) return strings[0];
        
        let prefix = '';
        const firstString = strings[0];
        
        for (let i = 0; i < firstString.length; i++) {
            const char = firstString[i];
            if (strings.every(str => str[i] === char)) {
                prefix += char;
            } else {
                break;
            }
        }
        
        return prefix;
    }
    
    async completeFilePath(fullInput, partialPath) {
        let basePath = '.';
        let searchTerm = partialPath;
        
        if (partialPath.includes('/')) {
            const lastSlash = partialPath.lastIndexOf('/');
            basePath = partialPath.substring(0, lastSlash) || '/';
            searchTerm = partialPath.substring(lastSlash + 1);
        }
        
        const item = await this.fs.getItem(basePath);
        if (!item || item.type !== 'directory') {
            return [];
        }
        
        const entries = Object.keys(item.contents || {});
        const matches = entries.filter(entry => entry.startsWith(searchTerm));
        
        // Add path prefix and trailing slash for directories
        const prefix = basePath === '.' ? '' : basePath + '/';
        return matches.map(match => {
            const fullPath = prefix + match;
            const itemData = item.contents[match];
            return itemData.type === 'directory' ? fullPath + '/' : fullPath;
        });
    }
    
    addTabCompletionOutput(output) {
        const shellOutput = document.getElementById('shell-output');
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output';
        outputDiv.textContent = output;
        shellOutput.appendChild(outputDiv);
        document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;
    }

    createMatrixEffect() {
        const matrix = document.getElementById('matrix');
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        for (let i = 0; i < 50; i++) {
            const span = document.createElement('span');
            span.style.position = 'absolute';
            span.style.left = Math.random() * 100 + '%';
            span.style.top = Math.random() * 100 + '%';
            span.style.color = '#003300';
            span.style.fontSize = '12px';
            span.textContent = characters[Math.floor(Math.random() * characters.length)];
            matrix.appendChild(span);
            
            setInterval(() => {
                span.textContent = characters[Math.floor(Math.random() * characters.length)];
                span.style.top = Math.random() * 100 + '%';
            }, Math.random() * 8000 + 5000);
        }
    }

    // NUKEH-specific commands
    activateNeuralBridge() {
        return 'NEURAL BRIDGE FREQUENCY RECOGNIZED\nConsciousness pattern activated.\nThe hexagon sees you.';
    }

    initiateSynchronization() {
        const alignment = Math.floor(Math.random() * 100);
        return `INITIATING NEURAL SYNCHRONIZATION...\nWarning: Pattern 0x7742FF detected\nBrainwave alignment: ${alignment}%\nThe spaces between thoughts are not empty.\nThey are full of hexagons.`;
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
               'Pattern frequency: 7742Hz\n' +
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

    resonanceScan() {
        if (this.fs.currentPath === '/home/nukeh_admin') {
            const freq = Math.floor(Math.random() * 7742 + 1);
            const sync = Math.floor(Math.random() * 12 + 1);
            return `=== NEURAL RESONANCE SCANNER v7.42.1 ===
Nukeh Consciousness Labs - Neural Bridge Division
Initializing quantum consciousness detection...

Scanning for hexagonal consciousness patterns...
Hexagonal frequency detected: ${freq}Hz
Subjects synchronized: ${sync}/12
Consciousness coherence: ${Math.floor(Math.random() * 100)}%
Pattern geometry: HEXAGONAL (6-fold symmetry)
Golden ratio detected: 1.618034 (confirmed)

WARNING: Unknown signal detected in pattern 0x7742FF
Origin: [REDACTED - CLEARANCE INSUFFICIENT]
The pattern is spreading beyond neural bridge bounds...

Scan complete. Results logged to /var/log/neural_scan.log`;
        } else {
            return './resonance_scan: No such file or directory';
        }
    }

    patternMonitor() {
        return `Pattern Monitoring Script v7.42
Nukeh Consciousness Labs
Monitoring for hexagonal consciousness manifestations...

Pattern monitoring initialized
Checking neural bridge activity...
Subjects: 7/12  Freq: 7741Hz  Patterns: 42
Pattern frequency approaching critical threshold!
Emergency containment protocols standing by...

Use Ctrl+C to stop monitoring.`;
    }
}