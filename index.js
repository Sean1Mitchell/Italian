document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       SIDEBAR / HAMBURGER
    ========================== */

    const hamburger = document.querySelector(".hamburger");
    const sidebar = document.querySelector(".sidebar");
    const body = document.body;

    if (hamburger && sidebar) {
        hamburger.addEventListener("click", () => {
            sidebar.classList.toggle("active");
            body.classList.toggle("sidebar-open");

            if (!sidebar.classList.contains("active")) {
                closeAllDropdowns?.();
            }
        });

        document.addEventListener("click", (e) => {
            if (
                sidebar.classList.contains("active") &&
                !sidebar.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                sidebar.classList.remove("active");
                body.classList.remove("sidebar-open");
            }
        });
    }


    /* =========================
        PUSH NOTIFICATIONS 
    ========================= */

    const notifyBtn = document.getElementById("notifyBtn");

    if ("Notification" in window && "serviceWorker" in navigator && notifyBtn) {

        const updateButtonState = () => {
            if (Notification.permission === "granted") {
                notifyBtn.textContent = "🔔 Notifications enabled";
                notifyBtn.disabled = true;
            }

            if (Notification.permission === "denied") {
                notifyBtn.textContent = "🔕 Notifications blocked";
                notifyBtn.disabled = true;
            }
        };

        updateButtonState();

        notifyBtn.addEventListener("click", async () => {
            try {
                // 1️⃣ Request permission
                const permission = await Notification.requestPermission();

                if (permission !== "granted") {
                    updateButtonState();
                    return;
                }

                // 2️⃣ Get active service worker
                const registration = await navigator.serviceWorker.ready;

                // 3️⃣ Get existing subscription OR create a new one
                let subscription = await registration.pushManager.getSubscription();

                if (!subscription) {
                    subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey:
                            "BFrZ2jrXMzpIibP3a225IRvQdjnn25_oDNQcIlhb6SAKMRmf6OdqsMuon6kdbKgA235Jzs-mRNO3hKuXqv1pgbQ"
                    });
                }

                // 4️⃣ Send subscription to Cloudflare Worker
                await fetch(
                    "https://push-worker.seanmitchell09022000.workers.dev/subscribe",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(subscription)
                    }
                );

                // 5️⃣ Update UI
                notifyBtn.textContent = "🔔 Notifications enabled";
                notifyBtn.disabled = true;

                console.log("Push subscription saved");

            } catch (err) {
                console.error("Push setup failed:", err);
            }
        });
    }



    /* =========================
       INDEX PAGE COVER
    ========================== */

    const startBtn = document.getElementById("startBtn");
    const cover = document.getElementById("cover");
    const homeContent = document.getElementById("homeContent");

    if (cover && homeContent && sessionStorage.getItem("entered")) {
        cover.classList.add("hide");
        homeContent.classList.add("show");
    }

    if (startBtn && cover && homeContent) {
        startBtn.addEventListener("click", () => {
            sessionStorage.setItem("entered", "true");
            cover.classList.add("hide");
            homeContent.classList.add("show");
        });
    }

    /* =========================
       TABLE OF CONTENTS
    ========================== */

    const tocBtn = document.querySelector(".table-of-contents-btn");
    const tocContent = document.querySelector(".table-of-contents-content");
    const tocDropdowns = document.querySelectorAll(".toc-dropdown");
    const tocButtons = document.querySelectorAll(".toc-btn");

    if (tocBtn && tocContent) {

        tocBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tocContent.style.display =
                tocContent.style.display === "block" ? "none" : "block";
        });

        tocButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const dropdown = btn.nextElementSibling;

                tocDropdowns.forEach((d) => {
                    if (d !== dropdown) d.classList.remove("show");
                });

                dropdown?.classList.toggle("show");
            });
        });

        document.addEventListener("click", (e) => {
            if (
                !tocContent.contains(e.target) &&
                !tocBtn.contains(e.target)
            ) {
                tocContent.style.display = "none";
                tocDropdowns.forEach((d) => d.classList.remove("show"));
            }
        });

        tocDropdowns.forEach((dropdown) => {
            dropdown.querySelectorAll("a").forEach((link) => {
                link.addEventListener("click", () => {
                    tocContent.style.display = "none";
                    tocDropdowns.forEach((d) => d.classList.remove("show"));
                });
            });
        });
    }


    /* =========================
       SERVICE WORKER JS
    ========================== */


    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js")
            .then(() => console.log("Service Worker registered"))
            .catch(err => console.error("SW failed", err));
    }


});
