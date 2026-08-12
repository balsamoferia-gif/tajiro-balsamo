import { numeros } from "@/content/tajiro"
import { Resaltado } from "./resaltado"

/**
 * Fila de especificación de manual, no cuatro tarjetas con contador.
 * DESIGN.md §3 prohíbe por nombre las tarjetas, las sombras y la animación de
 * conteo acá. En mobile se parte en dos filas de dos manteniendo las divisiones.
 */
export function HighlightsSection() {
  return (
    <section id="numeros" aria-labelledby="t-numeros" className="py-14 md:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <h2 id="t-numeros" className="titulo-seccion mb-6 text-texto">
          <Resaltado texto={numeros.titulo} />
        </h2>

        <div className="rounded-[14px] border border-borde bg-superficie px-6 py-7 md:px-10 md:py-11">
          <dl className="grid grid-cols-2 gap-y-7 sm:grid-cols-4 sm:gap-y-0">
            {numeros.cifras.map((c, i) => (
              <div
                key={c.label}
                className={`px-3.5 sm:px-4 md:px-8 ${
                  i % 2 === 0 ? "border-l-0" : "border-l border-borde"
                } sm:border-l sm:first:border-l-0 sm:first:pl-0 ${i === 0 ? "pl-0" : ""}`}
              >
                <dt className="mb-2.5 font-display text-[clamp(1.875rem,4vw,3.125rem)] font-black leading-none tracking-[-0.015em] tabular-nums text-texto">
                  {/* El + es el único rojo de la sección, y va en tamaño display */}
                  <span aria-hidden className="text-tajiro">
                    +
                  </span>
                  {c.cifra}
                </dt>
                <dd className="m-0 font-mono text-xs uppercase leading-snug tracking-[0.12em] text-texto-tenue">
                  {c.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
