import { Fragment } from "react"

/**
 * Convierte el texto que viene de content/tajiro.ts en JSX:
 *
 *   **así**  → sale en rojo
 *   \n       → salto de línea
 *
 * Existe para que en el archivo de contenido se pueda escribir
 * "PARA TU NISSAN, **TAJIRO**" sin tener que saber nada de código.
 */
export function Resaltado({ texto }: { texto: string }) {
  const lineas = texto.split("\n")

  return (
    <>
      {lineas.map((linea, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {linea.split(/(\*\*[^*]+\*\*)/g).map((parte, j) =>
            parte.startsWith("**") && parte.endsWith("**") ? (
              <span key={j} className="text-tajiro">
                {parte.slice(2, -2)}
              </span>
            ) : (
              <Fragment key={j}>{parte}</Fragment>
            ),
          )}
        </Fragment>
      ))}
    </>
  )
}

/** La misma idea pero sin JSX: para alt, title y demás atributos de texto. */
export function textoPlano(texto: string) {
  return texto.replace(/\*\*/g, "").replace(/\n/g, " ")
}
