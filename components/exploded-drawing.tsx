"use client"

import { useEffect, useRef, useState } from "react"
import { sobreLaMarca } from "@/content/tajiro"

/**
 * El despiece que se dibuja solo — elemento firma de la marca (DESIGN.md §3).
 *
 * Un disco de freno, su maza y un bulón, sobre un eje común. Al entrar en
 * pantalla se traza una sola vez en 1,2 s, y 200 ms después de terminar el
 * trazo el disco se resalta en rojo: entre todas las piezas posibles, la
 * correcta para tu Nissan.
 *
 * Sin JavaScript el dibujo aparece ya hecho y resaltado. La animación se
 * prepara recién cuando el componente monta (clase .js-despiece en <html>).
 */
export function ExplodedDrawing() {
  const ref = useRef<HTMLElement>(null)
  const [dibujando, setDibujando] = useState(false)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return

    // Longitud real de cada trazo, para que el dibujo avance parejo.
    // Sólo el contorno de las piezas: el eje y las cotas no se animan.
    nodo.querySelectorAll<SVGGeometryElement>(".pieza .trazo").forEach((t) => {
      let largo = 1200
      try {
        largo = Math.ceil(t.getTotalLength()) || 1200
      } catch {
        /* algún navegador viejo: se usa el valor por defecto */
      }
      t.style.setProperty("--largo", String(largo))
    })

    document.documentElement.classList.add("js-despiece")

    let arrancado = false
    const arrancar = () => {
      if (arrancado) return
      arrancado = true
      setDibujando(true)
    }

    // 1) Si el dibujo ya está en pantalla al cargar, arrancar sin esperar al
    //    observador. Hay navegadores y situaciones donde la primera
    //    notificación del observador no llega, y sin esto el dibujo se queda
    //    escondido para siempre.
    const caja = nodo.getBoundingClientRect()
    if (caja.top < window.innerHeight * 0.9 && caja.bottom > 0) arrancar()

    // 2) Camino normal: arranca cuando el dibujo entra en pantalla al scrollear.
    const vigia = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          arrancar()
          vigia.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    vigia.observe(nodo)

    // 3) Red de seguridad: pase lo que pase, a los 4 segundos se dibuja.
    //    El dibujo nunca puede quedar invisible.
    const red = window.setTimeout(arrancar, 4000)

    return () => {
      vigia.disconnect()
      window.clearTimeout(red)
    }
  }, [])

  return (
    <figure ref={ref} className={`m-0 ${dibujando ? "is-dibujando" : ""}`}>
      <svg className="despiece-svg text-texto-tenue" viewBox="0 0 460 400" role="img" aria-labelledby="desp-t desp-d">
        <title id="desp-t">Despiece técnico de un conjunto de freno</title>
        <desc id="desp-d">
          Dibujo de línea de un disco de freno, su maza y un bulón de rueda, separados sobre un eje común y numerados
          del 01 al 03. El disco, marcado como 01, aparece señalado en rojo: es la pieza que corresponde a la
          aplicación.
        </desc>

        {/* eje / línea de centro */}
        <path className="trazo trazo-eje" d="M14 200H446" fill="none" strokeWidth="1" strokeDasharray="16 5 3 5" />

        {/* 01 · disco de freno */}
        <g className="pieza pieza-destacada">
          <ellipse className="trazo" cx="150" cy="200" rx="52" ry="128" fill="none" strokeWidth="1.5" />
          <path className="trazo" d="M176 72a52 128 0 0 1 0 256" fill="none" strokeWidth="1.5" />
          <path className="trazo" d="M150 72h26M150 328h26" fill="none" strokeWidth="1.5" />
          <ellipse className="trazo" cx="150" cy="200" rx="16" ry="40" fill="none" strokeWidth="1.5" />
          <ellipse className="trazo" cx="150" cy="126" rx="5" ry="8" fill="none" strokeWidth="1.2" />
          <ellipse className="trazo" cx="150" cy="274" rx="5" ry="8" fill="none" strokeWidth="1.2" />
          <ellipse className="trazo" cx="124" cy="163" rx="5" ry="8" fill="none" strokeWidth="1.2" />
          <ellipse className="trazo" cx="124" cy="237" rx="5" ry="8" fill="none" strokeWidth="1.2" />
        </g>
        <ellipse
          className="trazo trazo-cota"
          cx="150"
          cy="200"
          rx="30"
          ry="74"
          fill="none"
          strokeWidth="1"
          strokeDasharray="10 4 2 4"
        />

        {/* 02 · maza */}
        <g className="pieza">
          <ellipse className="trazo" cx="278" cy="200" rx="30" ry="76" fill="none" strokeWidth="1.5" />
          <path className="trazo" d="M278 124h42v152h-42" fill="none" strokeWidth="1.5" />
          <path className="trazo" d="M320 158h38v84h-38" fill="none" strokeWidth="1.5" />
          <ellipse className="trazo" cx="358" cy="200" rx="9" ry="42" fill="none" strokeWidth="1.5" />
          <ellipse className="trazo" cx="278" cy="200" rx="13" ry="32" fill="none" strokeWidth="1.5" />
        </g>

        {/* 03 · bulón de rueda */}
        <g className="pieza">
          <path className="trazo" d="M386 182h12v36h-12z" fill="none" strokeWidth="1.5" />
          <path className="trazo" d="M398 190h44v20h-44" fill="none" strokeWidth="1.5" />
          <path className="trazo" d="M406 190v20M414 190v20M422 190v20M430 190v20M438 190v20" fill="none" strokeWidth="1" />
        </g>

        {/* cotas y llamadas */}
        <g>
          <path className="trazo trazo-cota" d="M150 72V50M278 124V102M392 182v-26" fill="none" strokeWidth="1" />
          <path className="trazo trazo-cota" d="M98 350h104M98 344v12M202 344v12" fill="none" strokeWidth="1" />
        </g>

        <circle className="punto-llamada" cx="150" cy="72" r="4" />

        <g className="despiece-num">
          <text x="150" y="40" textAnchor="middle">
            01
          </text>
          <text x="278" y="92" textAnchor="middle">
            02
          </text>
          <text x="392" y="146" textAnchor="middle">
            03
          </text>
        </g>
      </svg>

      <figcaption className="mt-6 flex flex-wrap gap-2 gap-x-3">
        {sobreLaMarca.despiece.piezas.map((p, i) => (
          <span
            key={p}
            className={`rounded border px-2.5 py-2 font-mono text-[11.5px] uppercase leading-none tracking-[0.1em] ${
              i === 0 ? "cota-destacada border-tajiro text-texto" : "border-borde text-texto-tenue"
            }`}
          >
            {p}
          </span>
        ))}
        <span className="rounded bg-tajiro px-2.5 py-2 font-mono text-[11.5px] uppercase leading-none tracking-[0.1em] text-papel-ficha">
          {sobreLaMarca.despiece.nota}
        </span>
      </figcaption>
    </figure>
  )
}
