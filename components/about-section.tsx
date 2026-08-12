import Image from "next/image"
import { sobreLaMarca } from "@/content/tajiro"
import { Resaltado } from "./resaltado"

/**
 * Misma estructura que la sección "Nosotros" de Aequipe: dos columnas, texto a
 * la izquierda en cuerpo grande y aireado, imagen a la derecha en una ficha con
 * esquinas redondeadas y sombra.
 *
 * Una diferencia deliberada: Aequipe pinta toda la sección con el color de
 * marca. Acá el fondo se queda oscuro, porque la imagen de TAJIRO ya es roja
 * casi entera — sobre un fondo rojo se empastaría. Sobre el oscuro, resalta.
 */
export function AboutSection() {
  return (
    <section id="marca" aria-labelledby="t-marca" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* ── Columna izquierda: texto ── */}
          <div>
            <h2 id="t-marca" className="titulo-seccion mb-8 text-texto">
              <Resaltado texto={sobreLaMarca.titulo} />
            </h2>

            <div className="space-y-6 text-xl leading-relaxed text-texto md:text-2xl">
              {sobreLaMarca.parrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              <p className="text-lg font-semibold text-texto md:text-xl">{sobreLaMarca.firma}</p>
            </div>
          </div>

          {/* ── Columna derecha: imagen ── */}
          <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-2xl md:h-[560px] lg:h-[620px]">
            <Image
              src={sobreLaMarca.foto}
              alt={sobreLaMarca.fotoAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
