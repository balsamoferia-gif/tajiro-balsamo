import sharp from "sharp"

/* Prepara una foto de banner que YA viene con fondo oscuro de estudio.
 *
 * Uso:
 *   node scripts/preparar-banner.mjs Assests/BANNER/foto.png public/images/hero-frenos.webp
 *
 * No se recorta el fondo: la foto tiene resplandor y reflejo en el piso, y
 * recortarla los borraria. El problema es otro: el fondo de la foto es mas
 * oscuro que el de la pagina, asi que el rectangulo se nota.
 *
 * La solucion es desvanecer los bordes a transparente. Dos cuidados:
 *
 *  - La pieza tiene que quedar SIEMPRE opaca. Por eso el desvanecido se
 *    calcula a partir de cuanto se sale cada pixel de la caja de la pieza, no
 *    de su distancia al centro.
 *  - Cada lado tiene su propio margen. Si se usa uno solo para los cuatro, el
 *    lado mas apretado (aca el de abajo, por el reflejo) queda con un
 *    desvanecido tan corto que se ve el escalon.
 */

const ENTRADA = process.argv[2]
const SALIDA = process.argv[3]
const ANCHO = 1600

/* Umbral de que cuenta como pieza. Tiene que ser alto: con uno bajo entra el
   resplandor del estudio, la caja se agranda hasta el borde de la foto y se
   queda sin lugar para desvanecer. */
const UMBRAL = 60
const MARGEN = 0.18 // aire alrededor de la pieza, en porcion de su tamano

// ── 1. donde esta la pieza ─────────────────────────────────────────────────
const orig = sharp(ENTRADA)
const { width: OW, height: OH } = await orig.metadata()
const { data: gris, info: gi } = await orig
  .clone()
  .greyscale()
  .resize({ width: 400 })
  .raw()
  .toBuffer({ resolveWithObject: true })

let x0 = gi.width, y0 = gi.height, x1 = 0, y1 = 0
for (let y = 0; y < gi.height; y++) {
  for (let x = 0; x < gi.width; x++) {
    if (gris[y * gi.width + x] > UMBRAL) {
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
    }
  }
}
const k = OW / gi.width
const caja = { x0: Math.round(x0 * k), x1: Math.round(x1 * k), y0: Math.round(y0 * k), y1: Math.round(y1 * k) }

// ── 2. recortar dejando aire, sin pasarse del borde de la foto ─────────────
const mx = Math.round((caja.x1 - caja.x0) * MARGEN)
const my = Math.round((caja.y1 - caja.y0) * MARGEN)
const rec = {
  left: Math.max(0, caja.x0 - mx),
  top: Math.max(0, caja.y0 - my),
}
rec.width = Math.min(OW - rec.left, caja.x1 + mx - rec.left)
rec.height = Math.min(OH - rec.top, caja.y1 + my - rec.top)
console.log(`recorte: ${OW}x${OH} -> ${rec.width}x${rec.height}`)

const chico = await sharp(ENTRADA).extract(rec).resize({ width: ANCHO }).toBuffer()
const { width: W, height: H } = await sharp(chico).metadata()
const esc = W / rec.width

// la caja de la pieza, ya en las medidas finales
const bx0 = Math.round((caja.x0 - rec.left) * esc)
const bx1 = Math.round((caja.x1 - rec.left) * esc)
const by0 = Math.round((caja.y0 - rec.top) * esc)
const by1 = Math.round((caja.y1 - rec.top) * esc)

/* El margen real que quedo de cada lado: ese es el largo del desvanecido.
 *
 * Si alguno queda muy corto —tipico abajo, cuando el reflejo del piso llega
 * hasta el borde del cuadro— se corre el limite de la caja hacia adentro
 * hasta llegar al minimo. Eso desvanece un poco de foto, si: pero un reflejo
 * que se apaga de a poco se ve natural, y un reflejo cortado por una linea
 * recta se ve como un recuadro pegado encima del fondo.
 */
const MINIMO = 90
const conMinimo = (margen, limite, haciaAdentro) => {
  if (margen >= MINIMO) return [margen, limite]
  return [MINIMO, limite + haciaAdentro * (MINIMO - margen)]
}
let izq, der, arr, abj, lx0, lx1, ly0, ly1
;[izq, lx0] = conMinimo(Math.max(1, bx0), bx0, 1)
;[der, lx1] = conMinimo(Math.max(1, W - bx1), bx1, -1)
;[arr, ly0] = conMinimo(Math.max(1, by0), by0, 1)
;[abj, ly1] = conMinimo(Math.max(1, H - by1), by1, -1)

const aviso = (n, m, orig) => (m > orig ? `${n} ${m}px (forzado, la foto daba ${orig}px)` : `${n} ${m}px`)
console.log(
  "margen para desvanecer -> " +
    [
      aviso("izq", izq, Math.max(1, bx0)),
      aviso("der", der, Math.max(1, W - bx1)),
      aviso("arr", arr, Math.max(1, by0)),
      aviso("abj", abj, Math.max(1, H - by1)),
    ].join("  "),
)

// ── 3. desvanecer ──────────────────────────────────────────────────────────
/* La mascara va en RGBA, no en escala de grises: `dest-in` mira el canal ALFA
   de la mascara, y una imagen de un solo canal no tiene alfa — sale opaca
   entera y no se desvanece nada. */
const suave = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))

const mascara = Buffer.alloc(W * H * 4)
for (let y = 0; y < H; y++) {
  const oy = y < ly0 ? (ly0 - y) / arr : y > ly1 ? (y - ly1) / abj : 0
  for (let x = 0; x < W; x++) {
    const ox = x < lx0 ? (lx0 - x) / izq : x > lx1 ? (x - lx1) / der : 0
    /* Los dos ejes se combinan con la hipotenusa en vez de tomar el mayor:
       eso redondea las esquinas, que si no se notan como angulos rectos. */
    const i = (y * W + x) * 4
    mascara[i] = mascara[i + 1] = mascara[i + 2] = 255
    mascara[i + 3] = Math.round(255 * suave(1 - Math.hypot(ox, oy)))
  }
}

await sharp(chico)
  .ensureAlpha()
  .composite([{ input: mascara, raw: { width: W, height: H, channels: 4 }, blend: "dest-in" }])
  .webp({ quality: 86, effort: 6 })
  .toFile(SALIDA)

const m = await sharp(SALIDA).metadata()
const { size } = await sharp(SALIDA).toBuffer({ resolveWithObject: true }).then((r) => r.info)
console.log(`${SALIDA}  ${m.width}x${m.height}  alpha=${m.hasAlpha}  ${Math.round(size / 1024)} KB`)
