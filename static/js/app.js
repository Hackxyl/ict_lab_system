/* ======================================
   PAGE LOADER
====================================== */

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});


/* ======================================
   AOS ANIMATION
====================================== */

AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});


/* ======================================
   MOBILE NAVIGATION
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });

        });

        document.addEventListener("click", (e) => {

            if (
                !menuBtn.contains(e.target) &&
                !navLinks.contains(e.target)
            ) {
                navLinks.classList.remove("active");
            }

        });
    }

});


/* ======================================
   NAVBAR SCROLL EFFECT
====================================== */

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 30) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }

});


/* ======================================
   CARD HOVER EFFECT
====================================== */

document.querySelectorAll(".about-card").forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });

});


/* ======================================
   CONTACT FORM EFFECTS
====================================== */

document.querySelectorAll(".form-group input, .form-group textarea")
.forEach(field => {

    field.addEventListener("focus", () => {
        field.parentElement.classList.add("focused");
    });

    field.addEventListener("blur", () => {
        field.parentElement.classList.remove("focused");
    });

});


/* ======================================
   SCROLL ANIMATION
====================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show-element");
        }

    });

}, {
    threshold: 0.1
});

document.querySelectorAll(
    ".about-card, .contact-card, .contact-info-card"
).forEach(item => {

    item.classList.add("hidden-element");

    observer.observe(item);

});