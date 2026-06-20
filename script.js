const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a, .side-menu a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* Menu Toggle */

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", () => {
    sideMenu.classList.toggle("show-menu");
    menuBtn.classList.toggle("open");
});

/* Close menu after clicking link */

document.querySelectorAll(".side-menu a").forEach(link => {
    link.addEventListener("click", () => {
        sideMenu.classList.remove("show-menu");
        menuBtn.classList.remove("open");
    });
});

/* Navbar shrink */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});

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
    ".feature-card, .step, .arch-card, .member, .rsi-card, .stat-card, .resource-card, .section h2, .section-intro"
).forEach(element => {
    element.classList.add("hidden");
    observer.observe(element);
});