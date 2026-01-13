const CACHE_NAME = 'glanceread-v2';

// Critical resources needed for initial app shell (cached immediately)
const CRITICAL_CACHE = [
    '/',
    '/index.html'
];

// Non-critical resources (cached in background after installation)
const OPTIONAL_CACHE = [
    '/favicon.png',
    '/logo.png'
];

// Install event - cache only critical resources for fast installation
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async (cache) => {
                // Cache critical resources with timeout protection
                const criticalPromises = CRITICAL_CACHE.map(url =>
                    fetchWithTimeout(url, 3000)
                        .then(response => cache.put(url, response))
                        .catch(err => console.warn(`Failed to cache ${url}:`, err))
                );

                await Promise.all(criticalPromises);
                console.log('Critical resources cached');

                // Cache optional resources without blocking installation
                Promise.all(
                    OPTIONAL_CACHE.map(url =>
                        fetchWithTimeout(url, 5000)
                            .then(response => cache.put(url, response))
                            .catch(err => console.warn(`Optional cache failed for ${url}:`, err))
                    )
                );
            })
    );
    self.skipWaiting();
});

// Fetch with timeout helper
function fetchWithTimeout(url, timeout = 3000) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Fetch timeout')), timeout)
        )
    ]);
}

// Fetch event - stale-while-revalidate strategy for better performance
self.addEventListener('fetch', (event) => {
    // Skip caching for non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(cachedResponse => {
                const fetchPromise = fetch(event.request)
                    .then(networkResponse => {
                        // Cache valid responses
                        if (networkResponse && networkResponse.status === 200) {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    })
                    .catch(() => null);

                // Return cached response immediately, update cache in background
                return cachedResponse || fetchPromise || caches.match('/index.html');
            });
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
