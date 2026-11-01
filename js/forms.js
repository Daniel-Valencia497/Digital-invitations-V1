// Prepara una solicitud y deja el envío final en manos de WhatsApp.
(() => {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const plan = params.get("plan");
  const event = params.get("evento");
  const design = params.get("diseno");
  const planField = form.elements.plan;
  const eventField = form.elements.event;
  const designField = form.elements.design;
  if (plan && planField) {
    const names = {
      basico: "Básico",
      intermedio: "Intermedio",
      avanzado: "Avanzado",
    };
    planField.value = names[plan.toLowerCase()] || plan;
  }
  const eventNames = {
    boda: "Boda",
    cumpleanos: "Cumpleaños",
    graduacion: "Graduación",
    "baby-shower": "Baby shower",
    aniversario: "Aniversario",
    quince: "Quince años",
  };
  if (event && eventField)
    eventField.value = eventNames[event.toLowerCase()] || "Otro";
  if (design && designField) designField.value = design;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      "Hola, Estudio Nítida. Quiero solicitar una invitación digital:",
      "",
      `Nombre: ${data.get("name")}`,
      `Correo: ${data.get("email")}`,
      `Contacto: ${data.get("phone") || "No indicado"}`,
      `Evento: ${data.get("event")}`,
      `Fecha: ${data.get("date") || "Por definir"}`,
      `Plan: ${data.get("plan")}`,
      `Diseño de referencia: ${data.get("design") || "Por definir"}`,
      "",
      `Detalles: ${data.get("details")}`,
    ].join("\n");
    const status = document.querySelector("#form-status");
    if (status)
      status.textContent =
        "Tu solicitud está lista. Se abrirá WhatsApp para que revises y envíes el mensaje.";
    window.open(
      window.createWhatsAppLink(message),
      "_blank",
      "noopener,noreferrer",
    );
  });
})();
