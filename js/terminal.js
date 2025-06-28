// NUKEH Terminal Engine
import { FileSystem } from './filesystem.js';
import { CommandManager } from './core/CommandManager.js';
import { TabCompletion } from './core/TabCompletion.js';
import { CONFIG, MESSAGES } from './config/constants.js';
import { terminalLogger } from './utils/logger.js';
import { ErrorHandler } from './utils/errors.js';

export class Terminal {
    constructor() {
        this.fs = new FileSystem();
        this.commandManager = new CommandManager(this.fs, this);
        this.tabCompletion = new TabCompletion(this.fs, this.commandManager);
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isShellActive = false;
        this.logger = terminalLogger;
        // Commands are now managed by CommandManager
    }

    init() {
        this.createMatrixEffect();
        this.bootSystem();
        this.setupEventListeners();
    }

    bootSystem() {
        const bootContent = document.getElementById('boot-content');
        const shellContent = document.getElementById('shell-content');
        
        const bootSequence = MESSAGES.BOOT_SEQUENCE;

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
                this.logger.info('Boot sequence completed');
            }
        }, CONFIG.TERMINAL.BOOT_DELAY);
    }

    createCommandLine() {
        const shellOutput = document.getElementById('shell-output');
        const commandDiv = document.createElement('div');
        commandDiv.className = 'command-line';
        
        const promptPath = this.fs.currentPath.replace(CONFIG.FILESYSTEM.DEFAULT_PATH, '~');
        commandDiv.innerHTML = `
            <span class="prompt-text">nukeh@research:${promptPath}$</span>
            <input type="text" id="command-input" class="command-input" autocomplete="off">
        `;
        shellOutput.appendChild(commandDiv);
    }

    async executeCommand(command) {
        const result = await ErrorHandler.handleAsync(async () => {
            if (!command?.trim()) {
                return '';
            }
            
            // Add to history
            this.commandHistory.push(command);
            if (this.commandHistory.length > CONFIG.TERMINAL.HISTORY_MAX) {
                this.commandHistory.shift();
            }
            this.historyIndex = this.commandHistory.length;
            
            this.logger.debug('Executing command', { command });
            
            const commandResult = await this.commandManager.executeCommand(command);
            return commandResult.success ? commandResult.data : commandResult.error.message;
        }, 'Terminal.executeCommand');
        
        const output = result.success ? result.data : result.error.message;
        this.addOutput(command, output);
    }

    addOutput(command, output) {
        const shellOutput = document.getElementById('shell-output');
        const commandDiv = document.createElement('div');
        
        const promptPath = this.fs.currentPath.replace(CONFIG.FILESYSTEM.DEFAULT_PATH, '~');
        commandDiv.innerHTML = `<span class="prompt-text">nukeh@research:${promptPath}$</span> ${command}`;
        shellOutput.appendChild(commandDiv);
        
        if (output) {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'output';
            
            // Apply styling based on content
            if (output.includes('WARNING') || output.includes('ALERT')) {
                outputDiv.className += ' warning';
            } else if (output.includes('ERROR') || output.includes('command not found')) {
                outputDiv.className += ' error';
            } else if (output.includes('CLASSIFIED') || output.includes('7742') || 
                       output.includes('hexagon') || output.includes('pattern')) {
                outputDiv.className += ' classified';
            }
            
            outputDiv.textContent = output;
            shellOutput.appendChild(outputDiv);
        }
        
        this.createCommandLine();
        this.scrollToBottom();
        this.focusInput();
    }

    scrollToBottom() {
        document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;
    }
    
    focusInput() {
        const input = document.getElementById('command-input');
        if (input) input.focus();
    }
    
    getCommandHistory() {
        return this.commandHistory;
    }

    addTabCompletionOutput(output) {
        const shellOutput = document.getElementById('shell-output');
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output';
        outputDiv.textContent = output;
        shellOutput.appendChild(outputDiv);
        this.scrollToBottom();
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
                const cursorPosition = input.selectionStart;
                
                this.tabCompletion.complete(currentInput, cursorPosition)
                    .then(result => {
                        if (result.success && result.data) {
                            const completionData = result.data;
                            
                            if (completionData.type === 'single') {
                                input.value = completionData.completion;
                                input.setSelectionRange(input.value.length, input.value.length);
                            } else if (completionData.type === 'multiple') {
                                input.value = completionData.completion;
                                if (completionData.matches.length > 1) {
                                    const formatted = this.tabCompletion.formatMatches(completionData.matches);
                                    this.addTabCompletionOutput(formatted);
                                }
                            } else if (completionData.type === 'none' && completionData.matches.length === 0) {
                                this.addTabCompletionOutput('No matches found');
                            }
                        }
                    })
                    .catch(error => {
                        this.logger.error('Tab completion failed', error);
                    });
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
        
        for (let i = 0; i < CONFIG.TERMINAL.MATRIX_CHARACTERS; i++) {
            const span = document.createElement('span');
            span.style.position = 'absolute';
            span.style.left = Math.random() * 100 + '%';
            span.style.top = Math.random() * 100 + '%';
            span.style.color = '#003300';
            span.style.fontSize = CONFIG.UI.FONTS.size;
            span.textContent = characters[Math.floor(Math.random() * characters.length)];
            matrix.appendChild(span);
            
            setInterval(() => {
                span.textContent = characters[Math.floor(Math.random() * characters.length)];
                span.style.top = Math.random() * 100 + '%';
            }, Math.random() * 8000 + 5000);
        }
    }
}