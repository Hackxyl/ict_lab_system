/* =========================================
   SERVICES.JS - GLOBAL SERVICE PAGES LOGIC
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
   MOBILE MENU FIX (SAFE TOGGLE)
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    // ensure menu is CLOSED on page load
    navLinks.classList.remove("active");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // close when clicking link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

    // close when clicking outside menu
    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove("active");
        }
    });
}


    /* =========================
       2. NAVBAR SCROLL EFFECT
    ========================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =========================
       3. ACTIVE LINK HIGHLIGHT
    ========================= */

    const currentPage = window.location.pathname;

    document.querySelectorAll(".nav-links a").forEach(link => {

        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active-link");
        }

    });


    /* =========================
       4. SMOOTH SCROLL FIX
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });

    });


    /* =========================
       5. SCROLL ANIMATION HELPER
    ========================= */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show-element");
            }

        });

    }, {
        threshold: 0.1
    });

    document.querySelectorAll(".about-card, .stat-box, .benefit-box, .service-card")
        .forEach(el => {
            el.classList.add("hidden-element");
            observer.observe(el);
        });


    /* =========================
       6. HOVER SOUND-LIKE EFFECT (UI FEEL)
    ========================= */

    document.querySelectorAll(".about-card, .service-card, .stat-box").forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-8px) scale(1.02)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)";
        });

    });


    /* =========================
       7. BUTTON CLICK FEEDBACK
    ========================= */

    document.querySelectorAll(".btn-primary, .btn-secondary").forEach(btn => {

        btn.addEventListener("click", function () {

            this.style.transform = "scale(0.95)";

            setTimeout(() => {
                this.style.transform = "";
            }, 150);

        });

    });

});