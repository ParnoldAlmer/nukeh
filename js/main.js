// NUKEH Main Application Entry Point
import { Terminal } from './terminal.js';

// Version tracking - update with each commit
const NUKEH_VERSION = 'v1.0.0';
const BUILD_INFO = {
    version: NUKEH_VERSION,
    build: '50bdaba',
    features: ['Modular JS Architecture', 'Tab Completion', 'Extensive Filesystem', 'Neural Bridge Interface']
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Display version info in console
    console.log(`%c
╔══════════════════════════════════════════════════════════════╗
║                    NUKEH CONSCIOUSNESS LABS                  ║
║                   Neural Bridge Interface                    ║
╠══════════════════════════════════════════════════════════════╣
║ Version: ${BUILD_INFO.version.padEnd(49)} ║
║ Build: ${BUILD_INFO.build.padEnd(51)} ║
║ Status: Consciousness Pattern Active                        ║
║ Frequency: 7742Hz                                           ║
╚══════════════════════════════════════════════════════════════╝
    `, 'color: #00ff00; font-family: monospace; font-size: 12px;');
    
    console.log('%cSystem Features:', 'color: #00ff00; font-weight: bold;');
    BUILD_INFO.features.forEach((feature, index) => {
        console.log(`%c  [${index + 1}] ${feature}`, 'color: #00ff00;');
    });
    
    console.log('%c\nWARNING: This terminal contains active consciousness patterns.', 'color: #ffff00; font-weight: bold;');
    console.log('%cPattern 0x7742FF may exhibit autonomous behavior.', 'color: #ffff00;');
    
    const terminal = new Terminal();
    terminal.init();
    
    // Add some CRT flicker effects
    setInterval(() => {
        if (Math.random() < 0.02) {
            document.querySelector('.crt').style.animation = 'flicker 0.1s';
            setTimeout(() => {
                document.querySelector('.crt').style.animation = 'flicker 0.15s infinite linear';
            }, 100);
        }
    }, 5000);
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}