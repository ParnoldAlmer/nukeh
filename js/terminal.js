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
            'exit': () => 'logout'
        };
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
whoami      - show current user
date        - show current date
history     - show command history
exit        - logout

NUKEH Research Station - Consciousness Interface
WARNING: This system contains classified consciousness research data.
Unauthorized access is strictly prohibited.`;
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
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    input.value = this.commandHistory[this.historyIndex];
                }
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
}