// NUKEH Main Application Entry Point
import { Terminal } from './terminal.js';
import { CONFIG } from './config/constants.js';
import { logger } from './utils/logger.js';
import { ErrorHandler } from './utils/errors.js';
// Use centralized configuration
const BUILD_INFO = {
    version: CONFIG.VERSION,
    build: CONFIG.BUILD,
    features: CONFIG.FEATURES
};
// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    logger.info('DOM loaded, initializing NUKEH Terminal');
    // Display version info in console
    console.log(`%c
╔══════════════════════════════════════════════════════════════╗
║                    ${CONFIG.LAB.name.padEnd(22)}                  ║
║                   ${CONFIG.LAB.facility.padEnd(24)}                    ║
╠══════════════════════════════════════════════════════════════╣
║ Version: ${BUILD_INFO.version.padEnd(49)} ║
║ Build: ${BUILD_INFO.build.padEnd(51)} ║
║ Status: ${CONFIG.LAB.status.padEnd(47)} ║
║ Frequency: ${CONFIG.LAB.frequency.padEnd(45)} ║
╚══════════════════════════════════════════════════════════════╝
    `, `color: ${CONFIG.UI.COLORS.primary}; font-family: ${CONFIG.UI.FONTS.mono}; font-size: ${CONFIG.UI.FONTS.size};`);
    console.log(`%cSystem Features:`, `color: ${CONFIG.UI.COLORS.primary}; font-weight: bold;`);
    BUILD_INFO.features.forEach((feature, _index) => {
        console.log(`%c  [${_index + 1}] ${feature}`, `color: ${CONFIG.UI.COLORS.primary};`);
    });
    console.log(`%c\n${CONFIG.MESSAGES?.WARNINGS?.CONSCIOUSNESS || 'WARNING: This terminal contains active consciousness patterns.'}`, `color: ${CONFIG.UI.COLORS.warning}; font-weight: bold;`);
    console.log(`%c${CONFIG.MESSAGES?.WARNINGS?.PATTERN || 'Pattern 0x7742FF may exhibit autonomous behavior.'}`, `color: ${CONFIG.UI.COLORS.warning};`);
    // Initialize terminal with error handling
    const result = ErrorHandler.handleSync(() => {
        const terminal = new Terminal();
        terminal.init();
        return terminal;
    }, 'Terminal Initialization');
    if (!result.success) {
        logger.error('Failed to initialize terminal', result.error);
        return;
    }
    logger.info('Terminal initialized successfully');
    // Add some CRT flicker effects
    setInterval(() => {
        if (Math.random() < CONFIG.TERMINAL.FLICKER_CHANCE) {
            const crtElement = document.querySelector('.crt');
            if (crtElement) {
                crtElement.style.animation = 'flicker 0.1s';
                setTimeout(() => {
                    crtElement.style.animation = 'flicker 0.15s infinite linear';
                }, 100);
            }
        }
    }, CONFIG.TERMINAL.FLICKER_INTERVAL);
});
// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
            logger.info('Service Worker registered successfully', { scope: registration.scope });
        })
            .catch(registrationError => {
            logger.error('Service Worker registration failed', registrationError);
        });
    });
}
//# sourceMappingURL=main.js.map