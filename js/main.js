// NUKEH Main Application Entry Point
import { Terminal } from './terminal.js';

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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