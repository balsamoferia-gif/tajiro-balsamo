import type React from "react"
import type { Metadata } from "next"
import { marca } from "@/content/tajiro"
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
    title: `${marca.nombre} — Repuestos para vehículos Nissan`,
    description: "La única marca desarrollada exclusivamente para vehículos Nissan. Distribuida por Balsamo.",
    images: ["/images/hero-frenos.jpg"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Brand",
              name: marca.nombre,
              slogan: marca.slogan,
              description: "Línea de repuestos desarrollada exclusivamente para vehículos Nissan.",
              url: marca.sitio,
              manufacturer: { "@type": "Organization", name: marca.distribuidor },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
