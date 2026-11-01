// Centraliza la codificación del mensaje y el número receptor.
// Si quieres enviar las solicitudes a un número fijo, reemplaza el valor por
// el indicativo del país y el número, sin +, espacios ni guiones.
window.ESTUDIO_WHATSAPP = "";

window.createWhatsAppLink = function (message) {
  const number = String(
    document.body.dataset.whatsapp || window.ESTUDIO_WHATSAPP || "",
  ).replace(/\D/g, "");
  const recipient = number ? `/${number}` : "/";
  return `https://wa.me${recipient}?text=${encodeURIComponent(message)}`;
};
