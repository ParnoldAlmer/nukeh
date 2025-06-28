export class TabCompletion {
    constructor(filesystem: any, commandManager: any);
    fs: any;
    commandManager: any;
    logger: import("../utils/logger.js").Logger;
    complete(input: any, cursorPosition?: any): Promise<{
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
    completeCommand(partial: any): {
        completion: any;
        matches: any;
        type: string;
    };
    completeFilePath(fullInput: any, parts: any): Promise<{
        completion: any;
        matches: string[];
        type: string;
    }>;
    parsePartialPath(partialPath: any): {
        parentPath: any;
        prefix: any;
        isAbsolute: boolean;
    };
    getMatchingEntries(parentNode: any, prefix: any, command: any): string[];
    constructNewPath(originalPath: any, match: any, _pathInfo: any): any;
    findCommonPrefix(strings: any): any;
    formatMatches(matches: any, maxColumns?: number): string;
}
export default TabCompletion;
//# sourceMappingURL=TabCompletion.d.ts.map