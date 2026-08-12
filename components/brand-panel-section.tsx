import { panelMarca } from "@/content/tajiro"
import { Resaltado } from "./resaltado"

/** El panel negro grande con el logotipo y el slogan. */
export function BrandPanelSection() {
  return (
    <section aria-label="Firma de marca" className="py-6 md:py-10">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="rounded-[14px] border border-borde bg-black px-5 py-12 text-center sm:px-8 md:py-24">
          <p className="mb-3 font-display text-[clamp(2.75rem,9vw,6rem)] font-black leading-none tracking-[0.08em] text-texto">
            {panelMarca.logotipo}
          </p>
          <p className="mb-7 font-display text-[clamp(1rem,2.4vw,1.625rem)] font-extrabold uppercase tracking-[0.1em] text-texto">
            <Resaltado texto={panelMarca.slogan} />
          </p>
          <span aria-hidden className="mx-auto mb-6 block h-[3px] w-16 bg-tajiro" />
          <p className="font-mono text-[11.5px] leading-relaxed tracking-[0.14em] text-texto-tenue">
            {panelMarca.pie}
          </p>
        </div>
      </div>
    </section>
  )
}
