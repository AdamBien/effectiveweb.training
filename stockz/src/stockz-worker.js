

const cacheName = 'stockz-cache';
const views = ['AboutView', 'AddView', 'AirElement', 'ListView', 'Overview', 'Stocks', 'TotalView','chunk-e5d5374c.js'].map(view => `views/${view}.js`);
const resources = ['index.html','style.css','configuration.json','app.js'].concat(views);

self.addEventListener('install', event =>
    event.waitUntil(caches.open(cacheName).
        then(cache => cache.addAll(resources)))
)

self.addEventListener('fetch', event => {
    const { request } = event;
    console.log('onfetch ', request);
    event.respondWith(caches.match(request).
        then(response => (response || fetch(request))))
});