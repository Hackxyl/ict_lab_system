document.addEventListener("DOMContentLoaded", function () {

    /* ==========================
       ELEMENTS
    ========================== */

    const menuBtn = document.getElementById("mobileToggle");
    const navMenu = document.querySelector(".topbar-nav");
    const userBar = document.querySelector(".topbar-right");

    /* ==========================
       MOBILE MENU
    ========================== */

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            // Always show user bar when menu opens
            if (userBar && navMenu.classList.contains("active")) {
                userBar.classList.remove("hide-user-bar");
            }
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
            });
        });
    }

    /* ==========================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================== */

document.addEventListener("click", function (e) {

    if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        navMenu.classList.remove("active");
    }

});

    /* ==========================
       AUTO HIDE ALERTS
    ========================== */

    setTimeout(function () {

        document.querySelectorAll(".alert").forEach(function (alert) {

            alert.style.transition = "opacity 0.5s ease";
            alert.style.opacity = "0";

            setTimeout(function () {
                alert.style.display = "none";
            }, 500);

        });

    }, 4000);

    /* ==========================
       CARD ANIMATIONS
    ========================== */

    const cards = document.querySelectorAll(
        ".stat-card, .dashboard-card, .announcement-card, .quick-link"
    );

    cards.forEach(function (card, index) {

        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(function () {
            card.style.transition = "0.5s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 100);

    });

    /* ==========================
       USER BAR SCROLL HIDE
    ========================== */

    let lastScroll = 0;

    window.addEventListener("scroll", function () {

        // Mobile only
        if (window.innerWidth > 768) return;

        if (!userBar) return;

        // Don't hide while menu is open
        if (navMenu && navMenu.classList.contains("active")) {
            userBar.classList.remove("hide-user-bar");
            return;
        }

        const currentScroll = window.pageYOffset;

        // Ignore tiny scroll movements
        if (Math.abs(currentScroll - lastScroll) < 10) {
            return;
        }

        if (currentScroll > 80 && currentScroll > lastScroll) {
            // Scrolling down
            userBar.classList.add("hide-user-bar");
        } else {
            // Scrolling up
            userBar.classList.remove("hide-user-bar");
        }

        lastScroll = currentScroll;
    });

});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove("active");
    }
});

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".announcement-card");
    const grid = document.querySelector(".announcement-grid");

    function filterAnnouncements() {

        const value = searchInput.value.toLowerCase().trim();
        let found = 0;

        cards.forEach(card => {

            const title = card.dataset.title || "";
            const message = card.dataset.message || "";

            if (title.includes(value) || message.includes(value)) {
                card.style.display = "block";
                found++;
            } else {
                card.style.display = "none";
            }
        });

        // remove old message
        let noResults = document.querySelector(".no-results");

        if (found === 0 && value !== "") {

            if (!noResults) {
    noResults = document.createElement("div");

    noResults.className = "dashboard-card no-results";

    noResults.innerHTML = `
        <div class="no-results-icon">
            <i class="fas fa-search"></i>
        </div>

        <h3>No Announcements Found</h3>

        <p>
            We couldn't find any announcements matching your search.
            Try different keywords.
        </p>
    `;

    grid.appendChild(noResults);
}

        } else {
            if (noResults) noResults.remove();
        }
    }

    searchInput.addEventListener("input", filterAnnouncements);

    document.querySelector(".search-btn").addEventListener("click", function (e) {
        e.preventDefault();
        filterAnnouncements();
    });

});