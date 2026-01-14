const CACHE_NAME = "italian-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});

self.addEventListener("push", event => {
  const data = event.data?.json() || {};

  event.waitUntil(
    self.registration.showNotification(
      data.title || "Italian Reminder 🇮🇹",
      {
        body: data.body || "Time to practise a little Italian today!",
        icon: "icons/icon-192.png",
        badge: "/badge.png"
      }
    )
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || "/")
  );
});
