// El filtro mantiene visible solo la categoría elegida.
(() => {
  const buttons = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll(".catalog-item")];
  const count = document.querySelector(".catalog-count");
  if (!buttons.length) return;
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
      if (count)
        count.textContent = `${visible} ${visible === 1 ? "diseño" : "diseños"}`;
    }),
  );
})();
