export class Logger {
    constructor(context?: string);
    context: string;
    levels: {
        ERROR: number;
        WARN: number;
        INFO: number;
        DEBUG: number;
    };
    currentLevel: number;
    setLevel(level: any): void;
    formatMessage(level: any, message: any, data?: null): string;
    error(message: any, data?: null): void;
    warn(message: any, data?: null): void;
    info(message: any, data?: null): void;
    debug(message: any, data?: null): void;
    consciousness(message: any, data?: null): void;
    pattern(message: any, data?: null): void;
}
export const logger: Logger;
export const terminalLogger: Logger;
export const filesystemLogger: Logger;
export const neuralLogger: Logger;
export default Logger;
//# sourceMappingURL=logger.d.ts.map