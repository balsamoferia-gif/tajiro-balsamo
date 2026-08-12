"use client"

import { useEffect, useState } from "react"
import { Send } from "lucide-react"
import { contacto } from "@/content/tajiro"
import { DatoIcon, WhatsAppIcon } from "./contact-icons"
import { enviarMayoristaPorMail, hayEmailConfigurado } from "@/lib/enviar-mayorista"

const ES_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Pestana = "particular" | "mayorista"
type Errores = Record<string, string>

/* ═══════════════════════════════════════════════════════════════════════════
   Los campos van definidos ACÁ AFUERA, no adentro del componente.

   Si se definen adentro, React los toma como un tipo de componente nuevo en
   cada render, desmonta el formulario entero y vuelve a montarlo — con lo cual
   se borra todo lo que la persona venía escribiendo apenas aparece un error de
   validación. Definidos afuera, el formulario se mantiene.
   ═══════════════════════════════════════════════════════════════════════════ */

function Error({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null
  return (
    <p id={`e-${id}`} className="m-0 text-[13px] leading-snug text-[#ff8b9b]">
      {texto}
    </p>
  )
}

function Etiqueta({ id, texto }: { id: string; texto: string }) {
  return (
    <label htmlFor={`f-${id}`} className="text-sm font-medium text-texto">
      {texto}
    </label>
  )
}

function Campo({
  id,
  label,
  errores,
  tipo = "text",
  ejemplo,
  autoComplete,
}: {
  id: string
  label: string
  errores: Errores
  tipo?: string
  ejemplo?: string
  autoComplete?: string
}) {
  return (
    <div className="grid gap-1.5">
      <Etiqueta id={id} texto={label} />
      <input
        id={`f-${id}`}
        name={id}
        type={tipo}
        placeholder={ejemplo}
        autoComplete={autoComplete}
        aria-invalid={errores[id] ? true : undefined}
        aria-describedby={errores[id] ? `e-${id}` : undefined}
        className="campo-input"
      />
      <Error id={id} texto={errores[id]} />
    </div>
  )
}

function Area({
  id,
  label,
  errores,
  ejemplo,
}: {
  id: string
  label: string
  errores: Errores
  ejemplo?: string
}) {
  return (
    <div className="grid gap-1.5">
      <Etiqueta id={id} texto={label} />
      <textarea
        id={`f-${id}`}
        name={id}
        rows={4}
        placeholder={ejemplo}
        aria-invalid={errores[id] ? true : undefined}
        aria-describedby={errores[id] ? `e-${id}` : undefined}
        className="campo-input resize-y"
      />
      <Error id={id} texto={errores[id]} />
    </div>
  )
}

const FLECHA =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237C8085' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")"

function Lista({
  id,
  label,
  errores,
  vacio,
  opciones,
}: {
  id: string
  label: string
  errores: Errores
  vacio: string
  opciones: readonly string[]
}) {
  return (
    <div className="grid gap-1.5">
      <Etiqueta id={id} texto={label} />
      <select
        id={`f-${id}`}
        name={id}
        defaultValue=""
        aria-invalid={errores[id] ? true : undefined}
        aria-describedby={errores[id] ? `e-${id}` : undefined}
        className="campo-input appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10"
        style={{ backgroundImage: FLECHA }}
      >
        <option value="" disabled>
          {vacio}
        </option>
        {opciones.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Error id={id} texto={errores[id]} />
    </div>
  )
}

function Boton({
  texto,
  via,
  enviando,
  textoEnviando,
}: {
  texto: string
  /* El ícono dice a dónde va: WhatsApp o mail. */
  via: "whatsapp" | "mail"
  enviando?: boolean
  textoEnviando?: string
}) {
  return (
    <button type="submit" disabled={enviando} className="btn btn-rojo w-full gap-2.5 disabled:opacity-70">
      {enviando ? (
        textoEnviando
      ) : (
        <>
          {texto}
          {via === "whatsapp" ? <WhatsAppIcon className="h-5 w-5" /> : <Send className="h-4 w-4" aria-hidden />}
        </>
      )}
    </button>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   La sección
   ═══════════════════════════════════════════════════════════════════════════ */

const OBLIGATORIOS: Record<Pestana, string[]> = {
  particular: ["nombre", "vehiculo", "consulta"],
  mayorista: ["nombre", "telefono", "email", "razonSocial", "provincia", "ciudad", "categoriaIva", "cuit", "comentarios"],
}

/**
 * Misma estructura que el contacto de Aequipe: datos de la casa a la izquierda,
 * formulario a la derecha, y dos pestañas — venta particular y ventas
 * mayoristas — con campos distintos cada una.
 *
 * Diferencia: los dos formularios abren WhatsApp con los datos ya escritos, en
 * vez de mandar un mail. Así funcionan de verdad desde el primer día, sin
 * depender de ningún servidor. El número está en content/tajiro.ts.
 */
export function ContactSection() {
  const [pestana, setPestana] = useState<Pestana>("particular")
  const [errores, setErrores] = useState<Errores>({})
  const [estado, setEstado] = useState("")
  const [enviando, setEnviando] = useState(false)
  /* Link de rescate: sólo aparece si el mail no salió. */
  const [rescate, setRescate] = useState("")

  const cambiarPestana = (p: Pestana) => {
    setPestana(p)
    setErrores({})
    setEstado("")
    setRescate("")
  }

  /* Las fichas de arriba bajan hasta acá con #contacto-mayorista o
     #contacto-minorista, y esta parte abre la pestaña que corresponde.
     Escucha las dos cosas: el cambio de dirección del navegador, y el aviso
     que manda la ficha para cuando la dirección no cambió. */
  useEffect(() => {
    const abrirSegunAncla = (ancla: string) => {
      if (ancla === "contacto-mayorista") cambiarPestana("mayorista")
      if (ancla === "contacto-minorista") cambiarPestana("particular")
    }

    abrirSegunAncla(window.location.hash.replace("#", ""))

    const porDireccion = () => abrirSegunAncla(window.location.hash.replace("#", ""))
    const porAviso = (e: Event) => abrirSegunAncla((e as CustomEvent<string>).detail)

    window.addEventListener("hashchange", porDireccion)
    window.addEventListener("tajiro:pestana", porAviso)
    return () => {
      window.removeEventListener("hashchange", porDireccion)
      window.removeEventListener("tajiro:pestana", porAviso)
    }
  }, [])

  /** Arma el link de WhatsApp con los datos ya escritos. */
  const armarWhatsApp = (datos: FormData, tipo: Pestana) => {
    const etiquetas: Record<string, string> =
      tipo === "particular" ? contacto.particular.campos : contacto.mayorista.campos

    const lineas = [
      "*Consulta desde la web de TAJIRO*",
      `Tipo: ${tipo === "particular" ? contacto.pestanas.particular : contacto.pestanas.mayorista}`,
      "",
    ]
    for (const [clave, valor] of datos.entries()) {
      const texto = String(valor).trim()
      if (texto) lineas.push(`${etiquetas[clave] ?? clave}: ${texto}`)
    }

    return `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(lineas.join("\n"))}`
  }

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const datos = new FormData(form)
    const nuevos: Errores = {}

    for (const campo of OBLIGATORIOS[pestana]) {
      const valor = String(datos.get(campo) ?? "").trim()
      if (!valor) nuevos[campo] = contacto.mensajes.campoVacio
      else if (campo === "email" && !ES_EMAIL.test(valor)) nuevos[campo] = contacto.mensajes.emailInvalido
    }

    setErrores(nuevos)
    setRescate("")
    if (Object.keys(nuevos).length > 0) {
      setEstado(contacto.mensajes.faltanDatos)
      document.getElementById(`f-${Object.keys(nuevos)[0]}`)?.focus()
      return
    }

    /* Venta particular: sale por WhatsApp. */
    if (pestana === "particular") {
      setEstado(contacto.mensajes.abriendo)
      window.open(armarWhatsApp(datos, "particular"), "_blank", "noopener,noreferrer")
      return
    }

    /* Ventas mayoristas: sale por mail con EmailJS, igual que Aequipe.
       Si el mail no sale —porque faltan las credenciales o porque falló el
       servicio— NO se abre WhatsApp solo: se muestra un link para que la
       persona decida. Abrir otra app sin avisar es desconcertante, y encima
       tapaba el hecho de que el mail no estaba andando. */
    if (!hayEmailConfigurado()) {
      console.warn("[TAJIRO] Faltan las credenciales de EmailJS. Ver .env.local.example")
      setEstado(contacto.mensajes.sinConfigurar)
      setRescate(armarWhatsApp(datos, "mayorista"))
      return
    }

    setEnviando(true)
    setEstado(contacto.mensajes.enviando)
    try {
      await enviarMayoristaPorMail(datos)
      setEstado(contacto.mensajes.enviado)
      form.reset()
    } catch (error) {
      console.error("[TAJIRO] Error al enviar por EmailJS:", error)
      setEstado(contacto.mensajes.errorEnvio)
      setRescate(armarWhatsApp(datos, "mayorista"))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section id="aplicacion" aria-labelledby="t-contacto" className="scroll-mt-24 pb-14 md:pb-24">
      {/* Anclas de las fichas de arriba. Sin JavaScript igual bajan hasta acá. */}
      <span id="contacto-mayorista" aria-hidden className="block scroll-mt-24" />
      <span id="contacto-minorista" aria-hidden className="block scroll-mt-24" />

      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── izquierda: datos de la casa ── */}
          <div className="space-y-8">
            <div>
              <h2 id="t-contacto" className="titulo-seccion mb-4 text-texto">
                {contacto.titulo}
              </h2>
              <p className="text-lg leading-relaxed text-texto-tenue">{contacto.intro}</p>
            </div>

            <div className="space-y-6">
              {contacto.datos.map((d) => (
                <div key={d.titulo} className="flex items-start gap-4">
                  {/* Fondo negro, no un tinte rojo: la ficha ya es gris y el
                      cuadrado teñido se veía como una mancha. */}
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-fondo text-tajiro">
                    <DatoIcon nombre={d.icono} />
                  </span>
                  <div>
                    <h3 className="mb-1 font-semibold text-texto">{d.titulo}</h3>
                    <p className="m-0 text-texto-tenue">{d.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── derecha: formulario ── */}
          <div id="contacto" className="rounded-2xl border border-borde bg-superficie p-6 shadow-2xl sm:p-8">
            <div className="mb-8 flex rounded-lg border border-borde bg-fondo p-1" role="tablist">
              {(
                [
                  ["particular", contacto.pestanas.particular],
                  ["mayorista", contacto.pestanas.mayorista],
                ] as const
              ).map(([clave, texto]) => (
                <button
                  key={clave}
                  type="button"
                  role="tab"
                  aria-selected={pestana === clave}
                  onClick={() => cambiarPestana(clave)}
                  className={`flex-1 rounded-md px-3 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                    pestana === clave ? "bg-superficie-2 text-texto shadow-sm" : "text-texto-tenue hover:text-texto"
                  }`}
                >
                  {texto}
                </button>
              ))}
            </div>

            {pestana === "particular" ? (
              <form key="particular" onSubmit={enviar} noValidate className="grid gap-5">
                <Campo id="nombre" label={contacto.particular.campos.nombre} errores={errores} autoComplete="name" />
                <Campo
                  id="vehiculo"
                  label={contacto.particular.campos.vehiculo}
                  ejemplo={contacto.particular.campos.vehiculoEjemplo}
                  errores={errores}
                />
                <Area
                  id="consulta"
                  label={contacto.particular.campos.consulta}
                  ejemplo={contacto.particular.campos.consultaEjemplo}
                  errores={errores}
                />
                <Boton texto={contacto.particular.boton} via="whatsapp" />
              </form>
            ) : (
              <form key="mayorista" onSubmit={enviar} noValidate className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Campo id="nombre" label={contacto.mayorista.campos.nombre} errores={errores} autoComplete="name" />
                  <Campo
                    id="telefono"
                    label={contacto.mayorista.campos.telefono}
                    tipo="tel"
                    autoComplete="tel"
                    errores={errores}
                  />
                </div>

                <Campo
                  id="email"
                  label={contacto.mayorista.campos.email}
                  tipo="email"
                  autoComplete="email"
                  errores={errores}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Campo id="razonSocial" label={contacto.mayorista.campos.razonSocial} errores={errores} />
                  <Campo id="nombreFantasia" label={contacto.mayorista.campos.nombreFantasia} errores={errores} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Lista
                    id="provincia"
                    label={contacto.mayorista.campos.provincia}
                    vacio={contacto.mayorista.campos.provinciaVacio}
                    opciones={contacto.provincias}
                    errores={errores}
                  />
                  <Campo id="ciudad" label={contacto.mayorista.campos.ciudad} errores={errores} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Lista
                    id="categoriaIva"
                    label={contacto.mayorista.campos.categoriaIva}
                    vacio={contacto.mayorista.campos.categoriaIvaVacio}
                    opciones={contacto.categoriasIva}
                    errores={errores}
                  />
                  <Campo
                    id="cuit"
                    label={contacto.mayorista.campos.cuit}
                    ejemplo={contacto.mayorista.campos.cuitEjemplo}
                    errores={errores}
                  />
                </div>

                <Lista
                  id="taller"
                  label={contacto.mayorista.campos.taller}
                  vacio={contacto.mayorista.campos.tallerVacio}
                  opciones={contacto.opcionesTaller}
                  errores={errores}
                />

                <Area
                  id="comentarios"
                  label={contacto.mayorista.campos.comentarios}
                  ejemplo={contacto.mayorista.campos.comentariosEjemplo}
                  errores={errores}
                />

                <Boton
                  texto={contacto.mayorista.boton}
                  via="mail"
                  enviando={enviando}
                  textoEnviando={contacto.mensajes.enviando}
                />
              </form>
            )}

            <div role="status" className="mt-4 space-y-2">
              {estado && <p className="m-0 text-[13.5px] font-medium leading-relaxed text-texto">{estado}</p>}

              {rescate && (
                <a
                  href={rescate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-texto underline underline-offset-4 hover:text-tajiro"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {contacto.mensajes.salidaWhatsapp}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
