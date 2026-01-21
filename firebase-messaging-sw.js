importScripts("https://www.gstatic.com/firebasejs/12.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBApuMnEfdTnkyNRbOIYFGsdsOHtZW-d7Q",
  authDomain: "italian-pwa.firebaseapp.com",
  projectId: "italian-pwa",
  storageBucket: "italian-pwa.firebasestorage.app",
  messagingSenderId: "800245106966",
  appId: "1:800245106966:web:b8058811b441eafe016837"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png"
  });
});
