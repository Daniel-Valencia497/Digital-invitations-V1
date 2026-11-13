# Guía de desarrollo

## Objetivo del proyecto

Estudio Nítida es un sitio estático para mostrar diseños de invitaciones digitales y facilitar solicitudes por WhatsApp. Está construido con HTML, CSS y JavaScript, sin dependencias ni procesos de compilación.

Esta guía define cómo organizar nuevas plantillas y qué información registrar para cada diseño. La incorporación al catálogo y las imágenes de vista previa se harán manualmente; no hace falta crear un CMS, un archivo de datos ni automatizaciones.

## Mapa del proyecto

```text
index.html                 Inicio del sitio
pages/
  catalogo.html            Tarjetas, vistas previas y filtros de diseños
  servicios.html           Planes y sus características
  contacto.html            Formulario de solicitud
  condiciones.html         Borrador de condiciones del servicio
  privacidad.html          Borrador de privacidad y tratamiento de datos
css/
  main.css                 Tema, estilos globales y componentes base
  components.css           Catálogo, planes, formularios y otros componentes
  responsive.css           Ajustes para móvil y pantallas medianas
js/
  main.js                  Menú móvil, cabecera y revelado de contenido
  catalog.js               Filtros y contador del catálogo
  forms.js                 Solicitud del formulario de contacto
  whatsapp.js              Generación del enlace y destinatario de WhatsApp
  rsvp.js                  Formulario de confirmación de asistencia
templates/
  basic/                    Plantillas del plan básico
  intermediate/             Plantillas del plan intermedio
  advanced/                  Plantillas del plan avanzado
invitations/                Invitaciones preparadas para eventos concretos
```

Las páginas principales cargan las hojas de estilo compartidas y los scripts que necesitan. Cada plantilla conserva su HTML y sus estilos; las plantillas con RSVP reutilizan `js/whatsapp.js` y `js/rsvp.js`. No hay paso de instalación ni compilación: se puede abrir `index.html` directamente o servir la carpeta desde un hosting estático.

Para orientarte en el código, comienza en `index.html` y sigue sus enlaces a `pages/`. Para el catálogo, revisa `pages/catalogo.html`, sus estilos en `css/components.css` y el comportamiento en `js/catalog.js`. El catálogo se organiza en secciones separadas de Básico, Intermedio y Avanzado; cada sección contiene solo diseños de ese plan. Los filtros por evento ocultan las tarjetas y secciones sin resultados.

Para el formulario de contacto, revisa `pages/contacto.html`, `js/forms.js` y `js/whatsapp.js`. Quien no conoce el plan o diseño puede elegir «Necesito asesoría» y explicar su idea; el sitio prepara esos datos en un mensaje de WhatsApp, que la persona revisa y envía.

En el plan Avanzado, las presentaciones del catálogo son referencias del estilo y la exclusividad, no plantillas para seleccionar. La invitación final se crea desde cero. No presentes música ni videos como funciones actuales: son posibilidades para evaluar en el futuro.

## 1. Agregar una plantilla manualmente

Cada diseño nuevo debe tener su propia carpeta dentro de `templates/`, agrupada por plan:

```text
templates/
  basic/
    birthday-02/
      index.html
      style.css
      preview.svg
      script.js       # Solo si la plantilla necesita interacciones
      assets/         # Imágenes y otros recursos propios, si se necesitan
```

Usa `basic`, `intermediate` o `advanced` como carpeta del plan. Nombra cada diseño en minúsculas y con guiones, usando el tipo de evento y un identificador que no se repita, por ejemplo `birthday-02` o `wedding-02`.

Para crear un diseño, copia una carpeta existente del plan más cercano y cambia su contenido. Conserva juntos el HTML, los estilos y los recursos propios. Si la plantilla necesita RSVP, reutiliza los scripts compartidos de `js/` en vez de copiar su lógica.

Los archivos `script.js` vacíos que ya existen son marcadores y no se cargan automáticamente. Si agregas una interacción propia, enlaza el archivo desde el HTML de esa plantilla con `<script src="script.js"></script>`.

Cuando se prepare una invitación para un evento real, copia la carpeta de la plantilla a una carpeta nueva dentro de `invitations/`. Modifica allí los datos del evento; no edites la plantilla original para personalizar una entrega.

Las plantillas existentes no se migran como parte de esta convención. En particular, `templates/intermediate/XV-cumple/` usa `invitacion.html` y `styles.css`; es una estructura anterior que sigue funcionando con su enlace actual.

## 2. Datos que identifican cada diseño

Al incorporar un diseño al catálogo, registra manualmente estos datos en su tarjeta de `pages/catalogo.html`:

| Dato | Convención |
| --- | --- |
| Nombre del diseño | Nombre corto y único que se muestra como título. |
| Tipo de evento | Una categoría del filtro: `boda`, `cumpleanos` o `graduacion`. |
| Plan | `basic`, `intermediate` o `advanced`; mostrar en el catálogo el nombre correspondiente en español. |
| Descripción | Texto breve con el estilo o características del diseño. |
| Ruta de la plantilla | Enlace relativo desde `pages/catalogo.html` hasta la carpeta o página de la plantilla. |
| Vista previa | Archivo `preview.svg` dentro de la carpeta del diseño; añadirlo como imagen con un texto alternativo descriptivo. |

La tarjeta debe incluir `data-category` y `data-plan` con sus valores acordados, además del nombre, la descripción, la etiqueta visible del plan y el enlace a la plantilla. El contador de diseños se calcula a partir de las tarjetas existentes.

Ejemplo de rutas para una plantilla nueva:

```text
Plantilla:   ../templates/basic/birthday-02/
Vista previa: ../templates/basic/birthday-02/preview.svg
```

El atributo `data-category` de la tarjeta debe coincidir exactamente con una de las categorías del filtro (`boda`, `cumpleanos` o `graduacion`). Por ahora, la información del diseño se mantiene en el HTML del catálogo; no hay que duplicarla en otro archivo.

Ejemplo mínimo de tarjeta; adapta los textos, categoría, plan y rutas:

```html
<article class="catalog-item" data-category="cumpleanos" data-plan="basic">
  <div class="catalog-art">
    <img
      class="catalog-preview"
      src="../templates/basic/birthday-02/preview.svg"
      alt="Vista previa de Día especial, una invitación de cumpleaños"
      width="800"
      height="620"
      loading="lazy"
      decoding="async"
    />
    <span class="catalog-label">CUMPLEAÑOS · PLAN BÁSICO</span>
  </div>
  <div class="catalog-info">
    <div>
      <h2>Día especial</h2>
      <p>Colorida · Alegre · Personalizable</p>
    </div>
    <a href="../templates/basic/birthday-02/">Ver plantilla ↗</a>
  </div>
</article>
```

## Revisión antes de publicar

- En Inicio y en el catálogo, cada muestra está dentro de la sección de su plan; no mezcles tarjetas de planes distintos en una misma sección o cuadrícula.
- La carpeta y el enlace apuntan a la plantilla correcta; las rutas relativas de CSS, imágenes y scripts funcionan desde su ubicación final.
- La vista previa se carga en el catálogo, tiene texto alternativo descriptivo y representa el diseño.
- El nombre, la categoría, el plan, la descripción y la etiqueta visible coinciden; no hay nombres duplicados.
- Los filtros «Todos», «Bodas», «Cumpleaños» y «Graduación» muestran las tarjetas esperadas y el contador coincide.
- El catálogo y sus imágenes se entienden en una pantalla grande y en móvil.
- Abre cada enlace para comprobar la plantilla. Si tiene RSVP o un formulario, verifica la validación y que WhatsApp prepare el mensaje esperado.
- Si copiaste una plantilla a `invitations/`, actualiza los datos del evento y comprueba la ruta a los scripts compartidos desde esa nueva ubicación. No publiques números ni datos ficticios.
