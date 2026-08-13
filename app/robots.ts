import type { MetadataRoute } from "next"
import { marca } from "@/content/tajiro"

/**
 * Genera el archivo robots.txt en cada publicación.
 *
 * Es el cartel de entrada para los buscadores: les dice qué pueden mirar y
 * dónde está el mapa del sitio. Sin él, Google entra igual, pero anda a
 * tientas y tarda más en encontrar todo.
 *
 * La dirección sale de `marca.sitio`, en content/tajiro.ts. Si mañana cambia
 * el dominio, se cambia ahí una sola vez y este archivo y el mapa del sitio
 * se acomodan solos.
 */
/* El sitio se publica estático (`output: 'export'`), así que este archivo tiene
   que declarar que se resuelve una sola vez, al construir. Sin esta línea la
   publicación falla con un error. */
export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  const base = marca.sitio.replace(/\/$/, "")

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
