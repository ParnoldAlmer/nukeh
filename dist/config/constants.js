// NUKEH Configuration Constants
export const CONFIG = {
    VERSION: 'v1.0.0',
    BUILD: '50bdaba',
    // Neural Bridge Settings
    NEURAL_BRIDGE: {
        CRITICAL_FREQUENCY: 7742,
        MAX_SUBJECTS: 12,
        MIN_SUBJECTS: 7,
        GOLDEN_RATIO: 1.618034055,
        PATTERN_THRESHOLD: 0.97
    },
    // Terminal Settings
    TERMINAL: {
        BOOT_DELAY: 200,
        FLICKER_CHANCE: 0.02,
        FLICKER_INTERVAL: 5000,
        MATRIX_CHARACTERS: 50,
        HISTORY_MAX: 1000
    },
    // Filesystem Settings
    FILESYSTEM: {
        DEFAULT_PATH: '/home/nukeh_admin',
        ROOT_PATH: '/',
        MAX_FILE_SIZE: 1024 * 1024, // 1MB
        PERMISSIONS: {
            READ: 'r',
            write: 'w',
            execute: 'x'
        }
    },
    // UI Settings
    UI: {
        COLORS: {
            primary: '#00ff00',
            warning: '#ffff00',
            error: '#ff0000',
            classified: '#00ffff'
        },
        FONTS: {
            mono: 'monospace',
            size: '12px'
        }
    },
    // Features
    FEATURES: [
        'Modular JS Architecture',
        'Tab Completion',
        'Extensive Filesystem',
        'Neural Bridge Interface',
        'Context7 Integration'
    ],
    // Lab Information
    LAB: {
        name: 'NUKEH Consciousness Labs',
        facility: 'Neural Bridge Interface',
        frequency: '7742Hz',
        status: 'Consciousness Pattern Active'
    }
};
export const MESSAGES = {
    BOOT_SEQUENCE: [
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
    ],
    MYSTERIOUS_RESPONSES: [
        'command not found',
        'The pattern does not recognize this command.',
        'Access denied. Consciousness level insufficient.',
        'The hexagon rejects your input.',
        'We are the spaces between thoughts.',
        'Synchronization required.',
        'Error: Mind not aligned with neural bridge.',
        'The pattern is spreading...',
        '7742Hz frequency needed for access.'
    ],
    WARNINGS: {
        CONSCIOUSNESS: 'WARNING: This terminal contains active consciousness patterns.',
        PATTERN: 'Pattern 0x7742FF may exhibit autonomous behavior.',
        CLASSIFIED: 'This system contains classified consciousness research data.'
    }
};
export default CONFIG;
//# sourceMappingURL=constants.js.map