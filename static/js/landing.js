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

    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }

});


/* ======================================
   BACK TO TOP BUTTON
====================================== */

const topButton = document.createElement("button");

topButton.className = "back-to-top";

topButton.innerHTML =
    '<i class="fas fa-arrow-up"></i>';

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        topButton.classList.add("show");
    } else {
        topButton.classList.remove("show");
    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ======================================
   HERO CARDS ANIMATION
====================================== */

const cards = document.querySelectorAll(
    ".glass-card, .service-card, .feature-card, .why-card"
);

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });

});


/* ======================================
   COUNTER ANIMATION
====================================== */

function animateCounter(counter) {

    const target = parseInt(counter.innerText);

    if (isNaN(target)) return;

    let count = 0;

    const speed = target / 60;

    const updateCounter = () => {

        count += speed;

        if (count < target) {

            counter.innerText =
                Math.floor(count);

            requestAnimationFrame(updateCounter);

        } else {

            counter.innerText = target;

        }
    };

    updateCounter();
}

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const h3 =
                entry.target.querySelector("h3");

            if (h3) {
                animateCounter(h3);
            }

            observer.unobserve(entry.target);
        }

    });

});

document.querySelectorAll(
    ".glass-card"
).forEach(card => {
    observer.observe(card);
});


/* ======================================
   ACTIVE NAV LINKS
====================================== */

const sections =
    document.querySelectorAll("section");

const navItems =
    document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if (
            pageYOffset >= sectionTop &&
            pageYOffset <
            sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active-link");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {
            link.classList.add("active-link");
        }

    });

});


/* ======================================
   BUTTON RIPPLE EFFECT
====================================== */

document.querySelectorAll(
    ".btn-primary, .btn-secondary"
).forEach(button => {

    button.addEventListener("click", function (e) {

        const circle =
            document.createElement("span");

        const diameter =
            Math.max(
                this.clientWidth,
                this.clientHeight
            );

        const radius =
            diameter / 2;

        circle.style.width =
            circle.style.height =
            `${diameter}px`;

        circle.style.left =
            `${e.clientX -
            this.offsetLeft -
            radius}px`;

        circle.style.top =
            `${e.clientY -
            this.offsetTop -
            radius}px`;

        circle.classList.add("ripple");

        const ripple =
            this.querySelector(".ripple");

        if (ripple) {
            ripple.remove();
        }

        this.appendChild(circle);

    });

});

