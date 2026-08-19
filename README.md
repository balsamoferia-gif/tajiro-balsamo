# TAJIRO — Web

Next.js 16 + React 19 + TypeScript + Tailwind 4. Misma estructura que Aequipe,
para que las dos marcas se mantengan igual.

Repositorio: **`balsamoferia-gif/tajiro-balsamo`** (privado), rama `main`.

> **Las fotos originales de cámara no están acá.** Son 263 MB y quedan afuera a
> propósito (`.gitignore`). En el repositorio están sólo las versiones ya
> preparadas, en `public/images`. Si clonás el proyecto en otra computadora vas
> a poder cambiar todos los textos, pero para preparar una foto nueva del
> banner necesitás los originales, que están en la máquina del dueño.

---

## Para arrancar

```bash
npm install     # una sola vez
npm run dev     # abre http://localhost:3000
```

Para generar el sitio listo para publicar:

```bash
npm run build   # deja todo armado en la carpeta out/
```

---

## LO ÚNICO QUE HAY QUE TOCAR PARA CAMBIAR TEXTOS Y FOTOS

### `content/tajiro.ts`

Ahí están **todos** los textos, todas las rutas de las fotos y todos los links
de la página. No hay código de diseño adentro: si cambiás algo, no podés romper
el layout.

```ts
{
  nombre: "Frenos",
  foto: "/images/familias/frenos.jpg",
  fotoAlt: "Discos ventilados, campana y bomba de freno TAJIRO...",
}
```

Dos cosas que conviene saber:

- **El texto entre `**` sale en rojo.** `"PARA TU NISSAN, **TAJIRO**"`.
- **`\n` corta la línea.** Sirve para decidir dónde parte un titular.

Para agregar una familia, un pilar o una diapositiva del banner: copiá un bloque
entero (de una llave `{` hasta su `},`) y pegalo debajo. Para sacar uno, borralo
entero. La página se acomoda sola y los números de las fichas se recalculan.

### El banner principal

Tiene la misma estructura que el de Aequipe: texto a la izquierda y foto a la
derecha en computadora, texto arriba centrado y foto abajo en celular. Cada
diapositiva lleva **dos fotos**, una para cada vista, igual que Aequipe:

```ts
fotoDesktop: "/images/hero-frenos.png",
fotoMobile:  "/images/hero-frenos.png",   // puede ser la misma
```

Se cambia de diapositiva **arrastrando con el mouse o con el dedo**, o con los
puntitos. Un arrastre corto no hace nada, y un gesto vertical deja scrollear la
página en vez de cambiar la foto — sin eso, en el celular el banner te traba el
scroll. La distancia mínima para que cambie está en `hero.pixelesParaCambiar`.

Los botones están apagados con `hero.mostrarBotones: false`. Poniéndolo en
`true` vuelven a aparecer.

### Cómo entregar una foto para el banner

**Lo mejor es sacarla directamente sobre fondo oscuro de estudio, 2400 × 1600.**
Así se entregó la de frenos y es el camino que conviene repetir: no hay que
recortar nada, y el reflejo del piso y el resplandor del fondo se conservan
—son justamente lo que hace que la pieza se vea bien plantada—.

Al prepararla para la web se hacen dos cosas:

- **Los bordes se desvanecen a transparente.** El fondo de la foto es más
  oscuro que el de la página, así que sin esto se ve el rectángulo. El
  desvanecido se calcula desde la caja que ocupa la pieza hacia afuera, nunca
  desde el centro: así es imposible que se coma una punta.
- **Cada lado lleva su propio margen.** Si se usa uno solo para los cuatro, el
  lado más apretado —acá el de abajo, por el reflejo— queda con un desvanecido
  tan corto que se ve el escalón.

Conviene dejar **aire alrededor de la pieza al sacar la foto**: como mínimo un
10% del ancho libre a cada lado. Ese aire es el lugar donde se desvanece. Sin
él, el recorte queda pegado a la pieza y se nota el borde.

La otra opción es entregarla en PNG con el fondo ya recortado. Funciona, pero
queda más plana: no hay reflejo ni resplandor. Si se va por ahí, dos cuidados
que costaron descubrir:

- **Hay que comerse uno o dos píxeles del contorno.** Al recortar sobre blanco
  siempre queda un hilo de píxeles claros pegado al borde. Sobre blanco es
  invisible; sobre negro se ve como si la pieza tuviera un contorno luminoso.
- **Las fotos con sombra marcada sobre el blanco no recortan bien** y dejan
  manchas grises. Por eso el banner usa frenos, suspensión y transmisión, que
  separan limpio, y no kits, que tiene muchas piezas chicas desparramadas y cada
  una tira su propia sombra.

Las fotos nuevas se dejan en `Assests/BANNER/`. **Esa carpeta no se publica**:
es el original. Lo que la página muestra es lo que está en `public/images/`, ya
preparado. Cambiar una en `Assests/` sin pasarla a `public/images/` no cambia
nada en pantalla.

El pasaje de una a la otra lo hace este comando:

```bash
node scripts/preparar-banner.mjs Assests/BANNER/foto.png public/images/hero-frenos.webp
```

Achica, desvanece los bordes y guarda en WEBP.

**Es una foto por vez.** Son tres diapositivas, así que son tres corridas —una
por cada archivo—. Hoy los tres nombres son:

```
public/images/hero-familias.webp        diapositiva 1
public/images/hero-mantenimiento.webp   diapositiva 2
public/images/hero-frenos.webp          diapositiva 3
```

Si una foto nueva reemplaza a otra **de otro tema**, no alcanza con pisar el
archivo: hay que cambiarle también el nombre y el `fotoAlt` en
`content/tajiro.ts`. Un archivo que se llama `hero-frenos` con una foto de
filtros adentro confunde para siempre.

El comando avisa cuánto margen le quedó de cada lado. Si alguno da menos de
90px lo fuerza igual y lo dice en pantalla: eso desvanece un poco de foto —casi
siempre la cola del reflejo, que apagándose de a poco queda mejor que cortada
por una línea recta—. Si el aviso aparece de los costados y no de abajo, la
foto viene mal encuadrada y conviene sacarla de nuevo con la pieza más chica.

### Si agregás una foto nueva

Achicala **antes** de ponerla en `public/images`. El sitio se publica estático y
no achica las fotos solo: la que subas es la que se baja el visitante desde el
celular. Medidas que usamos:

| Para qué | Medida | Formato |
|---|---|---|
| Ficha de familia | 900 × 600 | JPG |
| Acceso rápido | 1200 × 800 | JPG |
| Banner del hero | ~1600 de ancho | WEBP con fondo recortado |

Las del banner van al doble de lo que se ve en pantalla, para que no se vean
borrosas en monitores de alta resolución. En WEBP con transparencia pesan unos
60–95 KB cada una; las mismas en PNG pesaban seis veces más.

Las originales de cámara (5472 × 3648, entre 3 y 9 MB cada una) viven en
`Assests/` y **no se publican** — están excluidas en `.gitignore`.

---

## Cómo está armado

```
content/tajiro.ts        ← textos, fotos y links (lo editable)
app/
  page.tsx               ← el orden de las secciones
  layout.tsx             ← título, fuentes, datos para Google
  globals.css            ← colores, tipografía y el despiece animado
  favicon.ico            ← el ícono de la pestaña (16 y 32px)
  robots.ts  sitemap.ts  ← lo que lee Google, se generan al publicar
  not-found.tsx          ← la página de error
components/
  navbar.tsx             hero-section.tsx         quick-access-section.tsx
  brand-panel-section.tsx  highlights-section.tsx  about-section.tsx
  values-section.tsx     product-family-section.tsx  contact-section.tsx
  footer.tsx
  exploded-drawing.tsx   ← el dibujo técnico animado (hoy sin usar)
  pillar-icons.tsx       ← los cuatro íconos dibujados a mano
  resaltado.tsx          ← convierte los ** ** en rojo
public/images/           ← fotos listas para web (~1,1 MB en total)
_static-v1/              ← la versión anterior en HTML, archivada
Assests/                 ← fotos originales sin tocar (no se publican)
```

Los nombres de los componentes son los mismos que en Aequipe donde la sección
existe en las dos, así que moverse de un proyecto al otro no cuesta nada.

**Diferencia deliberada con Aequipe:** acá los textos NO están adentro de los
componentes. Aequipe tiene el banner bien resuelto (los datos arriba del
archivo, separados del código) pero el resto de las secciones los lleva
mezclados. Esto es esa misma idea del banner, aplicada a la página entera.

**No están las 60 componentes de `components/ui`** que arrastra Aequipe. Son
andamiaje de la herramienta con la que se generó, no una decisión. Si en algún
momento hace falta una, se instala esa sola.

---

## Atención: hoy conviven tres rojos distintos

| Dónde | Color |
|---|---|
| DESIGN.md — rojo oficial de marca | `#C8102C` |
| Archivo del logotipo | `#DD0031` |
| Imagen de "Confiá en los especialistas" | `#F14451` |

Los tres se ven en la misma pantalla. **Hay que definir cuál es el correcto** y
unificar los archivos gráficos, o corregir DESIGN.md si el desactualizado es el
documento. No es una preferencia visual: es un dato de marca.

---

## La regla que gobierna el uso del rojo

`#C8102C` sobre el fondo oscuro da **3,43:1**. Alcanza para texto grande
(≥24px, o ≥18,7px en negrita) y para elementos gráficos, **no para texto chico**.
Sobre las cajas grises baja a 3,02:1.

Por eso el rojo aparece solamente como:

- relleno de botón, con texto claro encima → **5,90:1**
- palabra acentuada dentro de un titular (siempre ≥20px en negrita)
- filete, borde, punto de llamada, pieza señalada del despiece
- el signo `+` de las cifras, que va en tamaño grande

Nunca en labels, links ni párrafos. Los títulos de columna del pie llevan el
rojo como filete arriba, no en la letra.

Otros valores verificados: blanco `#F7F7F7` sobre el fondo **18,9:1**;
`--color-texto-tenue` **8,5:1** sobre el fondo y **7,4:1** sobre las cajas grises.

---

## Tipografía

**Allotrope**, del kit de Adobe Fonts `kof1bhb` — el mismo que usa Aequipe.
Display en 900 y 800, cuerpo en 400/600/700.

**IBM Plex Mono** para el rol de datos: los números de las fichas de familia y
los labels de las cifras. Allotrope no tiene monoespaciada.

---

## Comportamiento

- **Banner:** 3 diapositivas, 7 segundos. Se frena al pasar el mouse, al
  arrastrar y al enfocar con teclado. Se cambia arrastrando (mouse o dedo), con
  los puntitos o con las flechas ← → del teclado. Sin rotación automática si el
  sistema pide movimiento reducido.
- **Despiece animado:** ya **no se usa**. La sección "Confiá en los
  especialistas" muestra la imagen de marca en su lugar. El componente sigue en
  `components/exploded-drawing.tsx`, funcionando, por si se quiere recuperar en
  otra sección — sólo hay que importarlo donde vaya.
- **Formularios:** son dos, en pestañas, y salen por caminos distintos.
  - **Venta particular** → abre **WhatsApp** con los datos ya escritos. No
    necesita nada configurado: funciona desde el primer día.
  - **Ventas mayoristas** → manda un **mail por EmailJS**, igual que Aequipe.
    Necesita las credenciales (ver abajo). Mientras no estén cargadas, cae a
    WhatsApp y avisa en pantalla, así el formulario nunca queda muerto.
- **Foco de teclado:** contorno rojo de 2px, visible en todo.

Verificado a 360px y 1440px en navegador real.

> Para quien vaya a sacar capturas automáticas: no uses
> `--virtual-time-budget` de Chrome headless. No le da tiempo a las animaciones
> que arrancan después de la hidratación, y el despiece sale congelado a medio
> dibujar aunque esté perfecto. Usá un navegador real con esperas reales.

---

## Antes de publicar

> **El dominio es el primero de la lista, y arrastra a los demás.** Está en
> `marca.sitio`, dentro de `content/tajiro.ts`, hoy con un valor provisorio
> (`https://tajiro.com.ar/`). De ahí salen la dirección oficial que declara el
> sitio, el `robots.txt`, el mapa del sitio y la dirección de la imagen para
> compartir. Si sale publicado con el dominio equivocado, las cuatro cosas
> apuntan mal. Se cambia en un solo lugar.

1. **Dominio real** en `marca.sitio` (`content/tajiro.ts`). Ver el aviso de
   arriba.

2. **Credenciales de EmailJS**, para el formulario de ventas mayoristas.
   Copiá `.env.local.example` como `.env.local` y pegá los tres valores de la
   cuenta de EmailJS — los mismos que usa Aequipe si apunta a la misma cuenta.
   En Vercel hay que cargarlas a mano en *Settings → Environment Variables*.

   Los nombres de los campos se traducen antes de mandar (`razonSocial` sale
   como `companyName`, `categoriaIva` como `vatCategory`, etc.) para que la
   **plantilla de EmailJS de Aequipe funcione sin cambios**. La traducción está
   en `lib/enviar-mayorista.ts`.

   **Lo que viaja es idéntico a lo de Aequipe**, y hay tres cosas que no se
   pueden tocar sin romper el mail:

   | | Valor | Por qué |
   |---|---|---|
   | `form_type` | `"Empresa"` | Es la palabra con la que la plantilla decide qué mail armar |
   | Campos vacíos | Viajan igual | Si falta una variable que la plantilla usa para el destinatario, falla el envío entero |
   | `hasShop` | `yes` / `planning` / `other` | Códigos, no el texto en castellano |

   Lo único distinto es `from_name`, que dice `"TAJIRO"` en vez de `"Aequipe"`:
   es el nombre que aparece como remitente.

   **Si el mail no llega y el código está bien, el problema es de la cuenta.**
   Tres cosas para revisar en el panel de EmailJS, ninguna se arregla acá:

   - El **dominio tiene que estar autorizado**. EmailJS rechaza los pedidos que
     vienen de un dominio que no figura en la lista de la cuenta. Si sólo está
     el de Aequipe, los de `tajiro.com.ar` se rechazan.
   - Las **tres variables tienen que estar cargadas en Vercel**, no sólo en la
     computadora. Son de las que se hornean al publicar: si no están al momento
     de publicar, no están.
   - La **plantilla tiene que reconocer `form_type: "Empresa"`**.

3. **Dominio autorizado en Adobe Fonts.** El kit de Allotrope sólo entrega las
   fuentes en los dominios cargados en la cuenta. Hay que agregar producción y
   staging antes de publicar, o la página cae a la fuente del sistema. Es la
   trampa clásica del día del lanzamiento: el sitio sale con otra letra y no
   hay nada roto en el código.
4. **URL de InfoBal.** Está en `content/tajiro.ts`, en `links.infobal`. Hoy
   apunta a una sección de la misma página.

Ya resueltos: el logotipo (está en `public/images/logo-tajiro.png`) y las redes
del pie, que ahora apuntan a las cuentas reales.

### Lo que Google necesita, y dónde está

| Qué | Dónde se genera | De dónde sale |
|---|---|---|
| Título principal de la página | `hero-section.tsx`, escondido a la vista | `marca.tituloH1` |
| Título de la pestaña y de Google | `app/layout.tsx` | `marca.tituloSEO` |
| Imagen para compartir | `scripts/preparar-compartir.mjs` | `marca.fotoCompartir` |
| `robots.txt` | `app/robots.ts` | `marca.sitio` |
| Mapa del sitio | `app/sitemap.ts` | `marca.sitio` |
| Ficha de negocio (mapa de Google) | `app/layout.tsx` | `negocio` |
| Página de error | `app/not-found.tsx` | — |

Dos cosas que conviene no olvidar:

- **El título principal no se ve en pantalla.** El titular grande del banner es
  un párrafo con pinta de titular, porque va cambiando cada 7 segundos y no
  puede ser el título de la página. El de verdad está escondido y es fijo.
- **`negocio` es el gemelo de `contacto.datos`.** Uno lo lee la persona y el
  otro el buscador. Si cambia un horario o la dirección, hay que tocar los dos.

### Pendientes de contenido (son los de `DESIGN.md` §7)

Ninguno se resolvió por cuenta propia:

- **"La única marca del mercado"** aparece dos veces, en el bloque
  institucional y en el primer pilar. Es una afirmación comparativa: conviene
  tenerla respaldada por escrito antes de publicar.
- **"+5.000 ventas diarias"** quedó con el label aprobado; el propio documento
  sugiere aclarar la unidad.
- **"+7 años en el mercado"** está escrito fijo: hay que revisarlo cada año.
- De Balsamo se dice **"más de 60 años de trayectoria"**, sin año de fundación.
- No se usa la palabra "teléfono" en ninguna parte.

**Sobre Nissan.** No se usa el logo, la tipografía ni ningún recurso gráfico de
Nissan. El pie lleva la aclaración de que TAJIRO es una línea independiente.
Conviene que lo revise quien corresponda antes de publicar.

---

## Sobre `_static-v1/`

Es la primera versión, en HTML y CSS a mano. Ya no se usa: quedó como respaldo
por si hace falta comparar algo. Se puede borrar cuando esta versión esté
publicada y andando.
