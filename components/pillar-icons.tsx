/**
 * Los íconos de los pilares, dibujados a mano en el mismo lenguaje que el
 * despiece: trazo de 1,5px, terminaciones rectas, sin relleno (DESIGN.md §3).
 *
 * Hay más íconos definidos que pilares: los que quedan sueltos están para
 * cuando cambie el mensaje de alguna tarjeta. Cuál usa cada pilar se elige
 * con el campo `icono` en content/tajiro.ts.
 *
 * NO reemplazar por Lucide ni por otro set genérico: el documento de diseño lo
 * prohíbe explícitamente para esta sección. Lucide sí se usa para la interfaz
 * (lupa del buscador, menú), que es otra cosa.
 *
 * El único ícono con color es la bandera de Japón: el círculo va en rojo. Ese
 * punto es el que enlaza el color oficial con la dirección visual, y por eso
 * conviene que sea el primero que ve la persona en esta sección.
 */

export type NombreIcono = "japon" | "argentina" | "yunque" | "lupa" | "llave"

const comun = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  "aria-hidden": true,
  focusable: "false",
} as const

export function PillarIcon({ nombre }: { nombre: NombreIcono }) {
  switch (nombre) {
    case "japon":
      return (
        <svg {...comun}>
          <rect x="6" y="12" width="36" height="24" />
          <circle cx="24" cy="24" r="7" fill="var(--color-tajiro)" stroke="none" />
          <circle cx="24" cy="24" r="7" />
        </svg>
      )

    /* El mapa no es una silueta dibujada a ojo: los puntos salen de pasar
       latitudes y longitudes reales a la caja de 48x48, con
         x = 14.5 + (73.6 - lon) * 0.95
         y = 5.0  + (lat - 21.8) * 1.231
       Por eso se reconocen la punta de Misiones, la panza de Buenos Aires y
       el arco de la cordillera. Va sin Tierra del Fuego a propósito: al
       tamaño real del ícono queda del porte de una mota de polvo y se lee
       como suciedad, no como una isla. */
    case "argentina":
      return (
        <svg {...comun} strokeLinejoin="round">
          {/* El agrandado va como transformación y no tocando los números del
              trazado, para que las coordenadas sigan siendo las geográficas.
              Un mapa alto y flaco ocupa mucha menos superficie que un dibujo
              cuadrado del mismo alto, y al lado de los otros tres se ve chico:
              medido, el 34% de la caja contra un 49% de promedio.

              `non-scaling-stroke` es lo que evita que el agrandado engorde
              también la línea. Sin eso este ícono saldría con trazo más grueso
              que los demás, y DESIGN.md §3 fija 1,5px para todos. */}
          <g transform="translate(24 24) scale(1.13) translate(-24 -24)">
            <path
              vectorEffect="non-scaling-stroke"
              d="M21 5.3L24.8 5.4L27 7.5L29.7 9.7L32.6 9.6L33.4 12L29.7 15.3L28.9 20L30.5 22.8L25.2 25.8L24.8 28.6L22.8 30.8L20.3 34.7L19.4 39.7L19.3 42.6L16 42.2L14.6 38.5L16.2 34.8L16.2 29.9L17 23.7L17.9 18.8L18.4 12.6L19.4 7.7Z"
            />
          </g>
        </svg>
      )

    /* Ya no se usa: el pilar que lo llevaba pasó a hablar de cobertura y
       quedó con el mapa. Se deja por si vuelve un pilar sobre resistencia. */
    case "yunque":
      return (
        <svg {...comun} strokeLinejoin="miter">
          <path d="M5 19c3-3 6-4 9-4h24v9H14c-3 0-6-2-9-5z" />
          <path d="M18 24l3 8M34 24l-3 8" />
          <path d="M21 32h10l4 8H17z" />
        </svg>
      )

    case "lupa":
      return (
        <svg {...comun} strokeLinecap="square">
          <circle cx="20" cy="20" r="13" />
          <path d="M30 30l12 12" />
          <path d="M14 20h12M20 14v12" />
        </svg>
      )

    case "llave":
      return (
        <svg {...comun} strokeLinejoin="miter">
          <path d="M34 8a10 10 0 0 0-12 13L9 34a4 4 0 0 0 5 5l13-13a10 10 0 0 0 13-12l-7 7-6-6z" />
          <path d="M12 36h.01" />
        </svg>
      )
  }
}
