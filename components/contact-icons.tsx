/**
 * Íconos del bloque de contacto, dibujados a mano en el mismo lenguaje que los
 * de los pilares: trazo de 1,5px, sin relleno.
 *
 * El de WhatsApp va aparte porque es un logotipo: se dibuja macizo, con su
 * silueta reconocible, no de línea.
 */

export type NombreDato = "mapa" | "telefono" | "mail" | "reloj"

const trazo = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
} as const

export function DatoIcon({ nombre }: { nombre: NombreDato }) {
  switch (nombre) {
    case "mapa":
      return (
        <svg {...trazo}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    case "telefono":
      return (
        <svg {...trazo}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
        </svg>
      )
    case "mail":
      return (
        <svg {...trazo}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 6 10-6" />
        </svg>
      )
    case "reloj":
      return (
        <svg {...trazo}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
  }
}

/** Logotipo de WhatsApp. */
export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2.1 22l5.34-1.4a9.82 9.82 0 0 0 4.6 1.17h.01c5.43 0 9.85-4.42 9.85-9.86A9.8 9.8 0 0 0 19 4.87 9.78 9.78 0 0 0 12.04 2zm5.76 15.62a8.17 8.17 0 0 1-5.76 2.39h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.15 8.15 0 0 1-1.25-4.35c0-4.52 3.68-8.2 8.2-8.2a8.14 8.14 0 0 1 5.8 2.41 8.13 8.13 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.2 8.19z" />
    </svg>
  )
}
