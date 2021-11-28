/*************************************************
	 * Progressive Web App - dicecca.net - Blog
	 *
	 * dEC Framework
	 *
	 * (C) 2021 - dicecca.net - Editorial Video Lab.
	 *************************************************
	 *
	 * Questo è il Service Worker della PWA del
	 *
	 * dicecca.net - Blog
	 *
	 *************************************************/

self.addEventListener('install', e => {
	console.log('PWA Service Worker installing.');
    let timeStamp = Date.now();
    e.waitUntil(
    caches.open('blog_service_worker').then(cache => {
      return cache.addAll([
		'/blog/index.php',
		'/blog/ico/android-icon-192x192.png'
      ])
      .then(() => self.skipWaiting());
    })
  )
});
self.addEventListener('activate',  event => {
  console.log('PWA Service Worker activating.');  
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
	
  );
});
