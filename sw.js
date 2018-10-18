self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('tictactoe').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/style.css',
       '/scripts/lodash.min.js',
       '/scripts/scripts.js',
       'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'
     ]);
   })
 );
});


self.addEventListener('fetch', function(event) {
  // console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
