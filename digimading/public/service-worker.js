const CACHE_NAME = "digimading v-1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/beranda.html",
  "/pages/koleksi.html",
  "/pages/about.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/releasedsoon.html",
  "/js/nav.js",
  "/css/style.css",
  "/img/1.png",
  "/img/osis-logo.svg",
  "/img/thumb-1.png",
  "/img/thumb-2.png",
  "/img/thumb-3.png",
  "/img/thumb-4.png",
  "/favicon.ico",
  "/edisi-1.html"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });