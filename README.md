# Estudio Nítida — invitaciones digitales

Primera versión estática hecha con HTML, CSS y JavaScript. No requiere instalar dependencias ni usar un framework.

## Abrir el sitio

Abre `index.html` en el navegador o publica la carpeta en un hosting estático. Las rutas están preparadas para funcionar desde la raíz del sitio.

## Qué incluye

- Inicio y navegación responsive.
- Catálogo con filtros de evento y una vista de cada plantilla de ejemplo.
- Descripción de planes básico, intermedio y avanzado.
- Formulario de solicitud que prepara un mensaje y lo abre en WhatsApp.
- Una plantilla independiente de ejemplo por plan en `templates/`.
- Un ejemplo de invitación publicada en `invitations/ejemplo/`, con confirmación RSVP por WhatsApp.

## Configurar los números de WhatsApp

En `js/whatsapp.js`, cambia `window.ESTUDIO_WHATSAPP` por el número comercial con indicativo de país, sin `+`, espacios ni guiones. Para una invitación publicada, define `data-whatsapp` en la etiqueta `<body>` de su `index.html`; ese número tiene prioridad y puede ser diferente para cada anfitrión. Deja el valor vacío para permitir que quien responde elija el destinatario en WhatsApp.

El formulario no envía ni guarda datos en el sitio: abre WhatsApp con el texto preparado y la persona debe enviarlo. El guardado automático de solicitudes o RSVP requiere backend o un servicio de recepción.

## Plantillas

- `templates/basic/birthday-01/`: cumpleaños, plan básico.
- `templates/intermediate/wedding-01/`: boda, plan intermedio.
- `templates/advanced/graduation-01/`: graduación, plan avanzado.

Cada diseño conserva su HTML y CSS en su carpeta. Los scripts `js/whatsapp.js` y `js/rsvp.js` son utilidades compartidas. Duplica una carpeta de plantilla en `invitations/` para iniciar una entrega y actualiza el contenido, fecha, ubicación y número receptor.

## Pendiente para lanzamiento

Reemplaza el nombre de marca, ejemplos y datos de evento por la información real del emprendimiento. Añade el número comercial y los números receptores de cada invitación antes de compartir enlaces. Define también precios y textos definitivos de los planes.
