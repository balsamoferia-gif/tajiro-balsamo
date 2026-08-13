import sharp from "sharp"
import { stat } from "node:fs/promises"

/* Arma la imagen que se ve cuando alguien pega el link del sitio en WhatsApp,
 * Facebook o LinkedIn.
 *
 * Tres decisiones, y por que:
 *
 *  - 1200x630. Es la medida que esperan todas las redes. Otra medida se
 *    recorta sola, y el recorte casi nunca cae donde uno quiere.
 *  - JPG, no WEBP. WhatsApp y Facebook a veces no muestran WEBP en la vista
 *    previa y queda el link pelado, sin imagen.
 *  - Fondo opaco. La foto del banner es transparente en los bordes; sobre la
 *    vista previa de WhatsApp, que es blanca, se veria un fondo blanco con
 *    piezas oscuras encima. Va pegada sobre el fondo de la marca.
 */

const FONDO = "#02070d"
const ANCHO = 1200
const ALTO = 630

const FOTO = "public/images/hero-familias.webp"
const LOGO = "public/images/logo-tajiro.png"
const SALIDA = "public/images/compartir.jpg"

/* La foto va a la derecha y ocupa un poco mas de la mitad; el logo a la
   izquierda. Es la misma reparticion que el banner en computadora. */
const foto = await sharp(FOTO)
  .resize({ width: Math.round(ANCHO * 0.62), height: Math.round(ALTO * 0.88), fit: "inside" })
  .toBuffer()
const mFoto = await sharp(foto).metadata()

const logo = await sharp(LOGO).resize({ width: 300 }).toBuffer()
const mLogo = await sharp(logo).metadata()

await sharp({ create: { width: ANCHO, height: ALTO, channels: 3, background: FONDO } })
  .composite([
    {
      input: foto,
      left: ANCHO - mFoto.width - 24,
      top: Math.round((ALTO - mFoto.height) / 2),
    },
    { input: logo, left: 72, top: Math.round(ALTO / 2 - mLogo.height / 2 - 26) },
  ])
  .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
  .toFile(SALIDA)

/* El peso se lee del archivo en disco. Pedirselo a sharp lo vuelve a
   comprimir con otros ajustes y devuelve un numero que no es el real. */
const m = await sharp(SALIDA).metadata()
const { size } = await stat(SALIDA)
console.log(`${SALIDA}  ${m.width}x${m.height}  ${m.format}  ${Math.round(size / 1024)} KB`)
