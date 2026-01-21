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
       COVER / START BUTTON
    ========================= */

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
            if (!tocContent.contains(e.target) && !tocBtn.contains(e.target)) {
                tocContent.style.display = "none";
                tocDropdowns.forEach((d) => d.classList.remove("show"));
            }
        });
    }

    /* =========================
      NOTIFICATIONS – PERMISSION ONLY
   ========================= */

    const notifyBtn = document.querySelector(".notify-btn");

    if (notifyBtn) {
        notifyBtn.addEventListener("click", async () => {
            try {
                const permission = await Notification.requestPermission();
                console.log("Notification permission:", permission);

                if (permission === "granted") {
                    console.log("✅ Notifications allowed");
                    // Firebase token + backend logic is handled
                    // inside firebase-messaging.js
                } else {
                    console.log("❌ Notifications denied");
                }

            } catch (err) {
                console.error("❌ Notification permission failed", err);
            }
        });
    }


    /* =========================
       FIREBASE SERVICE WORKER
    ========================== */

    // ✅ Only SW you should register
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/firebase-messaging-sw.js")
            .then(() => console.log("🔥 Firebase SW registered"))
            .catch(err => console.error("❌ SW failed", err));
    }

});
