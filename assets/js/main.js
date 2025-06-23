// NUKEH Nuclear Control Panel - Interactive Terminal Game

// ASCII Logo for Console
const asciiLogo = `
███╗   ██╗██╗   ██╗██╗  ██╗███████╗██╗  ██╗
████╗  ██║██║   ██║██║ ██╔╝██╔════╝██║  ██║
██╔██╗ ██║██║   ██║█████╔╝ █████╗  ███████║
██║╚██╗██║██║   ██║██╔═██╗ ██╔══╝  ██╔══██║
██║ ╚████║╚██████╔╝██║  ██╗███████╗██║  ██║
╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

NUCLEAR LAUNCH CONTROL SYSTEM v2.1.0
ACCESS LEVEL: CLASSIFIED
WARNING: AUTHORIZED PERSONNEL ONLY
`;

// Global game state
const gameState = {
    authenticated: false,
    systemStatus: 'NOMINAL',
    reactorTemp: 2847,
    radiationLevel: 0.0032,
    coolantFlow: 'NOMINAL',
    launchReadiness: {
        dev: 'READY',
        staging: 'READY', 
        prod: 'READY'
    },
    uptime: Date.now(),
    lastLogin: null,
    commandHistory: [],
    currentUser: null,
    securityLevel: 0
};

// Terminal command system
const commands = {
    help: {
        description: 'Show available commands',
        execute: () => {
            return [
                'NUKEH CONTROL PANEL - Available Commands:',
                '',
                'help         - Show this help message',
                'status       - Display system status',
                'launch <env> - Initiate launch sequence (dev/staging/prod)',
                'abort        - Emergency abort sequence',
                'auth <id>    - Authenticate with operator ID',
                'reactor      - Reactor control panel',
                'radiation    - Radiation monitoring',
                'clear        - Clear terminal',
                'exit         - Logout from system',
                'nuke         - [CLASSIFIED] Nuclear launch protocol',
                '',
                'WARNING: Unauthorized access is strictly prohibited.'
            ];
        }
    },
    
    status: {
        description: 'Display system status',
        execute: () => {
            const uptime = Math.floor((Date.now() - gameState.uptime) / 1000);
            return [
                '═══════════════════════════════════════════',
                '           SYSTEM STATUS REPORT            ',
                '═══════════════════════════════════════════',
                `REACTOR CORE:     ${gameState.systemStatus}`,
                `CORE TEMP:        ${Math.round(gameState.reactorTemp)}°C`,
                `RADIATION LVL:    ${gameState.radiationLevel} mSv/h`,
                `COOLANT FLOW:     ${gameState.coolantFlow}`,
                `SYSTEM UPTIME:    ${uptime}s`,
                `AUTH STATUS:      ${gameState.authenticated ? 'AUTHORIZED' : 'UNAUTHORIZED'}`,
                `SECURITY LVL:     ${gameState.securityLevel}`,
                '═══════════════════════════════════════════'
            ];
        }
    },
    
    launch: {
        description: 'Launch deployment sequence',
        execute: (args) => {
            if (!gameState.authenticated) {
                return ['ERROR: Authentication required for launch operations.'];
            }
            
            const env = args[0];
            if (!env || !['dev', 'staging', 'prod'].includes(env)) {
                return ['ERROR: Invalid environment. Use: dev, staging, or prod'];
            }
            
            if (env === 'prod' && gameState.securityLevel < 5) {
                return ['ERROR: Insufficient clearance for production launch.'];
            }
            
            // Simulate launch sequence
            setTimeout(() => updateLaunchStatus(env, 'LAUNCHING'), 1000);
            setTimeout(() => updateLaunchStatus(env, 'DEPLOYED'), 3000);
            
            return [
                `INITIATING LAUNCH SEQUENCE FOR ${env.toUpperCase()}...`,
                'WARNING: Launch sequence initiated.',
                'Stand by for deployment confirmation...'
            ];
        }
    },
    
    auth: {
        description: 'Authenticate user',
        execute: (args) => {
            const operatorId = args[0];
            if (!operatorId) {
                return ['ERROR: Operator ID required. Usage: auth <operator_id>'];
            }
            
            // Simulate authentication
            gameState.authenticated = true;
            gameState.currentUser = operatorId;
            gameState.lastLogin = new Date().toISOString();
            gameState.securityLevel = operatorId.length; // Simple security level
            
            updateAuthStatus(true);
            
            return [
                `Authentication successful for operator: ${operatorId}`,
                `Security clearance level: ${gameState.securityLevel}`,
                'Welcome to NUKEH Control Panel.',
                'Type "help" for available commands.'
            ];
        }
    },
    
    reactor: {
        description: 'Reactor control panel',
        execute: () => {
            if (!gameState.authenticated) {
                return ['ERROR: Authentication required for reactor access.'];
            }
            
            return [
                '╔══════════════════════════════════════╗',
                '║           REACTOR CONTROL            ║',
                '╚══════════════════════════════════════╝',
                '',
                `Core Temperature: ${Math.round(gameState.reactorTemp)}°C`,
                `Pressure:         2.1 MPa`,
                `Control Rods:     75% inserted`,
                `Power Output:     850 MW`,
                `Efficiency:       94.2%`,
                '',
                'WARNING: Core temperature elevated.',
                'Coolant systems operating normally.'
            ];
        }
    },
    
    radiation: {
        description: 'Radiation monitoring',
        execute: () => {
            // Simulate fluctuating radiation
            gameState.radiationLevel = (Math.random() * 0.01 + 0.001).toFixed(4);
            updateRadiationDisplay();
            
            return [
                '☢ RADIATION MONITORING SYSTEM ☢',
                '',
                `Current Level: ${gameState.radiationLevel} mSv/h`,
                `Status: ${gameState.radiationLevel > 0.005 ? 'ELEVATED' : 'NORMAL'}`,
                `Containment: SECURE`,
                `Detectors: ONLINE`,
                '',
                'Background radiation within acceptable limits.'
            ];
        }
    },
    
    abort: {
        description: 'Emergency abort sequence',
        execute: () => {
            if (!gameState.authenticated) {
                return ['ERROR: Authentication required for abort sequence.'];
            }
            
            // Reset all launch statuses
            Object.keys(gameState.launchReadiness).forEach(env => {
                gameState.launchReadiness[env] = 'ABORTED';
                updateLaunchStatus(env, 'ABORTED');
            });
            
            setTimeout(() => {
                Object.keys(gameState.launchReadiness).forEach(env => {
                    gameState.launchReadiness[env] = 'READY';
                    updateLaunchStatus(env, 'READY');
                });
            }, 5000);
            
            return [
                '🚨 EMERGENCY ABORT SEQUENCE INITIATED 🚨',
                '',
                'All launch operations terminated.',
                'Systems returning to standby mode.',
                'Emergency protocols engaged.',
                '',
                'Systems will reset in 5 seconds.'
            ];
        }
    },
    
    clear: {
        description: 'Clear terminal',
        execute: () => {
            const output = document.getElementById('terminal-output');
            if (output) {
                output.innerHTML = `
                    <div class="terminal-line">NUKEH v2.1.0 - Nuclear Launch Control System</div>
                    <div class="terminal-line">Terminal cleared by user request.</div>
                    <div class="terminal-line">&nbsp;</div>
                    <div class="terminal-prompt">nukeh@control:~$ <span class="cursor">_</span></div>
                `;
            }
            return [];
        }
    },
    
    exit: {
        description: 'Logout from system',
        execute: () => {
            gameState.authenticated = false;
            gameState.currentUser = null;
            gameState.securityLevel = 0;
            updateAuthStatus(false);
            
            return [
                'Logging out...',
                'Session terminated.',
                'Thank you for using NUKEH Control Panel.',
                '',
                '⚛️ SYSTEM LOCKED ⚛️'
            ];
        }
    },
    
    nuke: {
        description: '[CLASSIFIED] Nuclear launch protocol',
        execute: () => {
            if (!gameState.authenticated) {
                return ['ERROR: Authentication required.'];
            }
            
            if (gameState.securityLevel < 8) {
                return [
                    'ACCESS DENIED: Insufficient security clearance.',
                    'This incident will be reported.',
                    '⚠️ SECURITY ALERT ⚠️'
                ];
            }
            
            return [
                '🚀 NUCLEAR LAUNCH PROTOCOL ACTIVATED 🚀',
                '',
                'WARNING: This is a simulation.',
                'No actual nuclear weapons involved.',
                '',
                'Congratulations! You found the easter egg!',
                'NUKEH is just a fun retro terminal interface.',
                '',
                '💚 Thanks for playing! 💚'
            ];
        }
    }
};

// System status updaters
function updateSystemStatus() {
    try {
        // Simulate minor fluctuations
        gameState.reactorTemp += (Math.random() - 0.5) * 5;
        gameState.reactorTemp = Math.max(2800, Math.min(2900, gameState.reactorTemp));
        
        gameState.radiationLevel = (Math.random() * 0.01 + 0.001).toFixed(4);
        
        // Update display elements if they exist
        const reactorStatus = document.getElementById('reactor-status');
        const coreTemp = document.getElementById('core-temp');
        const radiationLevel = document.getElementById('radiation-level');
        const coolantFlow = document.getElementById('coolant-flow');
        
        if (reactorStatus) reactorStatus.textContent = gameState.systemStatus;
        if (coreTemp) coreTemp.textContent = `${Math.round(gameState.reactorTemp)}°C`;
        if (radiationLevel) {
            radiationLevel.textContent = `${gameState.radiationLevel} mSv/h`;
            
            // Update radiation level color
            if (gameState.radiationLevel > 0.005) {
                radiationLevel.className = 'status-value status-warning radiation-warning';
            } else {
                radiationLevel.className = 'status-value status-warning';
            }
        }
        if (coolantFlow) coolantFlow.textContent = gameState.coolantFlow;
    } catch (error) {
        console.log('System status update error (non-critical):', error.message);
    }
}

function updateLaunchStatus(env, status) {
    try {
        gameState.launchReadiness[env] = status;
        const statusEl = document.getElementById(`${env}-status`);
        if (statusEl) {
            statusEl.textContent = status;
            
            // Update button state
            const button = document.querySelector(`[data-env="${env}"]`);
            if (button) {
                if (status === 'LAUNCHING') {
                    button.textContent = 'LAUNCHING...';
                    button.disabled = true;
                } else if (status === 'DEPLOYED') {
                    button.textContent = 'DEPLOYED';
                    button.disabled = true;
                    button.style.background = 'var(--radiation-green)';
                    button.style.color = 'var(--terminal-bg)';
                } else if (status === 'ABORTED') {
                    button.textContent = 'ABORTED';
                    button.style.background = 'var(--warning-red)';
                    button.style.color = 'var(--terminal-white)';
                } else {
                    button.textContent = env === 'prod' ? 'LAUNCH' : 'DEPLOY';
                    button.disabled = false;
                    button.style.background = '';
                    button.style.color = '';
                }
            }
        }
    } catch (error) {
        console.log('Launch status update error (non-critical):', error.message);
    }
}

function updateAuthStatus(authorized) {
    try {
        const authStatus = document.getElementById('auth-status');
        if (authStatus) {
            const indicator = authStatus.querySelector('.status-indicator');
            if (indicator) {
                if (authorized) {
                    indicator.textContent = 'AUTHORIZED';
                    indicator.className = 'status-indicator authorized';
                } else {
                    indicator.textContent = 'UNAUTHORIZED';
                    indicator.className = 'status-indicator unauthorized';
                }
            }
        }
    } catch (error) {
        console.log('Auth status update error (non-critical):', error.message);
    }
}

function updateRadiationDisplay() {
    try {
        const radiationEl = document.getElementById('radiation-level');
        if (radiationEl) {
            radiationEl.textContent = `${gameState.radiationLevel} mSv/h`;
        }
    } catch (error) {
        console.log('Radiation display update error (non-critical):', error.message);
    }
}

// Terminal interface
function initTerminal() {
    try {
        const terminalInput = document.getElementById('terminal-input');
        
        if (!terminalInput) {
            console.log('Terminal input not found');
            return;
        }
        
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim();
                if (command) {
                    processCommand(command);
                    gameState.commandHistory.push(command);
                    terminalInput.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (gameState.commandHistory.length > 0) {
                    terminalInput.value = gameState.commandHistory[gameState.commandHistory.length - 1];
                }
            }
        });
        
        // Auto-focus terminal input
        terminalInput.focus();
        document.addEventListener('click', () => {
            if (terminalInput) {
                terminalInput.focus();
            }
        });
    } catch (error) {
        console.log('Terminal init error:', error.message);
    }
}

function processCommand(input) {
    try {
        const output = document.getElementById('terminal-output');
        if (!output) return;
        
        const [cmd, ...args] = input.toLowerCase().split(' ');
        
        // Add command to output
        addTerminalLine(`nukeh@control:~$ ${input}`);
        
        if (commands[cmd]) {
            const result = commands[cmd].execute(args);
            result.forEach(line => addTerminalLine(line));
        } else {
            addTerminalLine(`Command not found: ${cmd}`);
            addTerminalLine('Type "help" for available commands.');
        }
        
        addTerminalLine('');
        addTerminalLine('nukeh@control:~$ ', true);
        
        // Scroll to bottom
        output.scrollTop = output.scrollHeight;
    } catch (error) {
        console.log('Command processing error:', error.message);
    }
}

function addTerminalLine(text, isPrompt = false) {
    try {
        const output = document.getElementById('terminal-output');
        if (!output) return;
        
        const line = document.createElement('div');
        
        if (isPrompt) {
            line.className = 'terminal-prompt';
            line.innerHTML = `${text}<span class="cursor">_</span>`;
        } else {
            line.className = 'terminal-line';
            line.textContent = text;
        }
        
        // Remove old prompt if exists
        const oldPrompt = output.querySelector('.terminal-prompt');
        if (oldPrompt) {
            oldPrompt.remove();
        }
        
        output.appendChild(line);
    } catch (error) {
        console.log('Terminal line add error:', error.message);
    }
}

// Launch button handlers
function initLaunchButtons() {
    try {
        document.querySelectorAll('.launch-button').forEach(button => {
            button.addEventListener('click', () => {
                const env = button.dataset.env;
                if (env) {
                    processCommand(`launch ${env}`);
                }
            });
        });
    } catch (error) {
        console.log('Launch buttons init error:', error.message);
    }
}

// Authentication panel
function initAuthPanel() {
    try {
        const authButton = document.getElementById('auth-login');
        const operatorInput = document.getElementById('operator-id');
        const accessCodeInput = document.getElementById('access-code');
        const emergencyButton = document.getElementById('auth-emergency');
        
        if (authButton && operatorInput && accessCodeInput) {
            authButton.addEventListener('click', () => {
                const operatorId = operatorInput.value.trim();
                const accessCode = accessCodeInput.value.trim();
                
                if (!operatorId) {
                    addTerminalLine('ERROR: Operator ID required.');
                    return;
                }
                
                if (!accessCode) {
                    addTerminalLine('ERROR: Access code required.');
                    return;
                }
                
                // Simple auth simulation
                if (accessCode.length >= 6) {
                    processCommand(`auth ${operatorId}`);
                    operatorInput.value = '';
                    accessCodeInput.value = '';
                } else {
                    addTerminalLine('ERROR: Invalid access code.');
                    addTerminalLine('Access codes must be at least 6 characters.');
                }
            });
            
            // Enter key handling
            [operatorInput, accessCodeInput].forEach(input => {
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        authButton.click();
                    }
                });
            });
        }
        
        if (emergencyButton) {
            emergencyButton.addEventListener('click', () => {
                processCommand('abort');
            });
        }
    } catch (error) {
        console.log('Auth panel init error:', error.message);
    }
}

// Time display
function updateTimeDisplay() {
    try {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false,
            timeZone: 'UTC'
        });
        
        const timeEl = document.getElementById('current-time');
        if (timeEl) {
            timeEl.textContent = `${timeString} UTC`;
        }
        
        // Update uptime
        const uptime = Math.floor((Date.now() - gameState.uptime) / 1000);
        const uptimeEl = document.getElementById('uptime');
        if (uptimeEl) {
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = uptime % 60;
            uptimeEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Update last login
        const lastLoginEl = document.getElementById('last-login');
        if (lastLoginEl) {
            if (gameState.lastLogin) {
                lastLoginEl.textContent = new Date(gameState.lastLogin).toLocaleString();
            } else {
                lastLoginEl.textContent = 'Never';
            }
        }
    } catch (error) {
        console.log('Time display update error (non-critical):', error.message);
    }
}

// Console welcome message
function showWelcomeMessage() {
    console.log('%c' + asciiLogo, 'color: #00ff41; font-family: monospace; font-size: 12px;');
    console.log('%c🚀 NUKEH Nuclear Control Panel Loaded!', 'color: #00ff41; font-size: 16px; font-weight: bold;');
    console.log('%c⚠️ WARNING: This is a simulation for educational purposes only.', 'color: #ffff00; font-size: 14px;');
    console.log('%c🎮 Try typing "help" in the terminal for available commands!', 'color: #00ffff; font-size: 14px;');
    console.log('%c🔐 Hint: Try operator ID "ADMIN" with access code "NUKEH2024"', 'color: #ff6600; font-size: 12px;');
}

// Disable scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('%cInitializing NUKEH Nuclear Control Panel...', 'color: #00ff41; font-weight: bold;');
    
    try {
        // Show welcome message
        showWelcomeMessage();
        
        // Initialize all systems
        initTerminal();
        initLaunchButtons();
        initAuthPanel();
        
        // Start system updates
        updateSystemStatus();
        updateTimeDisplay();
        
        // Set up intervals
        setInterval(updateSystemStatus, 3000); // Update every 3 seconds
        setInterval(updateTimeDisplay, 1000);  // Update every second
        
        // Auto-type welcome message in terminal
        setTimeout(() => {
            addTerminalLine('System initialization complete.');
            addTerminalLine('Type "help" for available commands.');
            addTerminalLine('');
        }, 1000);
        
        console.log('%c✅ NUKEH Control Panel initialized successfully!', 'color: #00ff41; font-weight: bold;');
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('%c⏸️ NUKEH Control Panel suspended', 'color: #808080;');
    } else {
        console.log('%c▶️ NUKEH Control Panel resumed', 'color: #00ff41; font-weight: bold;');
        // Re-focus terminal when page becomes visible
        const terminalInput = document.getElementById('terminal-input');
        if (terminalInput) {
            terminalInput.focus();
        }
    }
});

// Export for potential external use
window.NUKEH = {
    gameState,
    commands,
    processCommand,
    updateSystemStatus
};