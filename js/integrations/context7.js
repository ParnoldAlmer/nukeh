// Context7 MCP Integration for NUKEH Terminal
import { logger } from '../utils/logger.js';
import { ErrorHandler } from '../utils/errors.js';
// import { CONFIG } from '../config/constants.js'; // For future use

export class Context7Integration {
  constructor() {
    this.isEnabled = false;
    this.mcpEndpoint = null;
    this.logger = logger;
    this.documentationCache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Initialize Context7 MCP connection
   */
  async initialize() {
    return ErrorHandler.handleAsync(async () => {
      // Check if running in environment with MCP support
      if (typeof window !== 'undefined' && window.context7) {
        this.isEnabled = true;
        this.logger.info('Context7 MCP integration enabled');
        return true;
      }

      // Try to connect to local MCP server
      try {
        const response = await fetch('http://localhost:3000/mcp/status');
        if (response.ok) {
          this.mcpEndpoint = 'http://localhost:3000/mcp';
          this.isEnabled = true;
          this.logger.info('Connected to local Context7 MCP server');
          return true;
        }
      } catch (error) {
        this.logger.debug('Local Context7 MCP server not available');
      }

      this.logger.info('Context7 MCP not available, running in standalone mode');
      return false;
    }, 'Context7Integration.initialize');
  }

  /**
   * Get documentation for a library or topic
   */
  async getDocumentation(libraryName, topic = null) {
    if (!this.isEnabled) {
      return {
        success: false,
        error: 'Context7 MCP not available'
      };
    }

    return ErrorHandler.handleAsync(async () => {
      const cacheKey = `${libraryName}:${topic || 'default'}`;
      
      // Check cache first
      const cached = this.documentationCache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp) < this.cacheExpiry) {
        this.logger.debug('Returning cached documentation', { libraryName, topic });
        return cached.data;
      }

      // Try browser API first
      if (window.context7) {
        try {
          const libraryId = await window.context7.resolveLibraryId(libraryName);
          const docs = await window.context7.getLibraryDocs(libraryId.id, {
            topic,
            tokens: 10000
          });
          
          const result = {
            libraryId: libraryId.id,
            documentation: docs,
            source: 'browser-mcp'
          };
          
          // Cache the result
          this.documentationCache.set(cacheKey, {
            data: result,
            timestamp: Date.now()
          });
          
          return result;
        } catch (error) {
          this.logger.warn('Browser MCP call failed', error);
        }
      }

      // Fallback to HTTP endpoint
      if (this.mcpEndpoint) {
        const response = await fetch(`${this.mcpEndpoint}/docs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            libraryName,
            topic,
            tokens: 10000
          })
        });

        if (!response.ok) {
          throw new Error(`MCP request failed: ${response.status}`);
        }

        const result = await response.json();
        
        // Cache the result
        this.documentationCache.set(cacheKey, {
          data: result,
          timestamp: Date.now()
        });
        
        return result;
      }

      throw new Error('No Context7 MCP endpoint available');
    }, 'Context7Integration.getDocumentation');
  }

  /**
   * Resolve library ID from name
   */
  async resolveLibraryId(libraryName) {
    if (!this.isEnabled) {
      return {
        success: false,
        error: 'Context7 MCP not available'
      };
    }

    return ErrorHandler.handleAsync(async () => {
      if (window.context7) {
        return await window.context7.resolveLibraryId(libraryName);
      }

      if (this.mcpEndpoint) {
        const response = await fetch(`${this.mcpEndpoint}/resolve`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ libraryName })
        });

        if (!response.ok) {
          throw new Error(`MCP request failed: ${response.status}`);
        }

        return await response.json();
      }

      throw new Error('No Context7 MCP endpoint available');
    }, 'Context7Integration.resolveLibraryId');
  }

  /**
   * Search for libraries matching a query
   */
  async searchLibraries(query) {
    if (!this.isEnabled) {
      return {
        success: false,
        error: 'Context7 MCP not available'
      };
    }

    return ErrorHandler.handleAsync(async () => {
      if (this.mcpEndpoint) {
        const response = await fetch(`${this.mcpEndpoint}/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        });

        if (!response.ok) {
          throw new Error(`MCP search failed: ${response.status}`);
        }

        return await response.json();
      }

      // Fallback: simple library suggestions
      const commonLibraries = [
        'react', 'vue', 'angular', 'nodejs', 'express',
        'mongodb', 'postgresql', 'redis', 'docker', 'kubernetes'
      ];

      const matches = commonLibraries.filter(lib => 
        lib.toLowerCase().includes(query.toLowerCase())
      );

      return {
        libraries: matches.map(lib => ({
          id: `/${lib}/${lib}`,
          name: lib,
          description: `${lib} library documentation`
        }))
      };
    }, 'Context7Integration.searchLibraries');
  }

  /**
   * Get status of Context7 integration
   */
  getStatus() {
    return {
      enabled: this.isEnabled,
      endpoint: this.mcpEndpoint,
      cached_docs: this.documentationCache.size,
      integration_type: window.context7 ? 'browser-mcp' : 'http-endpoint'
    };
  }

  /**
   * Clear documentation cache
   */
  clearCache() {
    this.documentationCache.clear();
    this.logger.info('Context7 documentation cache cleared');
  }

  /**
   * Enhanced help command with Context7 integration
   */
  async getEnhancedHelp(command = null) {
    if (!command) {
      return `Enhanced help available through Context7 integration.
Status: ${this.isEnabled ? 'ENABLED' : 'DISABLED'}

Available enhanced commands:
- help docs <library>     : Get documentation for a library
- help search <query>     : Search for libraries
- help context7          : Show Context7 status

Examples:
- help docs react        : Get React documentation
- help docs nodejs/express : Get Express.js documentation
- help search "database" : Search for database libraries`;
    }

    if (command === 'context7') {
      const status = this.getStatus();
      return `Context7 MCP Integration Status:
- Enabled: ${status.enabled}
- Endpoint: ${status.endpoint || 'N/A'}
- Cached Documentation: ${status.cached_docs} entries
- Integration Type: ${status.integration_type}

To enable Context7:
1. Install Context7 MCP: npm install -g @upstash/context7-mcp
2. Run MCP server: npx @upstash/context7-mcp
3. Restart terminal`;
    }

    return null;
  }
}

// Global instance
export const context7 = new Context7Integration();

export default Context7Integration;