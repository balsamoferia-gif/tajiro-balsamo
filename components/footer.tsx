import Image from "next/image"
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react"
import { marca, pie } from "@/content/tajiro"

const REDES = {
  facebook: Facebook,
  instagram: Instagram,
} as const

/**
 * Mismo pie que Aequipe: cuatro columnas — logotipo, contacto, enlaces rápidos
 * y redes con la grilla de marcas del grupo — y una barra abajo separada por
 * un filete.
 *
 * Dos diferencias:
 *
 *  · Se mantiene la aclaración legal sobre Nissan. Aequipe no la lleva porque
 *    no la necesita; para TAJIRO es obligatoria.
 *
 *  · No se copia la línea de autoría del pie de Aequipe: acredita a quien
 *    desarrolló ese sitio, no este.
 */
export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-fondo via-superficie to-fondo text-texto">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* ── 1. logotipo ── */}
          <div>
            <Image
              src={marca.logo}
              alt={marca.nombre}
              width={marca.logoAncho}
              height={marca.logoAlto}
              className="h-11 w-auto"
            />
          </div>

          {/* ── 2. contacto ── */}
          <div className="space-y-4">
            <h3 className="mb-4 text-xl font-semibold uppercase text-texto">{pie.contacto.titulo}</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-none text-tajiro" aria-hidden />
                <div className="text-lg text-texto-tenue">
                  {pie.contacto.ubicacion.map((l) => (
                    <p key={l} className="m-0">
                      {l}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-none text-tajiro" aria-hidden />
                <span className="text-lg text-texto-tenue">{pie.contacto.telefono}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-none text-tajiro" aria-hidden />
                <a
                  href={`mailto:${pie.contacto.email}`}
                  className="text-lg text-texto-tenue transition-colors hover:text-texto"
                >
                  {pie.contacto.email}
                </a>
              </div>
            </div>
          </div>

          {/* ── 3. enlaces rápidos ── */}
          <nav aria-label={pie.enlaces.titulo} className="space-y-4">
            <h3 className="mb-4 text-xl font-semibold uppercase text-texto">{pie.enlaces.titulo}</h3>
            <div className="space-y-2">
              {pie.enlaces.items.map((e) => (
                <a
                  key={e.texto}
                  href={e.href}
                  className="block text-texto-tenue transition-colors hover:translate-x-1 hover:text-texto"
                >
                  {e.texto}
                </a>
              ))}
            </div>
          </nav>

          {/* ── 4. redes y marcas del grupo ── */}
          <div className="space-y-4">
            <h3 className="mb-4 text-xl font-semibold uppercase text-texto">{pie.redes.titulo}</h3>

            <ul className="mb-6 flex gap-4">
              {pie.redes.items.map((r) => {
                const Icono = REDES[r.red]
                return (
                  <li key={r.red}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${marca.nombre} en ${r.red}`}
                      /* El `p-2 -m-2` agranda la zona que se puede tocar sin
                         mover nada de lugar: lo que suma de relleno lo resta de
                         margen. El ícono sigue midiendo 24px, pero el dedo tiene
                         40px para acertarle. */
                      className="-m-2 block p-2 text-texto-tenue transition-colors hover:text-texto"
                    >
                      <Icono className="h-6 w-6" aria-hidden />
                    </a>
                  </li>
                )
              })}
            </ul>

            <div>
              <h4 className="mb-3 text-sm font-medium text-texto">{pie.marcas.titulo}</h4>
              <ul className="grid grid-cols-2 gap-3">
                {pie.marcas.items.map((m) => (
                  <li key={m.nombre}>
                    {/* El link envuelve la ficha entera, no sólo el logo, para
                        que se pueda tocar cómodo desde el celular. */}
                    <a
                      href={m.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${m.nombre} en Instagram`}
                      className="block rounded-lg bg-white p-3 transition-shadow hover:shadow-lg"
                    >
                      <Image
                        src={m.logo}
                        alt={m.nombre}
                        width={400}
                        height={138}
                        className="mx-auto h-8 w-auto object-contain"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── barra de abajo ── */}
        <div className="mt-12 space-y-4 border-t border-borde pt-8">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <p className="m-0 text-lg text-texto-tenue">
              © {new Date().getFullYear()} {marca.nombre}. {pie.derechos}
            </p>
            <p className="m-0 text-lg text-texto-tenue">
              Distribuido por {marca.distribuidor} · {marca.trayectoria}
            </p>
          </div>

          <p className="m-0 max-w-[90ch] text-[12.5px] leading-relaxed text-cota">{pie.legal}</p>
        </div>
      </div>
    </footer>
  )
}
