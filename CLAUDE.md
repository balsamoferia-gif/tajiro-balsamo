@AGENTS.md

# TAJIRO — reglas del proyecto

Next.js 16 + React 19 + TypeScript estricto + Tailwind 4 (`@theme` en CSS).
Se publica estático: `output: 'export'`, `images.unoptimized`.

Este archivo son las reglas de trabajo. Lo que hay que saber para *editar la
página* está en `README.md`, y las reglas de marca en `DESIGN.md`.

---

## Límites

- **`https://github.com/javigaitan/aequipe-Balsamo` es SOLO LECTURA.** Es la web
  de Aequipe, otra marca del mismo dueño. Se lee para copiar estructura. Nunca
  se le escribe, ni se le abre un PR, ni se clona para modificar.
- **`AGENTS.md` lo reescribe `next dev` solo.** No editarlo: se pierde. Todo lo
  del proyecto va acá.
- El proyecto **todavía no está en git**. Antes de sacar una sección, se
  desconecta (se deja de importar) en vez de borrar el archivo, porque no hay
  historial del que recuperarla.

## Dónde va cada cosa

- **`content/tajiro.ts` es el único archivo de contenido.** Todo texto, ruta de
  foto y link vive ahí. Los componentes no llevan texto escrito adentro. Esta es
  una diferencia deliberada con Aequipe, que los tiene mezclados.
- Los nombres de componentes replican los de Aequipe donde la sección existe en
  las dos, para poder saltar de un proyecto al otro.

## Al escribir código

- **Los subcomponentes de formulario van a nivel de módulo, no adentro del
  componente.** Si se definen adentro, React los toma como un tipo nuevo en cada
  render, desmonta el formulario y borra lo que la persona venía escribiendo. Ya
  pasó en `contact-section.tsx`; el comentario ahí explica el caso.
- Un link a un ancla que **ya es la actual** no dispara `hashchange`. Si algo
  tiene que reaccionar igual, hace falta un evento propio (ver
  `tajiro:pestana`, entre `quick-access-section` y `contact-section`).

## Al tocar archivos

- **Nunca editar archivos de texto por consola.** `Get-Content` / `Set-Content`
  de PowerShell rompieron 180 caracteres acentuados de `content/tajiro.ts` y
  hubo que reescribir el archivo entero a mano. Usar siempre las herramientas
  de edición.

## Al verificar

- **Borrar `.next` y `out` antes de `npm run build`.** Una build incremental
  puede no regenerar `out/`, y se termina probando código viejo creyendo que hay
  un bug.
- Verificar en **navegador real con esperas reales** (puppeteer-core contra el
  Chrome instalado). **No usar `--virtual-time-budget`**: no le da tiempo a las
  animaciones que arrancan después de la hidratación y salen congeladas aunque
  estén bien.
- Chrome headless **no baja de ~492px de viewport**: pedirle 360 recorta en vez
  de reacomodar. Para probar celular, cargar la página en un `<iframe>` de
  360px, que arma su propio viewport para las media queries.

## Al escribir para el usuario

- **En castellano simple, sin jerga.** Pidió explícitamente que se le traduzca a
  un idioma más simple. Analogías antes que términos técnicos.
- **No inventar arreglos automáticos que tapen lo que pidió.** Un fallback
  "inteligente" que esconde el cambio solicitado se lee como que no se hizo.

## El rojo

`#C8102C` sobre `#02070d` da **3,43:1**: alcanza para texto grande y elementos
gráficos, **no para texto chico**. Por eso el rojo va solo como relleno de botón
(5,90:1 con texto claro), palabra acentuada en titulares ≥20px, filetes y
bordes, y el `+` de las cifras. Nunca en labels, links ni párrafos.

**Hay tres rojos distintos conviviendo** (`#C8102C` de DESIGN.md, `#DD0031` del
logo, `#F14451` de la imagen institucional). Está sin resolver — es una decisión
del dueño de la marca, no una preferencia visual que se pueda tomar por cuenta
propia.
