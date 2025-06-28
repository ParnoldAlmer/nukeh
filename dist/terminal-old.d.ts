export class Terminal {
    fs: FileSystem;
    commandHistory: any[];
    historyIndex: number;
    isShellActive: boolean;
    commands: {
        ls: (args: any) => Promise<any>;
        cd: (args: any) => Promise<any>;
        cat: (args: any) => Promise<any>;
        pwd: () => string;
        clear: () => any;
        help: () => any;
        whoami: () => string;
        date: () => string;
        uname: () => string;
        uptime: () => any;
        ps: () => any;
        top: () => string;
        history: () => string;
        exit: () => string;
        version: () => any;
        '7742': () => any;
        sync: () => any;
        pattern: () => any;
        hexagon: () => any;
        consciousness: () => any;
        './resonance_scan': () => any;
        './pattern_monitor.sh': () => any;
    };
    availableCommands: string[];
    fileCommands: string[];
    init(): void;
    bootSystem(): void;
    createCommandLine(): void;
    executeCommand(command: any): Promise<void>;
    addOutput(command: any, output: any): void;
    handleTabCompletion(input: any): Promise<any>;
    handleTabCompletion(input: any): Promise<void>;
    findCommonPrefix(strings: any): any;
    findCommonPrefix(strings: any): any;
    completeFilePath(fullInput: any, partialPath: any): Promise<any>;
    completeFilePath(fullInput: any, partialPath: any): Promise<string[]>;
    addTabCompletionOutput(output: any): void;
    addTabCompletionOutput(output: any): void;
    setupEventListeners(): void;
    createMatrixEffect(): void;
}
import { FileSystem } from './filesystem.js';
//# sourceMappingURL=terminal-old.d.ts.map