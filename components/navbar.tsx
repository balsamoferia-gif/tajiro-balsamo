"use client"

import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { marca, navegacion, links } from "@/content/tajiro"

/**
 * Misma estructura que la barra de Aequipe: logotipo a la izquierda, links de
 * texto grandes al medio, un botón a la derecha, y hamburguesa en celular que
 * despliega los mismos links apilados. Sin buscador ni pastillas.
 *
 * Dos diferencias a propósito:
 *
 *  · Aequipe pinta la barra con el color de marca. Acá no se puede: el
 *    logotipo de TAJIRO ES rojo, así que sobre una barra roja desaparecería.
 *    Queda sobre el fondo oscuro.
 *
 *  · Aequipe usa `fixed` y le deja un hueco arriba al hero para compensar.
 *    Acá va `sticky`, que ocupa su lugar solo y no puede tapar contenido.
 */
export function Navbar() {
  const [abierto, setAbierto] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-fondo/85 backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <a href="#inicio" aria-label={`${marca.nombre}, inicio`} className="flex flex-none items-center">
            <Image
              src={marca.logo}
              alt={marca.nombre}
              width={marca.logoAncho}
              height={marca.logoAlto}
              priority
              className="h-8 w-auto md:h-10"
            />
          </a>

          {/* ── links en computadora ── */}
          <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navegacion.enlaces.map((e) => (
              <a
                key={e.href}
                href={e.href}
                className="whitespace-nowrap text-base font-bold uppercase tracking-wide text-texto transition-colors hover:text-tajiro xl:text-lg"
              >
                {e.texto}
              </a>
            ))}

            <a href={links.contacto} className="btn btn-rojo whitespace-nowrap px-5 py-3 text-[13px]">
              {navegacion.botonAsesor}
            </a>
          </nav>

          {/* ── botón de menú en celular ── */}
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="nav-mobile"
            className="p-2 text-texto lg:hidden"
          >
            {abierto ? <X size={26} aria-hidden /> : <Menu size={26} aria-hidden />}
            <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>

        {/* ── menú desplegado en celular ── */}
        {abierto && (
          <nav id="nav-mobile" aria-label="Principal" className="border-t border-white/10 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {navegacion.enlaces.map((e) => (
                <a
                  key={e.href}
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  className="py-2.5 text-xl font-bold uppercase tracking-wide text-texto transition-colors hover:text-tajiro"
                >
                  {e.texto}
                </a>
              ))}

              <a
                href={links.contacto}
                onClick={() => setAbierto(false)}
                className="btn btn-rojo mt-3 w-full"
              >
                {navegacion.botonAsesor}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
