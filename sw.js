// NUKEH Service Worker - Lightweight offline support
const CACHE_NAME = 'nukeh-v1.0.0';
const STATIC_ASSETS = [
    '/',
    '/css/terminal.css',
    '/js/main.js',
    '/js/terminal.js',
    '/js/filesystem.js',
    '/js/data/characters.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip caching for chrome-extension and other unsupported schemes
    const url = new URL(event.request.url);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version if available
                if (response) {
                    return response;
                }
                
                // Otherwise fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Check if valid response and cacheable
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Only cache HTTP/HTTPS requests
                        const requestUrl = new URL(event.request.url);
                        if (requestUrl.protocol === 'http:' || requestUrl.protocol === 'https:') {
                            // Clone response to cache
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                })
                                .catch((error) => {
                                    // Silently ignore cache errors for unsupported schemes
                                    console.debug('Cache put failed:', error);
                                });
                        }
                        
                        return response;
                    })
                    .catch((error) => {
                        console.debug('Fetch failed:', error);
                        return new Response('Network error', { status: 503 });
                    });
            })
    );
});