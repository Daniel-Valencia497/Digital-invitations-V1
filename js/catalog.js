// El filtro mantiene visible solo la categoría elegida.
(() => {
  const buttons = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll(".catalog-item")];
  const planSections = [...document.querySelectorAll("[data-plan-section]")];
  const count = document.querySelector(".catalog-count");
  if (!buttons.length) return;
  if (count)
    count.textContent = `${cards.length} ${
      cards.length === 1 ? "diseño" : "diseños"
    }`;
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
      let visible = 0;
      cards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.hidden = !show;
        if (show) visible++;
      });
      planSections.forEach((section) => {
        const sectionCards = [...section.querySelectorAll(".catalog-item")];
        section.hidden = !sectionCards.some((card) => !card.hidden);
      });
      if (count)
        count.textContent = `${visible} ${visible === 1 ? "diseño" : "diseños"}`;
    }),
  );
})();
