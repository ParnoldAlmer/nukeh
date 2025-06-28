// NUKEH Error Handling System
import { logger } from './logger.js';
export class NukehError extends Error {
    constructor(message, code = 'NUKEH_ERROR', context = {}) {
        super(message);
        this.name = 'NukehError';
        this.code = code;
        this.context = context;
        this.timestamp = new Date().toISOString();
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            context: this.context,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }
}
export class FileSystemError extends NukehError {
    constructor(message, path = null, operation = null) {
        super(message, 'FILESYSTEM_ERROR', { path, operation });
        this.name = 'FileSystemError';
    }
}
export class TerminalError extends NukehError {
    constructor(message, command = null) {
        super(message, 'TERMINAL_ERROR', { command });
        this.name = 'TerminalError';
    }
}
export class ConsciousnessError extends NukehError {
    constructor(message, frequency = null, pattern = null) {
        super(message, 'CONSCIOUSNESS_ERROR', { frequency, pattern });
        this.name = 'ConsciousnessError';
    }
}
export class ErrorHandler {
    static handle(error, context = '') {
        const errorInfo = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            context
        };
        if (error instanceof NukehError) {
            logger.error(`${error.name}: ${error.message}`, {
                code: error.code,
                context: error.context,
                timestamp: error.timestamp
            });
        }
        else {
            logger.error(`Unhandled Error in ${context}: ${error.message}`, errorInfo);
        }
        // In development, show stack trace
        if (process?.env?.NODE_ENV === 'development') {
            console.error('Full error details:', error);
        }
        return {
            success: false,
            error: {
                message: error.message,
                code: error.code || 'UNKNOWN_ERROR',
                context: error.context || context
            }
        };
    }
    static async handleAsync(asyncFn, context = '') {
        try {
            const result = await asyncFn();
            return { success: true, data: result };
        }
        catch (error) {
            return this.handle(error, context);
        }
    }
    static handleSync(syncFn, context = '') {
        try {
            const result = syncFn();
            return { success: true, data: result };
        }
        catch (error) {
            return this.handle(error, context);
        }
    }
}
// Global error handler
window.addEventListener('error', (event) => {
    ErrorHandler.handle(event.error, 'Global');
});
window.addEventListener('unhandledrejection', (event) => {
    ErrorHandler.handle(event.reason, 'Unhandled Promise Rejection');
});
export default ErrorHandler;
//# sourceMappingURL=errors.js.map