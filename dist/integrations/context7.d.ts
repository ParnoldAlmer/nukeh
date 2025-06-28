export class Context7Integration {
    isEnabled: boolean;
    mcpEndpoint: string | null;
    logger: import("../utils/logger.js").Logger;
    documentationCache: Map<any, any>;
    cacheExpiry: number;
    /**
     * Initialize Context7 MCP connection
     */
    initialize(): Promise<{
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
    /**
     * Get documentation for a library or topic
     */
    getDocumentation(libraryName: any, topic?: null): Promise<{
        success: boolean;
        error: {
            message: any;
            code: any;
            context: any;
        };
    } | {
        success: boolean;
        data: any;
    } | {
        success: boolean;
        error: string;
    }>;
    /**
     * Resolve library ID from name
     */
    resolveLibraryId(libraryName: any): Promise<{
        success: boolean;
        error: {
            message: any;
            code: any;
            context: any;
        };
    } | {
        success: boolean;
        data: any;
    } | {
        success: boolean;
        error: string;
    }>;
    /**
     * Search for libraries matching a query
     */
    searchLibraries(query: any): Promise<{
        success: boolean;
        error: {
            message: any;
            code: any;
            context: any;
        };
    } | {
        success: boolean;
        data: any;
    } | {
        success: boolean;
        error: string;
    }>;
    /**
     * Get status of Context7 integration
     */
    getStatus(): {
        enabled: boolean;
        endpoint: string | null;
        cached_docs: number;
        integration_type: string;
    };
    /**
     * Clear documentation cache
     */
    clearCache(): void;
    /**
     * Enhanced help command with Context7 integration
     */
    getEnhancedHelp(command?: null): Promise<string | null>;
}
export const context7: Context7Integration;
export default Context7Integration;
//# sourceMappingURL=context7.d.ts.map