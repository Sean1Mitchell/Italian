import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-messaging.js";

const firebaseConfig = {
    apiKey: "AIzaSyBApuMnEfdTnkyNRbOIYFGsdsOHtZW-d7Q",
    authDomain: "italian-pwa.firebaseapp.com",
    projectId: "italian-pwa",
    storageBucket: "italian-pwa.firebasestorage.app",
    messagingSenderId: "800245106966",
    appId: "1:800245106966:web:b8058811b441eafe016837"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const notifyBtn = document.querySelector(".notify-btn");

if (notifyBtn && "serviceWorker" in navigator) {
    notifyBtn.addEventListener("click", async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission !== "granted") return;

            // 🔥 Get the existing SW registration
            const registration = await navigator.serviceWorker.ready;

            const token = await getToken(messaging, {
                vapidKey: "BJJ-D77WksAq52maFOkRJLmj75KeICqOaRkjnpTHoUuMJaLKW7f4f8NL7bzKCA2Iaf325PERQ-gHFgTMhx03Pm4",
                serviceWorkerRegistration: registration
            });

            console.log("✅ Firebase token:", token);

            await fetch("https://push-worker.seanmitchell09022000.workers.dev/fcm-subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, language: "it" })
            });

            console.log("📨 Token sent to backend");

            notifyBtn.textContent = "🔔 Notifications enabled";
            notifyBtn.disabled = true;

        } catch (err) {
            console.error("❌ Firebase push failed:", err);
        }
    });
}
