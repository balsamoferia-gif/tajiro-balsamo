"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { hero } from "@/content/tajiro"
import { Resaltado } from "./resaltado"

/**
 * Banner principal, con la misma estructura que el de Aequipe:
 * texto a la izquierda y foto a la derecha en computadora; texto arriba
 * centrado y foto abajo en celular; bloques separados para cada vista.
 *
 * Se cambia de diapositiva arrastrando — con el mouse o con el dedo — o con
 * los puntitos de abajo. Se usa pointer events, que cubre mouse, dedo y lápiz
 * con el mismo código.
 *
 * Diferencias con Aequipe, a propósito: fondo oscuro en vez de blanco, y las
 * fotos van recortadas sin recuadro (sobre negro, una foto de estudio con
 * fondo blanco se vería como un rectángulo).
 */
export function HeroSection() {
  const [actual, setActual] = useState(0)
  const [pausado, setPausado] = useState(false)
  const [arrastrando, setArrastrando] = useState(false)
  const [dx, setDx] = useState(0)
  const menosMovimiento = useReducedMotion()

  const gesto = useRef<{ x: number; y: number; vivo: boolean } | null>(null)

  const diapos = hero.diapositivas
  const diapo = diapos[actual]

  /* La cuenta regresiva arranca de nuevo cada vez que cambia la diapositiva
     —por eso `actual` está en la lista de abajo—. Sin eso el reloj corre por
     su cuenta: si alguien toca un puntito faltando medio segundo para los 7,
     elige una foto y la pierde enseguida. Cada diapositiva se ve sus segundos
     completos, la haya elegido la persona o el reloj. */
  useEffect(() => {
    if (pausado || arrastrando || menosMovimiento || diapos.length < 2) return
    const t = setTimeout(
      () => setActual((prev) => (prev + 1) % diapos.length),
      hero.segundosPorDiapositiva * 1000,
    )
    return () => clearTimeout(t)
  }, [actual, pausado, arrastrando, menosMovimiento, diapos.length])

  const duracion = menosMovimiento ? 0 : 0.8

  /* ── arrastre ─────────────────────────────────────────────────────────── */

  const irA = (i: number) => setActual((i + diapos.length) % diapos.length)

  const alBajar = (e: React.PointerEvent) => {
    if (diapos.length < 2) return
    gesto.current = { x: e.clientX, y: e.clientY, vivo: true }
    setArrastrando(true)
  }

  const alMover = (e: React.PointerEvent) => {
    const g = gesto.current
    if (!g?.vivo) return
    const desplazX = e.clientX - g.x
    const desplazY = e.clientY - g.y

    // Si el gesto es más vertical que horizontal, la persona está scrolleando
    // la página: soltamos el carrusel y la dejamos scrollear tranquila.
    if (Math.abs(desplazY) > Math.abs(desplazX) && Math.abs(desplazY) > 12) {
      g.vivo = false
      setDx(0)
      setArrastrando(false)
      return
    }
    setDx(desplazX)
  }

  const alSoltar = () => {
    const g = gesto.current
    if (g?.vivo && Math.abs(dx) > hero.pixelesParaCambiar) {
      irA(actual + (dx < 0 ? 1 : -1))
    }
    gesto.current = null
    setDx(0)
    setArrastrando(false)
  }

  const alTeclear = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); irA(actual + 1) }
    if (e.key === "ArrowLeft") { e.preventDefault(); irA(actual - 1) }
  }

  /* ── textos ───────────────────────────────────────────────────────────── */

  const Titulo = actual === 0 ? "h1" : "h2"

  const botones = hero.mostrarBotones && (
    <div className="flex flex-wrap gap-3.5 max-md:justify-center">
      <a href={diapo.botonPrincipal.href} className="btn btn-rojo max-[400px]:w-full">
        {diapo.botonPrincipal.texto}
      </a>
      <a href={diapo.botonSecundario.href} className="btn btn-linea max-[400px]:w-full">
        {diapo.botonSecundario.texto}
      </a>
    </div>
  )

  const foto = (src: string, clases: string) => (
    <Image
      src={src}
      alt={diapo.fotoAlt}
      width={1000}
      height={700}
      priority={actual === 0}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className={`select-none ${clases}`}
    />
  )

  return (
    <section
      id="inicio"
      aria-roledescription="carrusel"
      aria-label="Presentación de la marca. Arrastrá para cambiar de diapositiva."
      tabIndex={0}
      onKeyDown={alTeclear}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      onPointerDown={alBajar}
      onPointerMove={alMover}
      onPointerUp={alSoltar}
      onPointerCancel={alSoltar}
      onPointerLeave={alSoltar}
      style={{ touchAction: "pan-y" }}
      className={`relative w-full overflow-hidden outline-none ${
        arrastrando ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="haz haz-1" />
        <span className="haz haz-2" />
        <span className="haz haz-3" />
        <span className="resplandor" />
      </div>

      {/* el contenido acompaña el dedo, amortiguado */}
      <div
        style={{
          transform: `translateX(${dx * 0.35}px)`,
          transition: arrastrando ? "none" : "transform .35s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* ═══════════════ COMPUTADORA ═══════════════ */}
        <div className="relative hidden min-h-[650px] w-full md:flex">
          <div className="relative z-10 flex w-1/2 flex-col justify-center py-24 pl-8 pr-10 lg:pl-16 xl:pl-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={actual}
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: duracion }}
              >
                <Titulo className="titular mb-6 whitespace-pre-line text-texto">
                  <Resaltado texto={diapo.titulo} />
                </Titulo>
                <p className="mb-9 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-texto-tenue lg:text-xl">
                  {diapo.bajada}
                </p>
                {botones}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex w-1/2 items-center justify-end overflow-hidden pr-8 lg:pr-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={diapo.fotoDesktop}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: duracion }}
                className="flex w-full justify-end"
              >
                {foto(diapo.fotoDesktop, "ml-auto h-auto max-h-[520px] w-auto max-w-full object-contain")}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ═══════════════ CELULAR ═══════════════ */}
        <div className="relative flex flex-col items-center md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`m-${actual}`}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: duracion }}
              className="w-full px-6 pb-6 pt-10 text-center"
            >
              <Titulo className="titular mb-5 whitespace-pre-line text-texto">
                <Resaltado texto={diapo.titulo} />
              </Titulo>
              <p className="mx-auto mb-7 max-w-sm whitespace-pre-line text-lg leading-relaxed text-texto-tenue">
                {diapo.bajada}
              </p>
              {botones}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`mf-${diapo.fotoMobile}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: duracion }}
              className="w-full px-4"
            >
              {foto(diapo.fotoMobile, "h-auto w-full object-contain")}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* puntitos */}
      {diapos.length > 1 && (
        <div
          role="tablist"
          aria-label="Diapositivas"
          className="relative flex justify-center gap-2.5 pb-10 pt-8 md:pb-12"
        >
          {diapos.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === actual}
              aria-label={`Diapositiva ${i + 1} de ${diapos.length}`}
              onClick={() => irA(i)}
              className={`h-1 rounded-sm transition-all ${
                i === actual ? "w-[46px] bg-tajiro hover:bg-tajiro-oscuro" : "w-[34px] bg-borde hover:bg-texto-tenue"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
