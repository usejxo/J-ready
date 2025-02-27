const CACHE_NAME = "j-ready-cache-v2";

        self.addEventListener("install", (event) => {
            event.waitUntil(
                caches.open(CACHE_NAME).then((cache) => {
                    return cache.addAll([
                        "/J-ready/",
                        "/J-ready/index.html",
                        "/J-ready/manifest.json",
                        "/J-ready/icons/images/icon.png"
                    ]);
                })
            );
            self.skipWaiting();
        });

        self.addEventListener("fetch", (event) => {
            event.respondWith(
                caches.match(event.request).then((response) => {
                    return response || fetch(event.request).then((networkResponse) => {
                        return caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        });
                    });
                }).catch(() => caches.match("J-ready/index.html"))
            );
        });

        self.addEventListener("activate", (event) => {
            event.waitUntil(
                caches.keys().then((cacheNames) => {
                    return Promise.all(
                        cacheNames.map((cache) => {
                            if (cache !== CACHE_NAME) {
                                return caches.delete(cache);
                            }
                        })
                    );
                })
            );
            self.clients.claim();
        });