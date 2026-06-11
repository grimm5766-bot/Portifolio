const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll(".main-nav a[href^='#']")];
const revealItems = document.querySelectorAll("[data-reveal]");
const year = document.querySelector("[data-year]");
const glow = document.querySelector(".cursor-glow");

year.textContent = new Date().getFullYear();

const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  nav.classList.remove("open");
  header.classList.remove("menu-active");
  document.body.classList.remove("menu-open");
};

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  nav.classList.toggle("open", !isOpen);
  header.classList.toggle("menu-active", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", window.scrollY > 20),
  { passive: true },
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const delay = entry.target.dataset.delay || 0;
      entry.target.style.transitionDelay = `${delay}ms`;
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.13 },
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55%", threshold: 0 },
);

document
  .querySelectorAll("main section[id]")
  .forEach((section) => sectionObserver.observe(section));

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      glow.style.transform = `translate(${event.clientX - 208}px, ${event.clientY - 208}px)`;
    },
    { passive: true },
  );
}
