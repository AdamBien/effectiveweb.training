

const cacheName = 'stockz-cache';
const resources = ['index.html','style.css','app.js','AirNav.js','AirSlot.js','AirCrumb.js','views/TotalView.js','views/AirElements.js','views/Stocks.js'];
console.log('caches', caches);


self.addEventListener('install', event =>
    caches.open(cacheName).then(cache => cache.addAll(resources))
)