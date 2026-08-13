import sharp from "sharp"
import { readFile, writeFile } from "node:fs/promises"

/* Achica la foto de la seccion "Confia en los especialistas".
 *
 * La foto es un afiche vertical, y en la pagina se muestra dentro de una caja
 * mucho mas baja, con `object-cover`: o sea, se ve una banda del centro y el
 * resto se descarta. Todo lo que se descarta igual se lo baja el visitante.
 *
 * Cuanto se ve, medido:
 *   - en computadora  ~44% del alto
 *   - en celular      ~59% del alto  (es la pantalla mas exigente)
 *
 * Se recorta al 78% centrado: cubre el peor caso con margen. Recortar mas
 * ajustado cambiaria lo que se ve en pantallas muy angostas.
 *
 * El ancho NO se toca. La foto tiene 1100px y en computadora se muestra a
 * 720px; en una pantalla de alta resolucion hacen falta 1440. O sea que ya
 * viene corta de ancho, y achicarla la dejaria borrosa.
 */

const ENTRADA = "public/images/about-tajiro.webp"
const SALIDA = "public/images/about-tajiro.webp"
const PORCION = 0.78

/* La foto se lee entera a memoria ANTES de tocarla, y nunca se le pasa la
   ruta a sharp. Entrada y salida son el mismo archivo: si sharp lo abre, en
   Windows queda tomado y despues no se puede escribir encima. */
const original = await readFile(ENTRADA)
const antes = original.length

const { width, height } = await sharp(original).metadata()
const alto = Math.round(height * PORCION)
const arriba = Math.round((height - alto) / 2)

const buf = await sharp(original)
  .extract({ left: 0, top: arriba, width, height: alto })
  .webp({ quality: 80, effort: 6, smartSubsample: true })
  .toBuffer()

await writeFile(SALIDA, buf)

console.log(`${width}x${height} -> ${width}x${alto}`)
console.log(
  `${Math.round(antes / 1024)} KB -> ${Math.round(buf.length / 1024)} KB  (${Math.round((1 - buf.length / antes) * 100)}% menos)`,
)
