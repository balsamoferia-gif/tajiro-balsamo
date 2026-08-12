/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mismo esquema que Aequipe: la web se publica como sitio estático.
  output: 'export',

  // Consecuencia de `output: 'export'`: Next no puede achicar las imágenes al
  // vuelo, así que se sirven tal cual están en public/. Por eso las de
  // public/images ya vienen redimensionadas a medida (900×600 las fichas,
  // 1500×1000 el hero). Los originales de 5472×3648 viven en Assests/ y no
  // se publican. No poner acá una foto sin achicarla antes.
  images: {
    unoptimized: true,
  },
}

export default nextConfig
