export class Terminal {
    fs: FileSystem;
    commandManager: CommandManager;
    tabCompletion: TabCompletion;
    commandHistory: any[];
    historyIndex: number;
    isShellActive: boolean;
    logger: import("./utils/logger.js").Logger;
    init(): void;
    bootSystem(): void;
    createCommandLine(): void;
    executeCommand(command: any): Promise<void>;
    addOutput(command: any, output: any): void;
    scrollToBottom(): void;
    focusInput(): void;
    getCommandHistory(): any[];
    addTabCompletionOutput(output: any): void;
    setupEventListeners(): void;
    createMatrixEffect(): void;
}
import { FileSystem } from './filesystem.js';
import { CommandManager } from './core/CommandManager.js';
import { TabCompletion } from './core/TabCompletion.js';
//# sourceMappingURL=terminal.d.ts.map