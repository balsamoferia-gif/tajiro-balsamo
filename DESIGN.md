# DESIGN.md — Landing TAJIRO

> **Jerarquía de instrucciones:** este archivo manda sobre cualquier default de skill
> instalada (ui-ux-pro-max, frontend-design, etc.). Si una skill propone una paleta,
> tipografía o estructura distinta a lo que dice acá, gana este archivo.
> Las skills se usan para *ejecutar mejor* esta dirección, no para reemplazarla.

---

## 1. El brief

**Sujeto:** TAJIRO, línea de repuestos desarrollada exclusivamente para vehículos Nissan,
distribuida por Balsamo.

**Audiencia, por orden de peso:**

1. Repuestero de mostrador — necesita saber si TAJIRO cubre la aplicación que le piden, rápido.
2. Mecánico de taller — le importa la resistencia real y el respaldo detrás de la marca.
3. Dueño de Nissan que investiga antes de comprar — llega por búsqueda, no conoce la marca.

**El único trabajo de la página:** que quien llega entienda en menos de diez segundos que
TAJIRO es la única línea dedicada exclusivamente a Nissan, y que termine consultando con un
asesor.

**Lo que NO es esta página:** no es el catálogo. La consulta de aplicaciones vive en
InfoBal. La landing lleva hasta ahí, no lo reemplaza.

---

## 2. No negociables de marca

Estas reglas no se discuten ni se "mejoran". Aplican a copy, microcopy, alt text, todo.

- **Color oficial de TAJIRO: `#C8102C`.** Confirmado. No se ajusta, no se "armoniza", no se
  reemplaza por un tono más suave porque quede mejor en pantalla.
- **Balsamo** se escribe sin acento. Nunca "Bálsamo".
- Slogan oficial, textual: **"Para tu Nissan, TAJIRO"**. No se reformula, no se le agregan
  variantes creativas, no se traduce.
- Nunca usar la palabra **"ignorar"** en ninguna copy.
- Códigos de producto siempre en **MAYÚSCULAS**.
- Trayectoria de Balsamo: usar **"más de 60 años de trayectoria"**. No poner el año de
  fundación hasta que esté confirmado (ver sección 7).
- Tono: argentino / cordobés, claro, técnico, humano, positivo, orientado a resolver.
  Voseo. Sin vocabulario rebuscado, sin jerga de marketing, sin superlativos vacíos.
- Líneas institucionales validadas, disponibles para usar: *"cuna de especialistas"*,
  *"No vendemos todo. Vendemos lo que sabemos."*

**Sobre Nissan:** TAJIRO es una línea independiente para vehículos Nissan. La página no
puede dar a entender vínculo oficial, licencia ni representación de Nissan. No usar el logo
de Nissan, ni su tipografía, ni ningún recurso gráfico que sugiera aval del fabricante.
Referirse siempre a la *aplicación* ("para tu Nissan", "línea Nissan"), nunca al fabricante
como respaldo.

**Nota sobre el rojo:** `#C8102C` es muy cercano al rojo corporativo de Nissan. Como es el
color oficial de TAJIRO, se respeta sin discusión — pero eso obliga a que **toda la
diferenciación de marca venga de la tipografía, la grilla y el lenguaje gráfico**, no del
color. Es exactamente lo que hace la dirección de la sección 3, y es la razón de fondo por
la que la tipografía de marca (`Allotrope`) no se toca: es lo que separa a TAJIRO de Nissan
cuando el color no puede hacerlo. No agregar ningún elemento visual adicional que empuje
hacia el universo Nissan.

---

## 3. Dirección visual: "Manual de servicio"

El mundo del que sale esta página no es el del marketing automotor: es el del **manual de
servicio japonés**. Dibujo técnico de línea, despieces, cotas, códigos en monoespaciada,
grilla estricta, tinta sobre papel. Preciso, silencioso, sin adorno.

Es una decisión, no una estética por defecto: TAJIRO vende certeza de aplicación, y el
manual de servicio *es* el objeto donde vive esa certeza.

El rojo oficial encaja natural en esa dirección: en un manual japonés, el rojo es la tinta
de la anotación crítica — la pieza señalada, la advertencia, la cota que importa. Ese es su
único trabajo acá.

**Prohibido por ser default de IA:** fondo crema (#F4F1EA) con serif de alto contraste y
acento terracota; fondo casi negro con un acento neón; layout tipo diario con filetes
capilares y columnas densas. Si el build empieza a parecerse a alguno de los tres, se revisa.

### Color

Seis valores, nada más. Nombres tal cual como variables CSS.

| Token | Hex | Uso |
|---|---|---|
| `--tajiro` | `#C8102C` | Rojo oficial. Acento único: CTA, pieza señalada, subrayado, cifra destacada. |
| `--tajiro-oscuro` | `#9A0C21` | Solo estados hover y activo del rojo. Nunca como color de fondo amplio. |
| `--tinta` | `#14171A` | Casi negro, apenas frío. Texto principal y titulares. |
| `--papel` | `#ECECEA` | Fondo general. Gris papel técnico, deliberadamente **no** crema. |
| `--papel-ficha` | `#FAFAF8` | Superficies elevadas: fichas, tarjetas, tabla de números. |
| `--cota` | `#7C8085` | Gris de acotación. Labels, captions, líneas de cota, texto secundario. |

**Reglas duras del rojo:**

- `#C8102C` sobre `--papel-ficha` da ~5,8:1 y sobre blanco ~5,9:1. Pasa AA en texto normal,
  **pero no AAA**. No usarlo en texto de cuerpo largo: es para titulares cortos, cifras y
  botones.
- Blanco sobre `#C8102C` también pasa AA. Los CTA son relleno rojo con texto
  `--papel-ficha`.
- **Superficie máxima de rojo por pantalla: 10%.** Si la sección se ve roja de lejos, está
  mal. El rojo señala, no baña.
- Nada de gradientes de rojo. Plano siempre.

### Tipografía

Tres roles, dos familias. Nada de Inter, Roboto, Arial, Helvetica, Open Sans, Lato ni Space
Grotesk.

- **Display — `Allotrope`** (800 / 900). Fuente de marca. Geométrica, industrial, con aire
  de tapa de catálogo técnico. Se usa con restricción: hero, logotipo, títulos de sección,
  número de sección, cifras grandes.
- **Cuerpo — `Allotrope`** (400 / 600 / 700). La misma familia sostiene el texto corrido,
  la navegación y los botones. Se lee limpia tanto en párrafo como en tabla de aplicación.
- **Datos — `IBM Plex Mono`** (400 / 500). **Obligatoria** para todo código de producto,
  código OEM, medida, referencia y para los labels de la sección de números. Siempre en
  mayúsculas y con `font-variant-numeric: tabular-nums`. Allotrope no tiene monoespaciada,
  así que este rol se cubre con una familia aparte y no se negocia.

**Cómo se sirve Allotrope.** Viene del kit de Adobe Fonts `kof1bhb`:

```html
<link rel="stylesheet" href="https://use.typekit.net/kof1bhb.css">
```

Tiene los nueve pesos con itálicas, más un corte aparte `allotrope-heavy` (900). El set de
acentos está completo y verificado: `ÁÉÍÓÚ áéíóú ñÑ ¿ ¡`.

Dos consecuencias que arrastra esta decisión, y que hay que tener presentes:

1. **El dominio tiene que estar autorizado en la cuenta de Adobe Fonts.** Los kits de
   Typekit sólo entregan las fuentes en los dominios cargados en la configuración del kit.
   Producción y staging van agregados antes de publicar, o la página cae al fallback del
   sistema.
2. **Allotrope no se puede autoalojar.** La licencia de Adobe Fonts obliga a servirla desde
   Typekit. Esto es la excepción a la regla de fuentes autoalojadas de la sección 6, y
   además implica que el `font-display` lo fija Adobe (`auto`), no nosotros. IBM Plex Mono
   sí se autoaloja.

Escala fluida con `clamp()`. Titulares con tracking apretado (`-0.015em`). El logotipo y el
slogan van al revés, con tracking abierto (`0.08–0.1em`): Allotrope es angosta y sin ese
aire el logotipo se apelmaza. Labels y cotas en versalitas espaciadas (`uppercase`,
`0.12em`, 12–13px).

### Iconografía

Los cuatro íconos de la sección de pilares (bandera de Japón, yunque, lupa, llave inglesa)
se dibujan como **SVG de línea en el mismo lenguaje que los despieces**: trazo de 1,5px,
terminaciones rectas, sin relleno, color `--tinta`. Nada de icon-fonts, nada de sets
genéricos tipo Lucide o Font Awesome usados tal cual.

Único ícono con color: la bandera de Japón, donde el círculo va en `--tajiro`. Ese punto
rojo es el que enlaza el color oficial con la dirección visual, y por eso conviene que sea
el primero que ve el usuario en esa sección.

### Layout

Grilla de 12 columnas con canaleta ancha y un margen izquierdo constante donde viven los
labels de sección, como la columna de referencias de un manual. El contenido nunca ocupa el
ancho completo: siempre queda aire a la derecha, igual que en una hoja de despiece.

Ninguna sección repite el patrón de la anterior.

```
┌──────────────────────────────────────────────────────────────┐
│  TAJIRO                                    Marca  ·  Contacto│
├──────────────────────────────────────────────────────────────┤
│ REF.  │                                                      │
│ 01    │   PARA TU NISSAN,                                    │
│       │   TAJIRO                          ╭─────────────╮    │
│       │                                   │  despiece   │    │
│       │   La única marca desarrollada     │  que se     │    │
│       │   exclusivamente para Nissan.     │  dibuja     │    │
│       │                                   ╰─────────────╯    │
│       │   [ Consultá con un asesor ]                         │
├──────────────────────────────────────────────────────────────┤
│ REF.  │  NÚMEROS QUE NOS DEFINEN                             │
│ 02    │  ┌──────────┬──────────┬──────────┬──────────┐       │
│       │  │ +300     │ +1.500   │ +7       │ +5.000   │       │
│       │  │ DISTRIB. │ REFEREN. │ AÑOS     │ VENTAS/D │       │
│       │  └──────────┴──────────┴──────────┴──────────┘       │
├──────────────────────────────────────────────────────────────┤
│ REF.  │  Confiá en los especialistas                         │
│ 03    │  [ texto institucional, columna 7/12 ]               │
│       │                              Para tu Nissan, TAJIRO  │
├──────────────────────────────────────────────────────────────┤
│ REF.  │  ▛ Japón      ▛ Yunque                               │
│ 04    │  Especialistas  Resistencia                          │
│       │  ▛ Lupa       ▛ Llave                                │
│       │  Certeza        Soporte                              │
├──────────────────────────────────────────────────────────────┤
│ REF.  │  Buscá tu aplicación   →  InfoBal                    │
│ 05    │  Consultá con un asesor →  [ formulario corto ]      │
└──────────────────────────────────────────────────────────────┘
```

Los `REF. 01 / 02 / …` se quedan **solo si** el orden de lectura importa de verdad, y acá
importa: presentación → escala → propuesta → pilares → acción.

### La sección de números: qué NO hacer

Cuatro cifras grandes centradas en cuatro tarjetas iguales, con un gradiente detrás y un
contador que sube al hacer scroll, es exactamente el patrón que hace que una página parezca
generada. **No se hace así.**

Se maqueta como **una fila de especificación de manual**: una sola tabla horizontal con
divisiones verticales finas en `--cota`, cifras en `Archivo Expanded` alineadas a la
izquierda de cada celda, y el label debajo en `IBM Plex Mono` versalitas. Sin tarjetas, sin
sombras, sin animación de conteo. El único rojo permitido acá es el signo `+` de cada cifra.

En mobile la tabla se parte en dos filas de dos, manteniendo las divisiones.

### Elemento firma

**El despiece que se dibuja solo.** En el hero, un dibujo técnico de línea de un componente
Nissan — un cubo de rueda, un kit de distribución, una bomba de agua — que se traza al
cargar con animación de `stroke-dashoffset`, como si una mano lo estuviera dibujando en el
manual. Al terminar el trazo, **una sola pieza del conjunto se resalta en `--tajiro`** y
aparece su cota con el código en monoespaciada.

Esa pieza roja entre líneas negras es la tesis de la marca en una imagen: entre todas las
piezas posibles, la correcta para tu Nissan.

Acá se gasta toda la audacia de la página. **Todo lo demás va quieto.**

### Movimiento

- Trazado del despiece al cargar: una sola vez, 1,2 s, `ease-out`. El resalte rojo entra
  200 ms después de terminar el trazo.
- Fichas de pilar: elevación mínima en hover (2px) y borde que pasa a `--tinta`.
- Nada de parallax, nada de contadores que suben, nada de fade-in escalonado bloque por
  bloque al hacer scroll.
- `prefers-reduced-motion: reduce` → el despiece aparece ya dibujado y resaltado, sin animar.

---

## 4. Contenido de la página

Este es el contenido aprobado. El copy se puede ajustar en registro, pero **no se inventan
datos, cifras ni beneficios nuevos**.

### 4.1 · Hero

- **H1:** Para tu Nissan, TAJIRO
- **Bajada:** La única marca desarrollada exclusivamente para vehículos Nissan.
- **CTA primario:** Consultá con un asesor
- **CTA secundario:** Buscá tu aplicación

### 4.2 · Números que nos definen

| Cifra | Label |
|---|---|
| +300 | Distribuidores |
| +1.500 | Referencias |
| +7 | Años en el mercado |
| +5.000 | Ventas diarias |

> El label "Ventas diarias" necesita precisión: ¿unidades vendidas por día? Si es así, el
> label correcto es "Unidades por día". Ver sección 7.

### 4.3 · Texto institucional

Encabezado sugerido: **Confiá en los especialistas**

> TAJIRO es la única marca del mercado pensada y desarrollada exclusivamente para vehículos
> Nissan. Nuestra dedicación total a esta línea nos permite ofrecerte repuestos que combinan
> resistencia, calidad y un funcionamiento asegurado, sin complicaciones. En TAJIRO
> simplificamos tu elección: te brindamos productos probados y el respaldo constante de un
> equipo que conoce a fondo lo que vende, eliminando cualquier duda. Confiá en los
> especialistas.

Cierre de sección, en display, alineado a la derecha del bloque: **Para tu Nissan, TAJIRO**

### 4.4 · Los cuatro pilares

Cada pilar: ícono de línea + título corto + subtítulo + párrafo. El título va en display, el
subtítulo en mono versalitas `--cota`.

**1 · Especialistas** — *100% Nissan* — Ícono: bandera de Japón minimalista (círculo en `--tajiro`)
> Somos la única marca del mercado dedicada exclusivamente a Nissan. Nuestro foco total en
> esta línea nos permite conocer sus diferentes modelos y ofrecerte las mejores soluciones.

**2 · Resistencia** — *Alto rendimiento* — Ícono: yunque
> Entendemos la exigencia real de estos vehículos. Nuestras referencias poseen materiales de
> primera línea y son fabricadas bajo normas estrictas, asegurando la robustez y vida útil
> que tu Nissan necesita.

**3 · Certeza** — *Sin experimentos* — Ícono: lupa
> Con TAJIRO vas a lo seguro. Ofrecemos repuestos específicos de excelente terminación y
> calce perfecto. Elegí la marca que sabe de tu auto.

**4 · Soporte** — *Somos repuesteros* — Ícono: llave inglesa
> Detrás de la web hay expertos reales. Si tenés dudas sobre la compatibilidad, te
> asesoramos para que compres la pieza exacta.

### 4.5 · Cierre

Doble salida: link a InfoBal para buscar aplicación, y formulario corto de consulta a asesor.

---

## 5. Reglas de copy

- Todo en voseo, registro cordobés, oraciones cortas.
- Cada botón dice qué pasa: "Consultá con un asesor", no "Enviar". El nombre de la acción se
  mantiene igual en todo el flujo.
- Nada de "líder del mercado", "calidad superior", "soluciones integrales". Si una frase la
  podría firmar cualquier distribuidora, se reescribe.
- Los estados vacíos y de error explican qué pasó y cómo seguir, en la voz de la interfaz. No
  piden disculpas y no son vagos.
- SEO: la página se estructura alrededor de "repuestos Nissan", las familias de producto
  reales y las aplicaciones concretas. Encabezados informativos y jerárquicos, un solo H1.

---

## 6. Piso de calidad (no se anuncia, se cumple)

- Responsive real desde 360px. El mostrador consulta desde el celular.
- Contraste WCAG AA verificado por cálculo en cada combinación, no a ojo. Atención especial
  al rojo sobre gris papel.
- Foco de teclado visible y con estilo propio: outline `--tajiro`, 2px, offset 2px.
- HTML estático, JS al mínimo. Objetivo Lighthouse 95+ en las cuatro métricas.
- Fuentes autoalojadas, `font-display: swap`, subset latino. **Excepción: Allotrope**, que
  por licencia se sirve desde el kit de Typekit (ver sección 3). Con ella van `preconnect` a
  `use.typekit.net` y `p.typekit.net`, y el dominio cargado en la cuenta de Adobe Fonts.
- SVG con `<title>` y `<desc>`. Los dibujos técnicos y los íconos no son decorativos:
  describilos.

---

## 7. Pendientes de confirmación

No pasar a producción sin cerrar estos puntos.

1. **Grafía de la marca.** El contenido entregado dice "Tajiro"; la regla de marca vigente
   dice **TAJIRO** en mayúsculas. El documento usa mayúsculas. Confirmar cuál rige, y una
   vez definido, aplicarla sin excepción en toda la página.
2. **"La única marca del mercado".** Es una afirmación de exclusividad comparativa y aparece
   dos veces. Conviene tenerla respaldada por escrito antes de publicar; una competidora
   puede objetarla. Alternativa más segura si no se puede sostener: "desarrollada
   exclusivamente para Nissan" (afirma sobre TAJIRO, no sobre el mercado).
3. **La bandera de Japón.** Si los repuestos no se fabrican en Japón, el ícono puede leerse
   como declaración de origen. Definir si se mantiene o se reemplaza por un recurso que
   apunte a la marca del vehículo y no a la procedencia de la pieza.
4. **"+5.000 ventas diarias".** Aclarar la unidad (¿unidades? ¿operaciones?) y desde qué
   fecha es el dato. Las cifras públicas conviene fecharlas.
5. **"+7 años en el mercado".** Coherente con el lanzamiento en 2018. Revisar cada año o
   dejarlo calculado, para que no quede desactualizado solo.
6. **Año de fundación de Balsamo.** Tres versiones distintas entre las fuentes internas.
   Hasta que se confirme, va "más de 60 años de trayectoria".
7. **Relación con InfoBal.** Definir si la landing linkea al catálogo público, si requiere
   login, o si solo deriva a asesor.
8. **La regla del "teléfono".** En las copies de Aequipe está prohibida esa palabra y se
   deriva a consultar con un asesor. Confirmar si aplica igual para TAJIRO.
