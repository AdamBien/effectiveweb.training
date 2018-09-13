
const cacheName = 'stockz-cache-v0.0.4';
const resources = ['index.html','style.css','app.js','d3/d3.js'];

const prefetch = (name) => caches.open(name).then(cache => cache.addAll(resources));

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(prefetch(cacheName));
}
)

self.addEventListener('fetch', event => {
    const { request } = event;
    console.log('onfetch ', request);
    event.respondWith(caches.match(request).
        then(response => (response || fetch(request))))
});

self.addEventListener('activate', event => { 
    console.log('cleaning old caches');
    self.clients.claim();
    const staleCaches = caches.keys().then(keys => keys.filter(key => key !== cacheName).map(stale => caches.delete(stale)));
    event.waitUntil(staleCaches);
})

self.addEventListener('message', event => { 
    console.log(event);
    caches.delete(cacheName).then(_ => prefetch(cacheName));
});