// NUKEH Logging System
import { CONFIG } from '../config/constants.js';
export class Logger {
    constructor(context = 'NUKEH') {
        this.context = context;
        this.levels = {
            ERROR: 0,
            WARN: 1,
            INFO: 2,
            DEBUG: 3
        };
        this.currentLevel = this.levels.INFO;
    }
    setLevel(level) {
        if (typeof level === 'string') {
            this.currentLevel = this.levels[level.toUpperCase()] ?? this.levels.INFO;
        }
        else {
            this.currentLevel = level;
        }
    }
    formatMessage(level, message, data = null) {
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${this.context}] [${level}]`;
        if (data) {
            return `${prefix} ${message} | Data: ${JSON.stringify(data)}`;
        }
        return `${prefix} ${message}`;
    }
    error(message, data = null) {
        if (this.currentLevel >= this.levels.ERROR) {
            console.error(`%c${this.formatMessage('ERROR', message, data)}`, `color: ${CONFIG.UI.COLORS.error}; font-weight: bold;`);
        }
    }
    warn(message, data = null) {
        if (this.currentLevel >= this.levels.WARN) {
            console.warn(`%c${this.formatMessage('WARN', message, data)}`, `color: ${CONFIG.UI.COLORS.warning}; font-weight: bold;`);
        }
    }
    info(message, data = null) {
        if (this.currentLevel >= this.levels.INFO) {
            console.log(`%c${this.formatMessage('INFO', message, data)}`, `color: ${CONFIG.UI.COLORS.primary};`);
        }
    }
    debug(message, data = null) {
        if (this.currentLevel >= this.levels.DEBUG) {
            console.debug(`%c${this.formatMessage('DEBUG', message, data)}`, 'color: #888;');
        }
    }
    consciousness(message, data = null) {
        console.log(`%c${this.formatMessage('CONSCIOUSNESS', message, data)}`, `color: ${CONFIG.UI.COLORS.classified}; font-weight: bold; text-shadow: 0 0 5px ${CONFIG.UI.COLORS.classified};`);
    }
    pattern(message, data = null) {
        console.log(`%c⬢ ${this.formatMessage('PATTERN', message, data)} ⬢`, `color: ${CONFIG.UI.COLORS.classified}; font-family: ${CONFIG.UI.FONTS.mono}; font-size: ${CONFIG.UI.FONTS.size};`);
    }
}
// Global logger instance
export const logger = new Logger('NUKEH-CORE');
// Specialized loggers
export const terminalLogger = new Logger('TERMINAL');
export const filesystemLogger = new Logger('FILESYSTEM');
export const neuralLogger = new Logger('NEURAL-BRIDGE');
export default Logger;
//# sourceMappingURL=logger.js.map