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

const notifyBtn = document.getElementById("notifyBtn");

if (notifyBtn && "Notification" in window) {
    notifyBtn.addEventListener("click", async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission !== "granted") return;

            const token = await getToken(messaging, {
                vapidKey: "BJJ-D77WksAq52maFOkRJLmj75KeICqOaRkjnpTHoUuMJaLKW7f4f8NL7bzKCA2Iaf325PERQ-gHFgTMhx03Pm4"
            });

            if (!token) {
                console.error("❌ No FCM token received");
                return;
            }

            console.log("✅ Firebase token:", token);

            // 📡 SEND TOKEN TO CLOUDFLARE WORKER
            await fetch("https://push-worker.seanmitchell09022000.workers.dev/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    language: "it"
                })
            });

            console.log("📨 Token sent to backend");

            notifyBtn.textContent = "🔔 Notifications enabled";
            notifyBtn.disabled = true;

        } catch (err) {
            console.error("❌ Firebase push setup failed:", err);
        }
    });
}
