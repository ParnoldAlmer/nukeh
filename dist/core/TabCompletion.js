// NUKEH Tab Completion System
import { logger } from '../utils/logger.js';
import { ErrorHandler } from '../utils/errors.js';
export class TabCompletion {
    constructor(filesystem, commandManager) {
        this.fs = filesystem;
        this.commandManager = commandManager;
        this.logger = logger;
    }
    async complete(input, cursorPosition = input.length) {
        return ErrorHandler.handleAsync(async () => {
            const textBeforeCursor = input.substring(0, cursorPosition);
            const parts = textBeforeCursor.split(' ');
            const isFirstWord = parts.length === 1;
            this.logger.debug('Tab completion request', {
                input,
                textBeforeCursor,
                parts,
                isFirstWord
            });
            if (isFirstWord) {
                return this.completeCommand(parts[0]);
            }
            else {
                return this.completeFilePath(textBeforeCursor, parts);
            }
        }, 'TabCompletion.complete');
    }
    completeCommand(partial) {
        const commands = this.commandManager.getAvailableCommands();
        const matches = commands.filter(cmd => cmd.startsWith(partial));
        this.logger.debug('Command completion', { partial, matches });
        if (matches.length === 1) {
            return {
                completion: matches[0] + ' ',
                matches,
                type: 'single'
            };
        }
        else if (matches.length > 1) {
            const commonPrefix = this.findCommonPrefix(matches);
            return {
                completion: commonPrefix.length > partial.length ? commonPrefix : partial,
                matches,
                type: 'multiple'
            };
        }
        return {
            completion: partial,
            matches: [],
            type: 'none'
        };
    }
    async completeFilePath(fullInput, parts) {
        const lastPart = parts[parts.length - 1];
        const command = parts[0];
        if (!this.commandManager.isFileCommand(command)) {
            return {
                completion: fullInput,
                matches: [],
                type: 'not_file_command'
            };
        }
        const pathInfo = this.parsePartialPath(lastPart);
        const parentNode = await this.fs.getItem(pathInfo.parentPath);
        if (!parentNode || parentNode.type !== 'directory') {
            return {
                completion: fullInput,
                matches: [],
                type: 'invalid_path'
            };
        }
        const matches = this.getMatchingEntries(parentNode, pathInfo.prefix, command);
        if (matches.length === 1) {
            const newPath = this.constructNewPath(lastPart, matches[0], pathInfo);
            const beforePath = parts.slice(0, -1).join(' ');
            return {
                completion: beforePath + (beforePath ? ' ' : '') + newPath,
                matches,
                type: 'single'
            };
        }
        else if (matches.length > 1) {
            const commonPrefix = this.findCommonPrefix(matches);
            let completion = fullInput;
            if (commonPrefix.length > pathInfo.prefix.length) {
                const newPath = this.constructNewPath(lastPart, commonPrefix, pathInfo);
                const beforePath = parts.slice(0, -1).join(' ');
                completion = beforePath + (beforePath ? ' ' : '') + newPath;
            }
            return {
                completion,
                matches,
                type: 'multiple'
            };
        }
        return {
            completion: fullInput,
            matches,
            type: 'none'
        };
    }
    parsePartialPath(partialPath) {
        if (partialPath === '') {
            return {
                parentPath: this.fs.currentPath,
                prefix: '',
                isAbsolute: false
            };
        }
        if (partialPath.startsWith('/')) {
            if (partialPath === '/') {
                return {
                    parentPath: '/',
                    prefix: '',
                    isAbsolute: true
                };
            }
            const pathParts = partialPath.split('/').filter(p => p);
            const parentPath = '/' + pathParts.slice(0, -1).join('/');
            return {
                parentPath: parentPath === '/' ? '/' : parentPath,
                prefix: pathParts[pathParts.length - 1] || '',
                isAbsolute: true
            };
        }
        else {
            if (partialPath.includes('/')) {
                const pathParts = partialPath.split('/');
                const dirParts = pathParts.slice(0, -1);
                return {
                    parentPath: this.fs.resolvePath(dirParts.join('/')),
                    prefix: pathParts[pathParts.length - 1],
                    isAbsolute: false
                };
            }
            else {
                return {
                    parentPath: this.fs.currentPath,
                    prefix: partialPath,
                    isAbsolute: false
                };
            }
        }
    }
    getMatchingEntries(parentNode, prefix, command) {
        const entries = Object.keys(parentNode.contents || {})
            .filter(name => name.startsWith(prefix));
        // Add special directories for current directory
        if (parentNode === this.fs.getCurrentNode()) {
            if ('.'.startsWith(prefix) && prefix !== '.' && !entries.includes('.')) {
                entries.unshift('.');
            }
            if ('..'.startsWith(prefix) && prefix !== '..' && !entries.includes('..')) {
                entries.unshift('..');
            }
        }
        // Handle trailing slashes based on command type
        const isFileOnlyCommand = ['cat', 'less', 'more', 'head', 'tail'].includes(command);
        return entries.map(name => {
            if (name === '.' || name === '..') {
                return name + '/';
            }
            const item = parentNode.contents[name];
            const isDir = item && item.type === 'directory';
            if (isFileOnlyCommand && isDir) {
                return name; // Don't add trailing slash for file commands
            }
            return isDir ? name + '/' : name;
        });
    }
    constructNewPath(originalPath, match, _pathInfo) {
        if (originalPath === '') {
            return match;
        }
        else if (originalPath.includes('/')) {
            return originalPath.replace(/[^/]*$/, match);
        }
        else {
            return match;
        }
    }
    findCommonPrefix(strings) {
        if (strings.length === 0)
            return '';
        if (strings.length === 1)
            return strings[0];
        // Remove trailing slashes for comparison
        const cleanStrings = strings.map(s => s.replace(/\/$/, ''));
        let prefix = '';
        const minLength = Math.min(...cleanStrings.map(s => s.length));
        for (let i = 0; i < minLength; i++) {
            const char = cleanStrings[0][i];
            if (cleanStrings.every(str => str[i] === char)) {
                prefix += char;
            }
            else {
                break;
            }
        }
        return prefix;
    }
    formatMatches(matches, maxColumns = 80) {
        if (matches.length === 0)
            return '';
        const maxLength = Math.max(...matches.map(m => m.length));
        const columns = Math.floor(maxColumns / (maxLength + 2));
        let output = '';
        for (let i = 0; i < matches.length; i += columns) {
            const row = matches.slice(i, i + columns);
            output += row.map(m => m.padEnd(maxLength + 2)).join('') + '\n';
        }
        return output.trim();
    }
}
export default TabCompletion;
//# sourceMappingURL=TabCompletion.js.map