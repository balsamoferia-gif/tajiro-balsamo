import { pilares } from "@/content/tajiro"
import { PillarIcon } from "./pillar-icons"

export function ValuesSection() {
  return (
    <section id="pilares" aria-labelledby="t-pilares" className="pb-14 md:pb-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <h2 id="t-pilares" className="sr-only">
          Por qué TAJIRO
        </h2>

        <div className="grid gap-7 rounded-[14px] border border-borde bg-superficie p-7 md:grid-cols-2 md:gap-12 md:p-12">
          {pilares.map((p) => (
            <article
              key={p.titulo}
              className="-m-4 grid grid-cols-[52px_minmax(0,1fr)] items-start gap-4 rounded-lg border border-transparent p-4 transition-all hover:-translate-y-0.5 hover:border-borde hover:bg-superficie-2 md:grid-cols-[68px_minmax(0,1fr)] md:gap-6"
            >
              <span className="block text-texto [&>svg]:h-auto [&>svg]:w-full">
                <PillarIcon nombre={p.icono} />
              </span>

              <div>
                {/* Título en rojo: 3,0:1 sobre esta superficie — pasa AA sólo por
                    ser texto grande (>=20px en negrita). No bajar el tamaño. */}
                <h3 className="mb-1.5 font-display text-[clamp(1.25rem,2.2vw,1.625rem)] font-extrabold uppercase leading-tight text-tajiro">
                  {p.titulo}
                </h3>
                <p className="mb-3.5 font-mono text-[11.5px] uppercase leading-none tracking-[0.12em] text-texto-tenue">
                  {p.subtitulo}
                </p>
                <p className="m-0 leading-relaxed text-texto-tenue">{p.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
