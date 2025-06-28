export class NukehError extends Error {
    constructor(message: any, code?: string, context?: {});
    code: string;
    context: {};
    timestamp: string;
    toJSON(): {
        name: string;
        message: string;
        code: string;
        context: {};
        timestamp: string;
        stack: string | undefined;
    };
}
export class FileSystemError extends NukehError {
    constructor(message: any, path?: null, operation?: null);
}
export class TerminalError extends NukehError {
    constructor(message: any, command?: null);
}
export class ConsciousnessError extends NukehError {
    constructor(message: any, frequency?: null, pattern?: null);
}
export class ErrorHandler {
    static handle(error: any, context?: string): {
        success: boolean;
        error: {
            message: any;
            code: any;
            context: any;
        };
    };
    static handleAsync(asyncFn: any, context?: string): Promise<{
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
    static handleSync(syncFn: any, context?: string): {
        success: boolean;
        error: {
            message: any;
            code: any;
            context: any;
        };
    } | {
        success: boolean;
        data: any;
    };
}
export default ErrorHandler;
//# sourceMappingURL=errors.d.ts.map