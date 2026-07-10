/*==================================================
KIANGINI ICT DEPARTMENT
PUBLIC WEBSITE
BASE JAVASCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================================
    PAGE LOADER
    ==============================================*/

    window.addEventListener("load", () => {

        document.body.classList.add("loaded");

    });


    /*==============================================
    NAVBAR ELEMENTS
    ==============================================*/

    const navbar = document.querySelector(".navbar");

    const menuToggle = document.querySelector(".menu-toggle");

    const navLinks = document.querySelector(".nav-links");


    /*==============================================
    STICKY NAVBAR
    ==============================================*/

    const handleNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        }

        else {

            navbar.classList.remove("scrolled");

        }

    };

    handleNavbar();

    window.addEventListener("scroll", handleNavbar);


    /*==============================================
    MOBILE MENU TOGGLE
    ==============================================*/

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", (e) => {

            e.stopPropagation();

            navLinks.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (navLinks.classList.contains("active")) {

                    icon.classList.remove("fa-bars");

                    icon.classList.add("fa-times");

                }

                else {

                    icon.classList.remove("fa-times");

                    icon.classList.add("fa-bars");

                }

            }

        });

    }


    /*==============================================
    CLOSE MENU AFTER LINK CLICK
    ==============================================*/

    if (navLinks && menuToggle) {

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-times");

                    icon.classList.add("fa-bars");

                }

            });

        });

    }


    /*==============================================
    CLICK OUTSIDE TO CLOSE MENU
    ==============================================*/

    document.addEventListener("click", (e) => {

        if (!navLinks || !menuToggle) return;

        if (

            navLinks.classList.contains("active") &&

            !navLinks.contains(e.target) &&

            !menuToggle.contains(e.target)

        ) {

            navLinks.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-times");

                icon.classList.add("fa-bars");

            }

        }

    });

});

/*==================================================
BASE JAVASCRIPT
SMOOTH SCROLL + SCROLLSPY
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================================
    SMOOTH SCROLL
    ==============================================*/

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const navbar = document.querySelector(".navbar");

            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.offsetTop - navbarHeight - 10;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /*==============================================
    SCROLLSPY
    ==============================================*/

    const navbar = document.querySelector(".navbar");

    const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

    const sections = document.querySelectorAll("section[id]");

    if (navLinks.length && sections.length) {

        const activateNav = () => {

            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            const scrollPosition = window.scrollY + navbarHeight + 120;

            let currentSection = "";

            sections.forEach(section => {

                if (

                    scrollPosition >= section.offsetTop &&

                    scrollPosition < section.offsetTop + section.offsetHeight

                ) {

                    currentSection = section.getAttribute("id");

                }

            });

            navLinks.forEach(link => {

                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href === "#" + currentSection) {

                    link.classList.add("active");

                }

            });

        };

        activateNav();

        window.addEventListener("scroll", activateNav);

    }

});

/*==================================================
KIANGINI ICT DEPARTMENT
BASE JAVASCRIPT
AOS + COUNTERS + UTILITIES
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================================
    AOS INITIALIZATION
    ==============================================*/

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 900,

            easing: "ease-out",

            once: true,

            mirror: false,

            offset: 80

        });

    }


    /*==============================================
    ANIMATED COUNTERS
    ==============================================*/

    const counters = document.querySelectorAll(".counter");

    if (counters.length) {

        const animateCounter = (counter) => {

            const text = counter.textContent.trim();

            const number = parseInt(text.replace(/\D/g, "")) || 0;

            const suffix = text.replace(/[0-9]/g, "");

            const duration = 1800;

            const startTime = performance.now();

            const update = (currentTime) => {

                const progress = Math.min(

                    (currentTime - startTime) / duration,

                    1

                );

                const value = Math.floor(progress * number);

                counter.textContent = value + suffix;

                if (progress < 1) {

                    requestAnimationFrame(update);

                }

                else {

                    counter.textContent = number + suffix;

                }

            };

            requestAnimationFrame(update);

        };


        const observer = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },

            {

                threshold: 0.4

            }

        );

        counters.forEach(counter => {

            observer.observe(counter);

        });

    }


    /*==============================================
    AUTO FOOTER YEAR
    ==============================================*/

    const year = document.querySelector("#currentYear");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

  /*==============================================
    SIMPLE REVEAL CLASS
    (optional utility)
    ==============================================*/

    const reveals = document.querySelectorAll(".reveal");

    if (reveals.length) {

        const revealObserver = new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                    }

                });

            },

            {

                threshold: 0.15

            }

        );

        reveals.forEach(item => revealObserver.observe(item));

    }

});

/*==================================================
    BUTTON RIPPLE EFFECT
==================================================*/

document.querySelectorAll(".btn-primary, .btn-secondary").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;

        ripple.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;

        ripple.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;

        ripple.classList.add("ripple");

        const oldRipple = this.querySelector(".ripple");

        if (oldRipple) {

            oldRipple.remove();

        }

        this.appendChild(ripple);

    });

});


/*==================================================
    HERO PARALLAX (DESKTOP ONLY)
==================================================*/

if (window.innerWidth > 992) {

    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {

        window.addEventListener("mousemove", (e) => {

            const x = (window.innerWidth / 2 - e.clientX) / 40;

            const y = (window.innerHeight / 2 - e.clientY) / 40;

            heroImage.style.transform = `translate(${x}px, ${y}px)`;

        });

    }

}


/*==================================================
    ACTIVE NAVIGATION
==================================================*/

const currentPath = window.location.pathname;

document.querySelectorAll(".nav-links a").forEach(link => {

    if (link.getAttribute("href") === currentPath) {

        link.classList.add("active");

    }

});


/*==================================================
    SMOOTH PAGE TRANSITION
==================================================*/

window.addEventListener("pageshow", () => {

    document.body.classList.add("page-loaded");

});


/*==================================================
    YEAR
==================================================*/

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}


/*==================================================
    SCROLL TO TOP
==================================================*/

const scrollBtn = document.getElementById("scrollTop");

if (scrollBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            scrollBtn.classList.add("show");

        } else {

            scrollBtn.classList.remove("show");

        }

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/*==================================================
    IMAGE LAZY ANIMATION
==================================================*/

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("loaded");

            imageObserver.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.15

});

images.forEach(img => {

    imageObserver.observe(img);

});

/*=====================================
FAQ ACCORDION
======================================*/

document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            // Close all FAQ items
            faqItems.forEach(faq => {

                faq.classList.remove("active");

            });

            // Open the clicked item if it wasn't already open
            if (!isActive) {

                item.classList.add("active");

            }

        });

    });

});
