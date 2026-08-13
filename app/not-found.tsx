import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { marca, links } from "@/content/tajiro"

/**
 * La página que se ve cuando alguien escribe mal una dirección.
 *
 * Sin este archivo se muestra la pantalla de error genérica de Next: fondo
 * blanco, letra del sistema y ninguna salida. Quien llega ahí se va.
 *
 * `noindex` es a propósito: es la única página del sitio que NO tiene que
 * aparecer en Google.
 */
export const metadata: Metadata = {
  title: `Página no encontrada — ${marca.nombre}`,
  robots: { index: false, follow: true },
}

export default function NoEncontrada() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <Image
        src={marca.logo}
        alt={marca.nombre}
        width={marca.logoAncho}
        height={marca.logoAlto}
        priority
        className="mb-10 h-12 w-auto"
      />

      {/* El 404 va grande y en rojo: es una cifra, no un texto que haya que
          leer. El rojo sobre el fondo oscuro sólo alcanza el contraste
          necesario en tamaños grandes — por eso acá sí, y en el párrafo no.
          Ver la regla del rojo en el README. */}
      <p className="m-0 font-display text-[88px] font-black leading-none text-tajiro md:text-[120px]">404</p>

      <h1 className="titulo-seccion mb-4 mt-6 text-texto">Esta página no existe</h1>

      <p className="m-0 mb-10 max-w-md text-lg leading-relaxed text-texto-tenue">
        Puede que la dirección esté mal escrita o que la página haya cambiado de lugar.
      </p>

      <div className="flex flex-wrap justify-center gap-3.5">
        <Link href="/" className="btn btn-rojo">
          VOLVER AL INICIO
        </Link>
        <Link href={`/${links.contacto}`} className="btn btn-linea">
          CONSULTAR CON UN ASESOR
        </Link>
      </div>
    </main>
  )
}
