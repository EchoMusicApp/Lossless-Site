const CACHE_NAME = 'echo-music-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/App Logo/echo.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Pass through non-GET requests and dynamic content
  if (event.request.method !== 'GET' || event.request.url.includes('music.json') || event.request.url.includes('itunes.apple.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Return cached
        }
        return fetch(event.request); // Fallback to network
      })
  );
});
