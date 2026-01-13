document.addEventListener("DOMContentLoaded" , () => {

    const hamburger = document.querySelector(".hamburger");
    const sidebar = document.querySelector(".sidebar");
    const body = document.body;
    const buttons = document.querySelectorAll(".sidebar-btn");

    hamburger.addEventListener("click" , () => {
        sidebar.classList.toggle("active");
        body.classList.toggle("sidebar-open");
        if (!sidebar.classList.contains("active")) closeAllDropdowns();
    })

    document.addEventListener("click", e => {
        if (
            sidebar.classList.contains("active") &&
            !sidebar.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            sidebar.classList.remove("active");
            body.classList.remove("sidebar-open");
            closeAllDropdowns();
        }
    });

})