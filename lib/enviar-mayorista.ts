/**
 * Envío del formulario de ventas mayoristas por EmailJS, igual que Aequipe.
 *
 * ── POR QUÉ EMAILJS NO SE IMPORTA ACÁ ARRIBA ───────────────────────────────
 *
 * La librería de EmailJS lee `localStorage` apenas se carga. Si el navegador
 * lo tiene bloqueado —modo privado, configuración de cookies estricta, una
 * webview embebida— tira un error, y como el import está al principio del
 * archivo ese error se lleva puesta LA PÁGINA ENTERA: no se ve ni el banner.
 *
 * Por eso se carga recién adentro de la función, cuando alguien realmente
 * aprieta "Enviar". Ahí un error queda contenido en el formulario, que ya
 * sabe mostrarlo y ofrecer WhatsApp. De paso, quien nunca usa el formulario
 * mayorista no se descarga la librería.
 *
 * ── POR QUÉ LOS NOMBRES DE LOS CAMPOS SE TRADUCEN ──────────────────────────
 *
 * En la página los campos se llaman en castellano (razonSocial, categoriaIva…)
 * porque así se leen mejor en content/tajiro.ts. Pero la plantilla de EmailJS
 * de Aequipe espera los nombres que usa Aequipe (companyName, vatCategory…).
 *
 * Acá se traducen antes de mandar. Así, si TAJIRO apunta a LA MISMA plantilla
 * de EmailJS que Aequipe, el mail llega completo sin tocar nada.
 *
 * ── LO QUE VIAJA TIENE QUE SER IDÉNTICO A LO DE AEQUIPE ────────────────────
 *
 * Aequipe manda esto:
 *
 *     { ...datos, form_type: "Empresa", from_name: "Aequipe" }
 *
 * Dos detalles que parecen menores y no lo son:
 *
 *  · `form_type` vale "Empresa", NO "Mayorista". Es la palabra con la que la
 *    plantilla decide qué mail armar. Con cualquier otra, no reconoce el
 *    formulario.
 *
 *  · Aequipe manda TODOS los campos, incluso los que quedaron vacíos, porque
 *    usa `...datos` sin filtrar. Si un campo no viaja, la plantilla se queda
 *    sin esa variable — y si es una de las que usa para armar el destinatario
 *    o el asunto, el envío falla entero, no sale un mail incompleto.
 *
 * Lo único que NO se copia es `from_name`: ahí va "TAJIRO", que es el nombre
 * que tiene que aparecer como remitente. Poner "Aequipe" en los mails de
 * TAJIRO sería copiar de más.
 */
const TRADUCCION: Record<string, string> = {
  nombre: "name",
  telefono: "phone",
  email: "email",
  razonSocial: "companyName",
  nombreFantasia: "tradeName",
  provincia: "province",
  ciudad: "city",
  categoriaIva: "vatCategory",
  cuit: "cuit",
  taller: "hasShop",
  comentarios: "companycomment",
}

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

/** ¿Están cargadas las tres credenciales? */
export function hayEmailConfigurado() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)
}

export async function enviarMayoristaPorMail(datos: FormData) {
  if (!hayEmailConfigurado()) {
    throw new Error(
      "Faltan las credenciales de EmailJS. Ver .env.local.example en la raíz del proyecto.",
    )
  }

  /* Se arranca con los once campos en blanco y después se completan. Así
     siempre viajan los once, aunque la persona haya dejado alguno vacío —
     igual que el `...datos` de Aequipe. */
  const cuerpo: Record<string, string> = {}
  for (const nombreAequipe of Object.values(TRADUCCION)) cuerpo[nombreAequipe] = ""

  for (const [clave, valor] of datos.entries()) {
    cuerpo[TRADUCCION[clave] ?? clave] = String(valor).trim()
  }

  cuerpo.form_type = "Empresa"
  cuerpo.from_name = "TAJIRO"

  const { default: emailjs } = await import("@emailjs/browser")
  await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, cuerpo, PUBLIC_KEY!)
}
