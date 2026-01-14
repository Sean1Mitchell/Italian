const CACHE_NAME = "italian-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/index.css",
  "/index.js",
];

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});
