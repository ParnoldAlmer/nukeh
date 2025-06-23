// ASCII Art Console Log
const asciiLogo = `
███╗   ██╗██╗   ██╗██╗  ██╗███████╗██╗  ██╗
████╗  ██║██║   ██║██║ ██╔╝██╔════╝██║  ██║
██╔██╗ ██║██║   ██║█████╔╝ █████╗  ███████║
██║╚██╗██║██║   ██║██╔═██╗ ██╔══╝  ██╔══██║
██║ ╚████║╚██████╔╝██║  ██╗███████╗██║  ██║
╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

Deploy. Destroy. Iterate.
`;

// Console styling
const consoleStyles = [
    'color: #00FFB4',
    'font-family: monospace',
    'font-size: 12px',
    'font-weight: bold'
].join(';');

// Log the ASCII art on page load
console.log(`%c${asciiLogo}`, consoleStyles);
console.log('%cWelcome to NUKEH! 🚀', 'color: #00FFB4; font-size: 16px; font-weight: bold;');
console.log('%cReady to revolutionize your deployment pipeline?', 'color: #c9d1d9; font-size: 14px;');

// Smooth scroll polyfill for older browsers
function smoothScrollTo(element) {
    if ('scrollBehavior' in document.documentElement.style) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Fallback for older browsers
        const targetPosition = element.offsetTop - 80; // Account for fixed nav
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
}

// Scroll Reveal Observer
class ScrollReveal {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            this.observeElements();
        } else {
            // Fallback for older browsers
            this.fallbackReveal();
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Add staggered animation delay for multiple elements
                const delay = Array.from(entry.target.parentNode.children)
                    .indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = `${delay}ms`;
                
                // Stop observing once revealed
                this.observer.unobserve(entry.target);
            }
        });
    }

    observeElements() {
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    fallbackReveal() {
        // Simple fallback that reveals elements immediately
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(element => {
            element.classList.add('active');
        });
    }
}

// Navigation scroll effect
function handleNavScroll() {
    const nav = document.querySelector('.nav');
    const scrollThreshold = 100;

    function updateNav() {
        if (window.scrollY > scrollThreshold) {
            nav.style.background = 'rgba(13, 17, 23, 0.95)';
            nav.style.backdropFilter = 'blur(20px) saturate(180%)';
        } else {
            nav.style.background = 'rgba(13, 17, 23, 0.8)';
            nav.style.backdropFilter = 'blur(20px)';
        }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
}

// Newsletter form handling
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = input.value.trim();
        if (!email || !isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Disable form during submission
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';

        try {
            // Simulate API call (replace with actual endpoint)
            await simulateAPICall(email);
            
            showNotification('Thank you! You\'ve been added to our early access list.', 'success');
            input.value = '';
        } catch (error) {
            showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Re-enable form
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-paper-plane"></i> Get Early Access';
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function simulateAPICall(email) {
    // Simulate API delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                console.log(`Email registered: ${email}`);
                resolve();
            } else {
                reject(new Error('API Error'));
            }
        }, 1500);
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'rgba(0, 255, 180, 0.9)' : 
                   type === 'error' ? 'rgba(255, 99, 132, 0.9)' : 
                   'rgba(99, 180, 255, 0.9)',
        color: '#ffffff',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        backdropFilter: 'blur(10px)',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        maxWidth: '400px',
        fontSize: '0.9rem',
        fontWeight: '500',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Particle effect for hero section
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    
    Object.assign(particlesContainer.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden'
    });

    hero.appendChild(particlesContainer);

    // Create floating particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    Object.assign(particle.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        background: '#00FFB4',
        borderRadius: '50%',
        opacity: Math.random() * 0.5 + 0.1,
        left: `${Math.random() * 100}%`,
        top: '100%',
        animation: `float ${duration}s linear ${delay}s infinite`
    });

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container); // Create new particle
        }
    }, (duration + delay) * 1000);
}

// Add CSS for particle animation
function addParticleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            from {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Log page load performance
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%cPage loaded in ${loadTime}ms`, 'color: #00FFB4; font-weight: bold;');
        }
    });

    // Monitor scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Scroll ended
        }, 100);
    }, { passive: true });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('%cInitializing NUKEH...', 'color: #00FFB4; font-weight: bold;');
    
    // Initialize all features
    new ScrollReveal();
    handleNavScroll();
    initSmoothScroll();
    initNewsletterForm();
    addParticleStyles();
    initParticleEffect();
    initPerformanceMonitoring();

    console.log('%cNUKEH initialized successfully! 🎉', 'color: #00FFB4; font-weight: bold;');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('%cNUKEH is now hidden', 'color: #656c76;');
    } else {
        console.log('%cWelcome back to NUKEH! 👋', 'color: #00FFB4; font-weight: bold;');
    }
});

// Export for potential use by other scripts
window.NUKEH = {
    scrollTo: smoothScrollTo,
    showNotification
};