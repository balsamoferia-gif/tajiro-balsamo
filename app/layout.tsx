import type React from "react"
import type { Metadata } from "next"
import { marca, negocio } from "@/content/tajiro"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(marca.sitio),
  title: marca.tituloSEO,
  description: marca.descripcionSEO,
  keywords: [
    "TAJIRO",
    "repuestos Nissan",
    "autopartes Nissan",
    "Balsamo",
    "Argentina",
    "repuestos para Nissan",
  ],
  alternates: { canonical: marca.sitio },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: marca.nombre,
    url: marca.sitio,
    title: `${marca.nombre} — Repuestos para vehículos Nissan`,
    description: "La única marca desarrollada exclusivamente para vehículos Nissan. Distribuida por Balsamo.",
    /* El ancho, el alto y el texto van declarados: sin eso, WhatsApp muestra
       la vista previa chica mientras baja la imagen para medirla. */
    images: [
      {
        url: marca.fotoCompartir,
        width: 1200,
        height: 630,
        alt: `${marca.nombre} — repuestos para vehículos Nissan`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${marca.nombre} — Repuestos para vehículos Nissan`,
    description: "La única marca desarrollada exclusivamente para vehículos Nissan. Distribuida por Balsamo.",
    images: [marca.fotoCompartir],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR">
      <head>
        {/* Allotrope — kit de Adobe Fonts kof1bhb, el mismo que usa Aequipe.
            IMPORTANTE: el dominio de producción tiene que estar cargado en la
            cuenta de Adobe Fonts o las fuentes no se sirven. */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/kof1bhb.css" />

        {/* IBM Plex Mono — rol de datos: códigos, medidas, labels */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        />

        <meta name="theme-color" content="#02070d" />

        {/* La ficha que lee Google. Son DOS cosas enlazadas, no una:
              · TAJIRO es la marca.
              · Balsamo es el negocio, con dirección, teléfono y horarios.
            Mezclarlas sería declarar que TAJIRO atiende en un mostrador, que
            no es lo que pasa. Con la parte de negocio bien puesta es como la
            empresa puede aparecer en el mapa de Google.

            Los datos salen de `negocio`, en content/tajiro.ts, que es el
            gemelo en formato de máquina de lo que se ve en la sección de
            contacto. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Brand",
                  "@id": `${marca.sitio}#marca`,
                  name: marca.nombre,
                  slogan: marca.slogan,
                  description:
                    "Línea de repuestos desarrollada exclusivamente para vehículos Nissan.",
                  url: marca.sitio,
                  logo: new URL(marca.logo, marca.sitio).toString(),
                  image: new URL(marca.fotoCompartir, marca.sitio).toString(),
                  distributor: { "@id": `${marca.sitio}#negocio` },
                },
                {
                  "@type": "AutoPartsStore",
                  "@id": `${marca.sitio}#negocio`,
                  name: negocio.nombre,
                  description: `Distribuidor de repuestos. ${marca.trayectoria}.`,
                  url: marca.sitio,
                  image: new URL(marca.fotoCompartir, marca.sitio).toString(),
                  telephone: negocio.telefono,
                  email: negocio.email,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: negocio.calle,
                    addressLocality: negocio.ciudad,
                    addressRegion: negocio.provincia,
                    postalCode: negocio.codigoPostal,
                    addressCountry: negocio.pais,
                  },
                  openingHoursSpecification: negocio.horarios.map((h) => ({
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: h.dias,
                    opens: h.desde,
                    closes: h.hasta,
                  })),
                  brand: { "@id": `${marca.sitio}#marca` },
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
