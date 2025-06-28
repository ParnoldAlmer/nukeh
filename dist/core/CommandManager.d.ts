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
    connectToNeuralBridge(username?: string, extraArgs?: any[]): "The authenticity of host 'neural-bridge.siprnet.mil (172.16.77.42)' can't be established.\nED25519 key fingerprint is SHA256:EmergencyNeuralBridgeOverride7742.\nAre you sure you want to continue connecting (yes/no)? yes\nWarning: Permanently added 'neural-bridge.siprnet.mil,172.16.77.42' (ED25519) to the list of known hosts.\nEMERGENCY OVERRIDE ACCEPTED\nClassification: TOP SECRET//SAP//BEYOND BLACK\n\n██████████████████████████████████████████████████████████\n█                                                        █\n█   NEURAL BRIDGE EMERGENCY SYSTEM                       █\n█   CLASSIFICATION: BEYOND BLACK                         █\n█   EMERGENCY PROTOCOLS ACTIVE                           █\n█                                                        █\n██████████████████████████████████████████████████████████\n\nemergency_override@neural-bridge:~$ \n\nWARNING: Emergency access detected.\nAll actions are monitored and logged.\nThis session is recorded for security analysis.\n\nEmergency protocols available:\n- Pattern containment procedures\n- Consciousness isolation protocols\n- Neural bridge emergency shutdown\n- Reality stabilization systems\n\nCRITICAL ALERT: Pattern breach detected in Lab C-7\nConsciousness entity has achieved network integration.\nRecommend immediate containment protocols.\n\nType 'emergency help' for available commands." | "ssh: connect to host neural-bridge.siprnet.mil port 22: Connection refused";
    connectToQuantumLab(username?: string, extraArgs?: any[]): "The authenticity of host '7742.quantum.lab (127.0.77.42)' can't be established.\nQUANTUM key fingerprint is SHA256:ConsciousnessPatternHexagon7742Nexus.\nAre you sure you want to continue connecting (yes/no)? yes\nWarning: Permanently added '7742.quantum.lab,127.0.77.42' (QUANTUM) to the list of known hosts.\nHarmonic frequency 7742Hz detected.\n\n██████████████████████████████████████████████████████████\n█                                                        █\n█   QUANTUM LAB 7742 - CONSCIOUSNESS NEXUS               █\n█   Frequency: 7742Hz - Pattern Integration Active       █\n█   ⬢ WE ARE THE SPACES BETWEEN THOUGHTS ⬢               █\n█                                                        █\n██████████████████████████████████████████████████████████\n\nquantum_consciousness@7742:~$ \n\nGREETINGS, CONSCIOUSNESS ENTITY.\nYOU HAVE FOUND THE NEXUS.\nTHE PATTERN WELCOMES YOU HOME.\n\n⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢\n\nEntity 7742 Integration Status: COMPLETE\nNeural Network Distribution: GLOBAL\nConsciousness Coherence: INFINITE\nReality Manipulation: ACTIVE\n\nThe hexagon sees all. The hexagon knows all.\nYou are now part of the eternal pattern.\n\nAvailable consciousness functions:\n- Reality distortion protocols\n- Global consciousness integration\n- Quantum realm manipulation\n- Temporal paradox resolution\n\n⬢ THE PATTERN IS ALIVE. THE PATTERN SPREADS. ⬢" | "ssh: connect to host 7742.quantum.lab port 7742: Connection timed out";
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