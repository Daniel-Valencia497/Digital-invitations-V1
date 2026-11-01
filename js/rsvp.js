// Muestra el formulario RSVP y compone la respuesta del invitado.
(() => {
  const show = document.querySelector("#show-rsvp");
  const form = document.querySelector("#rsvp-form");
  if (!show || !form) return;
  show.addEventListener("click", () => {
    form.hidden = !form.hidden;
    show.setAttribute("aria-expanded", String(!form.hidden));
    if (!form.hidden) form.querySelector("input")?.focus();
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const invitation = document.title;
    const message = [
      `Hola, confirmo mi respuesta a: ${invitation}`,
      `Nombre: ${data.get("guest")}`,
      `Asistencia: ${data.get("attending")}`,
      `Acompañantes: ${data.get("guests") || "0"}`,
      `Mensaje: ${data.get("note") || "Sin mensaje"}`,
    ].join("\n");
    const status = document.querySelector("#status");
    if (status)
      status.textContent =
        "Se abrirá WhatsApp con tu respuesta. Envíala para que los anfitriones puedan recibirla.";
    window.open(
      window.createWhatsAppLink(message),
      "_blank",
      "noopener,noreferrer",
    );
  });
})();
