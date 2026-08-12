import Image from "next/image"
import { familias, seccionFamilias, links } from "@/content/tajiro"
import { Resaltado } from "./resaltado"

export function ProductFamilySection() {
  return (
    <section id="familias" aria-labelledby="t-familias" className="pb-14 md:pb-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <h2 id="t-familias" className="titulo-seccion mb-7 text-texto md:mb-10">
          <Resaltado texto={seccionFamilias.titulo} />
        </h2>

        <ul className="grid grid-cols-2 gap-3 min-[401px]:gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {familias.map((f, i) => (
            <li key={f.nombre} className="flex">
              {/* El número de ficha sale del orden de la lista en content/tajiro.ts */}
              <a
                href={links.infobal}
                className="flex w-full flex-col overflow-hidden rounded-[14px] border border-borde bg-superficie transition-all hover:-translate-y-0.5 hover:border-tajiro"
              >
                <span className="block bg-foto">
                  <Image
                    src={f.foto}
                    alt={f.fotoAlt}
                    width={900}
                    height={600}
                    className="aspect-[3/2] w-full object-cover"
                  />
                </span>
                <span className="mt-auto flex flex-col items-start gap-0.5 px-3 pb-3.5 pt-2.5 min-[401px]:flex-row min-[401px]:items-baseline min-[401px]:gap-3 min-[401px]:px-4 min-[401px]:pb-4 min-[401px]:pt-3.5">
                  <span className="font-mono text-[11.5px] leading-none tracking-[0.1em] tabular-nums text-texto-tenue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[13px] font-extrabold uppercase tracking-[0.01em] text-texto [hyphens:auto] [overflow-wrap:break-word] min-[401px]:text-base">
                    {f.nombre}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
