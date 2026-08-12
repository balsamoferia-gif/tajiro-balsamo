"use client"

import Image from "next/image"
import { accesos } from "@/content/tajiro"

/**
 * Las dos fichas anchas debajo del banner. Cada una baja al formulario de
 * contacto y le abre la pestaña que corresponde.
 *
 * El link (#contacto-mayorista / #contacto-minorista) es lo que hace el
 * trabajo: baja hasta el formulario y le dice qué pestaña mostrar. Sin
 * JavaScript igual baja, sólo que muestra la pestaña por defecto.
 *
 * El aviso extra existe para un caso puntual: si la dirección YA es la misma
 * —porque tocaste la ficha, cambiaste de pestaña a mano y volviste a tocarla—
 * el navegador no avisa que cambió nada. Con esto la pestaña se abre igual.
 */
export function QuickAccessSection() {
  const avisar = (href: string) => {
    window.dispatchEvent(new CustomEvent("tajiro:pestana", { detail: href.replace("#", "") }))
  }

  return (
    <section aria-label="Accesos rápidos" className="py-4 md:py-8">
      <div className="mx-auto grid w-full max-w-[1320px] gap-4 px-5 sm:px-8 md:grid-cols-2 md:gap-6 lg:px-12">
        {accesos.map((a) => (
          <a
            key={a.etiqueta}
            href={a.href}
            onClick={() => avisar(a.href)}
            className="group relative block overflow-hidden rounded-[14px] border border-borde bg-foto"
          >
            <Image
              src={a.foto}
              alt={a.fotoAlt}
              width={1200}
              height={800}
              className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:aspect-[2/1]"
            />
            <span className="absolute bottom-4 left-4 rounded-lg bg-tajiro px-6 py-4 text-xs font-bold uppercase leading-none tracking-[0.06em] text-papel-ficha transition-colors group-hover:bg-tajiro-oscuro md:bottom-1/2 md:left-auto md:right-8 md:translate-y-1/2 md:text-[15px]">
              {a.etiqueta}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
