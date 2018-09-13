

const cacheName = 'stockz-cache-v0.0.2';
const views = ['AboutView', 'AddView', 'AirElement', 'ListView', 'Overview', 'Stocks', 'TotalView','chunk-e5d5374c'].map(view => `views/${view}.js`);
const resources = ['index.html','style.css','configuration.json','app.js','d3/d3.js'].concat(views);

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

self.addEventListener('activate', event => { 
    console.log('cleaning old caches');
    const staleCaches = caches.keys().then(keys => keys.filter(key => key !== cacheName).map(stale => caches.delete(stale)));
    event.waitUntil(staleCaches);
})