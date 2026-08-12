import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { QuickAccessSection } from "@/components/quick-access-section"
import { HighlightsSection } from "@/components/highlights-section"
import { AboutSection } from "@/components/about-section"
import { ValuesSection } from "@/components/values-section"
import { ProductFamilySection } from "@/components/product-family-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

/**
 * El orden de las secciones es el de la página. Para mover una de lugar,
 * moverla acá. Los textos y las fotos no están en este archivo: están todos
 * en content/tajiro.ts.
 */
export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-1/2 focus:top-0 focus:z-[200] focus:-translate-x-1/2 focus:rounded-b-lg focus:bg-tajiro focus:px-5 focus:py-3 focus:font-mono focus:text-[13px] focus:tracking-[0.08em] focus:text-papel-ficha"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main id="contenido">
        <HeroSection />
        <QuickAccessSection />
        <HighlightsSection />
        <AboutSection />
        <ValuesSection />
        <ProductFamilySection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
