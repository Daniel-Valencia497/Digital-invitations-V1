// Menú compacto, estado de la cabecera y aparición progresiva de contenido.
(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const header = document.querySelector(".site-header");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      nav.classList.toggle("open", open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
        nav.classList.remove("open");
      });
    });
  }

  // Añade una sombra discreta cuando la cabecera queda fija sobre el contenido.
  if (header) {
    const updateHeader = () =>
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  // Revela bloques al acercarse al área visible sin ocultarlos en navegadores antiguos.
  const revealTargets = document.querySelectorAll(
    ".intro-section, .section-heading, .feature-card, .process-intro, .steps article, .faq-intro, .faq-item, .closing-inner, .page-hero, .catalog-item, .plan-card, .contact-aside, .contact-form",
  );

  if (!("IntersectionObserver" in window)) return;

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
  );

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);
    revealObserver.observe(element);
  });
})();
