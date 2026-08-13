import type { MetadataRoute } from "next"
import { marca } from "@/content/tajiro"

/**
 * Genera el mapa del sitio (sitemap.xml) en cada publicación.
 *
 * Es la lista de direcciones que el sitio le entrega a Google. Hoy tiene una
 * sola, porque el sitio es una página con secciones.
 *
 * Los anclas (#familias, #contacto) NO van acá: para Google son partes de la
 * misma página, no páginas distintas. Ponerlos no suma nada y ensucia.
 *
 * Si algún día las 14 familias pasan a ser 14 páginas propias, este archivo es
 * el que hay que ampliar — y se puede armar recorriendo la lista `familias` de
 * content/tajiro.ts, sin escribir las direcciones a mano.
 */
/* El sitio se publica estático (`output: 'export'`), así que este archivo tiene
   que declarar que se resuelve una sola vez, al construir. Sin esta línea la
   publicación falla con un error. Como efecto, la fecha que se declara abajo
   es la del día en que se publicó, que es justo lo que corresponde. */
export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = marca.sitio.replace(/\/$/, "")

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
