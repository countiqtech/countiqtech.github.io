/* =========================================================
   COUNTIQ WEBSITE - FIXED SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");
    const menuBtn = document.getElementById("menuBtn");
    const sideMenu = document.getElementById("sideMenu");

    const sectionMap = {
        team: "team-new"
    };

    const navLinks = document.querySelectorAll(".nav-links a, .side-menu a");

    function getTargetSection(link) {
        const href = link.getAttribute("href");

        if (!href || !href.startsWith("#")) return null;

        const rawId = href.substring(1);
        const actualId = sectionMap[rawId] || rawId;

        return document.getElementById(actualId);
    }

    /* Smooth navigation click */
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const targetSection = getTargetSection(link);

            if (!targetSection) return;

            event.preventDefault();

            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = targetSection.offsetTop - navbarHeight - 10;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            if (sideMenu) sideMenu.classList.remove("show-menu");
            if (menuBtn) menuBtn.classList.remove("open");
        });
    });

    /* Active nav link on scroll */
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
        let current = "";

        const navbarHeight = navbar ? navbar.offsetHeight : 80;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 80;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            let linkId = href.substring(1);

            if (sectionMap[linkId]) {
                linkId = sectionMap[linkId];
            }

            if (linkId === current) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();

    /* Menu Toggle */
    if (menuBtn && sideMenu) {
        menuBtn.addEventListener("click", () => {
            sideMenu.classList.toggle("show-menu");
            menuBtn.classList.toggle("open");
        });
    }

    /* Navbar shrink */
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        });
    }

    /* Fade animation */
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll(
        ".feature-card, .step, .arch-card, .rsi-card, .stat-card, .resource-card, .section h2, .section-intro, .founder-card, .coo-card, .journey-card, .leadership-philosophy"
    ).forEach(element => {
        element.classList.add("hidden");
        observer.observe(element);
    });

});
