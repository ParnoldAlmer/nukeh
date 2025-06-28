export class CommandManager {
    constructor(filesystem: any, terminal: any);
    fs: any;
    terminal: any;
    logger: import("../utils/logger.js").Logger;
    commands: Map<string, {
        handler: any;
        description: any;
        timestamp: number;
    }>;
    fileCommands: Set<string>;
    systemCommands: Set<string>;
    createCommand(handler: any, description: any): {
        handler: any;
        description: any;
        timestamp: number;
    };
    executeCommand(input: any): Promise<{
        success: boolean;
        error: {
            message: any;
            code: any;
            context: any;
        };
    } | {
        success: boolean;
        data: any;
    }>;
    handleUnknownCommand(commandName: any): string;
    getAvailableCommands(): string[];
    isFileCommand(command: any): boolean;
    ls(args: any): Promise<any>;
    cd(args: any): Promise<any>;
    cat(args: any): Promise<any>;
    pwd(): any;
    clear(): string;
    help(args: any): Promise<string>;
    whoami(): string;
    date(): string;
    uname(): string;
    uptime(): string;
    ps(): string;
    top(): string;
    history(): any;
    exit(): string;
    ssh(args: any): string;
    connectToQuantumResearch(username?: string, extraArgs?: any[]): string;
    connectToPatternAnalyzer(username?: string, extraArgs?: any[]): string;
    connectToNeuralBridge(username?: string, extraArgs?: any[]): string;
    connectToQuantumLab(username?: string, extraArgs?: any[]): string;
    version(): string;
    activateNeuralBridge(): string;
    initiateSynchronization(): string;
    displayPattern(): string;
    displayHexagon(): string;
    initiateAwakening(): string;
    resonanceScan(): Promise<string>;
    patternMonitor(): string;
    getDocs(args: any): Promise<string>;
}
export default CommandManager;
//# sourceMappingURL=CommandManager.d.ts.map