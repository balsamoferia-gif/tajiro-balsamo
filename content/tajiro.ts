/* ===========================================================================
 *
 *   TAJIRO - TODO EL CONTENIDO DE LA PAGINA
 *
 *   Este es el unico archivo que hay que tocar para cambiar textos, fotos y
 *   links. No hay codigo de diseno aca adentro: si cambias algo, no podes
 *   romper el layout.
 *
 *   -- COMO EDITAR ---------------------------------------------------------
 *
 *   Los textos van entre comillas.        titulo: "Frenos"
 *   Las fotos son la ruta del archivo.    foto: "/images/familias/frenos.jpg"
 *   Los links son la direccion.           href: "#contacto"
 *
 *   Lo que va entre **dobles asteriscos** sale en rojo.
 *   El simbolo \n corta la linea.
 *
 *   Para agregar una familia, un pilar o una diapositiva, copia un bloque
 *   entero (desde una llave { hasta su llave },) y pegalo debajo. Para sacar
 *   uno, borralo entero. La pagina se acomoda sola.
 *
 *   -- REGLAS DE MARCA QUE NO SE TOCAN (ver DESIGN.md) ---------------------
 *
 *   - El slogan es exactamente "Para tu Nissan, TAJIRO". No se reformula.
 *   - Balsamo va SIN acento.
 *   - TAJIRO siempre en mayusculas.
 *   - Los codigos de producto siempre en MAYUSCULAS.
 *   - No usar la palabra "ignorar" en ninguna copy.
 *   - De Balsamo se dice "mas de 60 anos de trayectoria", sin ano de fundacion.
 *   - Nunca dar a entender vinculo oficial con Nissan.
 *
 *   -- SI AGREGAS UNA FOTO NUEVA -------------------------------------------
 *
 *   Achicala antes de ponerla en public/images. El sitio se publica estatico
 *   y no achica las fotos solo: la que subas es la que se baja el visitante.
 *
 *     Ficha de familia .... 900x600, JPG
 *     Acceso rapido ....... 1200x800, JPG
 *     Banner del hero ..... ~1600px de ancho, WEBP con fondo recortado
 *
 * ======================================================================== */

/* ----------------------------------------------------------- LA MARCA -- */

export const marca = {
  nombre: "TAJIRO",
  slogan: "Para tu Nissan, TAJIRO",
  distribuidor: "Balsamo",

  /* Logotipo de la barra de arriba. Para cambiarlo, dejá el archivo nuevo en
     public/images y cambiá el nombre acá.
     OJO: el archivo entregado usa el rojo #DD0031, y el rojo oficial de la
     marca es #C8102C. Ver README. */
  logo: "/images/logo-tajiro.png",
  logoAncho: 534,
  logoAlto: 135,
  trayectoria: "Más de 60 años de trayectoria",
  pais: "Argentina",

  /* El título principal de la página, el que Google toma como "de qué se
     trata esto". NO se ve en pantalla: el titular grande que se lee es el del
     banner, que va cambiando solo. Este es fijo justamente por eso — si
     dependiera del banner, cambiaría de tema cada 7 segundos. */
  tituloH1: "TAJIRO — Repuestos para vehículos Nissan",

  /* Aparece en la pestaña del navegador y en Google. Google corta alrededor de
     los 60 caracteres: de ahí en adelante se ve "…" y se pierde. */
  tituloSEO: "TAJIRO — Repuestos para vehículos Nissan | Córdoba",
  descripcionSEO:
    "TAJIRO es la línea de repuestos desarrollada exclusivamente para vehículos Nissan: frenos, embrague, suspensión, transmisión, encendido y más. Distribuida por Balsamo, con más de 60 años de trayectoria.",

  /* Cambiar por el dominio real antes de publicar. */
  sitio: "https://tajiro.com.ar/",

  /* La imagen que se ve cuando alguien pega el link en WhatsApp, Facebook o
     LinkedIn. Va en JPG y en 1200x630: es la medida que esperan las redes, y
     el JPG lo muestran todas (el WEBP a veces no). Se rehace con
     scripts/preparar-compartir.mjs. */
  fotoCompartir: "/images/compartir.jpg",
}

/* ------------------------------------------------------- EL NEGOCIO -- */

/* Los mismos datos de contacto que se ven en pantalla, pero escritos como los
   entiende Google. Con esto la empresa puede aparecer en el mapa.
 *
 * OJO: esto es el gemelo de `contacto.datos`, más abajo. Si cambia el horario
 * o la dirección hay que tocarlo en los DOS lados — uno es el que lee la
 * persona y el otro el que lee el buscador.
 *
 * El negocio es BALSAMO, no TAJIRO: la dirección y el teléfono son los del
 * distribuidor. TAJIRO es la marca que vende. Por eso se declaran como dos
 * cosas distintas y enlazadas, que es la verdad. */

export const negocio = {
  nombre: "Balsamo",
  calle: "Av. Circunvalación y Rancagua",
  ciudad: "Córdoba",
  provincia: "Córdoba",
  codigoPostal: "5012",
  pais: "AR",
  telefono: "+543514929000",
  email: "balsamo@balsamo.com.ar",

  /* Los días van con las dos primeras letras en inglés, que es como los pide
     el formato: Mo Tu We Th Fr Sa Su. Las horas en 24 hs. */
  horarios: [{ dias: ["Mo", "Tu", "We", "Th", "Fr"], desde: "08:00", hasta: "17:00" }],
}

/* ------------------------------------------------- LINKS QUE SE REPITEN -- */
/* Cambiándolos acá se actualizan en toda la página de una sola vez.         */

export const links = {
  /* PENDIENTE: poner la dirección real de InfoBal cuando se defina el acceso. */
  infobal: "#aplicacion",
  contacto: "#contacto",
  familias: "#familias",
}

/* ------------------------------------------------- BARRA DE NAVEGACIÓN -- */

export const navegacion = {
  /* El botón rojo de la derecha. */
  botonAsesor: "CONSULTÁ CON UN ASESOR",

  /* Los links de texto. Para sacar uno, borrá su línea. */
  enlaces: [
    { texto: "LA MARCA", href: "#marca" },
    { texto: "NÚMEROS", href: "#numeros" },
    { texto: "POR QUÉ TAJIRO", href: "#pilares" },
    { texto: "FAMILIAS", href: "#familias" },
  ],
}

/* ------------------------------------------------------------ EL HERO -- */
/* Las diapositivas grandes de arriba. Rotan solas, y se cambian            */
/* arrastrando con el mouse o con el dedo.                                  */
/* La primera es la más importante: es la que ve todo el mundo.             */

export const hero = {
  segundosPorDiapositiva: 7,

  /* Botones del banner. En true vuelven a aparecer. */
  mostrarBotones: false,

  /* Cuántos píxeles hay que arrastrar para que cambie la diapositiva. */
  pixelesParaCambiar: 60,

  diapositivas: [
    {
      titulo: "PARA TU NISSAN,\n**TAJIRO**",
      bajada: "La única marca desarrollada\nexclusivamente para vehículos Nissan.",
      botonPrincipal: { texto: "CONSULTÁ CON UN ASESOR", href: links.contacto },
      botonSecundario: { texto: "BUSCÁ TU APLICACIÓN", href: "#aplicacion" },
      /* Dos fotos: una para computadora y otra para celular. Pueden ser la
         misma. Van SIEMPRE preparadas con scripts/preparar-banner.mjs: una
         foto puesta tal cual se ve como un recuadro sobre el fondo oscuro.
         Ver el README, "Cómo entregar una foto para el banner". */
      fotoDesktop: "/images/hero-familias.webp",
      fotoMobile: "/images/hero-familias.webp",
      fotoAlt:
        "Kit de embrague, maza de rueda, filtro, termostato y soporte TAJIRO junto a la caja roja con el dragón de la marca.",
    },
    {
      titulo: "NO VENDEMOS TODO.\nVENDEMOS **LO QUE SABEMOS.**",
      bajada: "Una sola línea, un solo foco.\nPor eso conocemos cada aplicación que ofrecemos.",
      botonPrincipal: { texto: "VER LAS FAMILIAS", href: links.familias },
      botonSecundario: { texto: "POR QUÉ TAJIRO", href: "#pilares" },
      fotoDesktop: "/images/hero-mantenimiento.webp",
      fotoMobile: "/images/hero-mantenimiento.webp",
      fotoAlt:
        "Kit de distribución, filtro de aire, filtro de aceite y filtro de combustible TAJIRO junto a su caja roja.",
    },
    {
      titulo: "CONFIÁ EN LOS\n**ESPECIALISTAS**",
      bajada: "Distribuida por Balsamo,\ncon más de 60 años de trayectoria en el mostrador.",
      botonPrincipal: { texto: "CONSULTÁ CON UN ASESOR", href: links.contacto },
      botonSecundario: { texto: "CONOCÉ LA MARCA", href: "#marca" },
      fotoDesktop: "/images/hero-frenos.webp",
      fotoMobile: "/images/hero-frenos.webp",
      fotoAlt:
        "Discos de freno, bomba de freno y campana TAJIRO junto a su envase rojo con la leyenda «Piezas para vehículos Nissan».",
    },
  ],
}

/* --------------------------------------------------- ACCESOS RÁPIDOS -- */
/* Las dos fichas anchas que van debajo del hero.                          */

/* Cada ficha baja al formulario de contacto y abre su pestaña.
   Las direcciones tienen que ser estas dos: son las que el formulario
   escucha para saber qué pestaña mostrar. */
export const accesos = [
  {
    etiqueta: "VENTA MAYORISTA",
    href: "#contacto-mayorista",
    foto: "/images/promo-aplicacion.jpg",
    fotoAlt: "Bobinas de encendido TAJIRO junto a sus envases rojos.",
  },
  {
    etiqueta: "VENTA MINORISTA",
    href: "#contacto-minorista",
    foto: "/images/promo-familias.jpg",
    fotoAlt: "Kit de embrague TAJIRO: plato, disco, rulemán y cilindro, junto a su envase rojo.",
  },
]

/* -------------------------------------------------- PANEL DE LA MARCA -- */
/* El bloque negro grande con el logotipo.                                  */
/*                                                                          */
/* HOY NO SE MUESTRA. Se sacó de la página. El componente sigue en           */
/* components/brand-panel-section.tsx; para que vuelva a aparecer hay que    */
/* importarlo de nuevo en app/page.tsx.                                      */

export const panelMarca = {
  logotipo: "TAJIRO",
  slogan: "PARA TU NISSAN, **TAJIRO**",
  pie: "PIEZAS PARA VEHÍCULOS NISSAN · DISTRIBUIDO POR BALSAMO",
}

/* ---------------------------------------------------------- LOS NÚMEROS -- */
/* La fila de cifras. El signo + va aparte porque sale en rojo.              */
/*                                                                           */
/* PENDIENTE (DESIGN.md 7): aclarar la unidad de "Ventas diarias" y revisar  */
/* "Años en el mercado" cada año para que no quede desactualizado.           */

export const numeros = {
  titulo: "NÚMEROS **QUE NOS DEFINEN**",
  cifras: [
    { cifra: "300", label: "DISTRIBUIDORES" },
    { cifra: "1.500", label: "REFERENCIAS" },
    { cifra: "7", label: "AÑOS EN EL MERCADO" },
    { cifra: "5.000", label: "VENTAS DIARIAS" },
  ],
}

/* ------------------------------------------------------ SOBRE LA MARCA -- */

export const sobreLaMarca = {
  titulo: "CONFIÁ EN LOS **ESPECIALISTAS**",
  parrafos: [
    "TAJIRO es la única marca del mercado pensada y desarrollada exclusivamente para vehículos Nissan. Nuestra dedicación total a esta línea nos permite ofrecerte repuestos que combinan resistencia, calidad y un funcionamiento asegurado, sin complicaciones.",
    "En TAJIRO simplificamos tu elección: te brindamos productos probados y el respaldo constante de un equipo que conoce a fondo lo que vende, eliminando cualquier duda. Confiá en los especialistas.",
  ],
  /* Última línea, va destacada. */
  firma: "Para tu Nissan, TAJIRO",

  /* La imagen de la derecha. */
  foto: "/images/about-tajiro.webp",
  fotoAlt:
    "Composición de piezas TAJIRO —tapa de distribución, bomba de aceite, kit de embrague, filtros y mangueras— en tono rojo, con el logotipo TAJIRO al centro.",

  /* Las etiquetas del dibujo técnico animado.
     Hoy el dibujo NO se usa: esta sección muestra la imagen de marca en su
     lugar. El componente sigue en components/exploded-drawing.tsx por si se
     quiere recuperar en otra sección. */
  despiece: {
    piezas: ["01 · DISCO DE FRENO", "02 · MAZA", "03 · BULÓN DE RUEDA"],
    nota: "APLICACIÓN VERIFICADA",
  },
}

/* ---------------------------------------------------------- LOS PILARES -- */
/* Las cuatro razones. El "icono" elige qué dibujo va: los cuatro están       */
/* hechos a mano en components/pillar-icons.tsx.                             */
/* Opciones: "japon" | "yunque" | "lupa" | "llave"                           */

export const pilares = [
  {
    icono: "japon" as const,
    titulo: "Especialistas",
    subtitulo: "100% NISSAN",
    texto:
      "Somos la única marca del mercado dedicada exclusivamente a Nissan. Nuestro foco total en esta línea nos permite conocer sus diferentes modelos y ofrecerte las mejores soluciones.",
  },
  {
    icono: "argentina" as const,
    titulo: "Cobertura",
    subtitulo: "CERCA TUYO",
    texto:
      "Trabajamos con repuesteros de referencia en todo el país. No comprás a ciegas: atrás de cada venta hay un local que conoce la marca y responde en tu ciudad.",
  },
  {
    icono: "lupa" as const,
    titulo: "Certeza",
    subtitulo: "SIN EXPERIMENTOS",
    texto:
      "Con TAJIRO vas a lo seguro. Ofrecemos repuestos específicos de excelente terminación y calce perfecto. Elegí la marca que sabe de tu auto.",
  },
  {
    icono: "llave" as const,
    titulo: "Soporte",
    subtitulo: "SOMOS REPUESTEROS",
    texto:
      "Detrás de la web hay expertos reales. Si tenés dudas sobre la compatibilidad, te asesoramos para que compres la pieza exacta.",
  },
]

/* --------------------------------------------------------- LAS FAMILIAS -- */
/* La grilla del catálogo. El número de cada ficha se calcula solo según el   */
/* orden de esta lista: si movés una, se renumera sola.                      */

export const familias = [
  {
    nombre: "Frenos",
    foto: "/images/familias/frenos.jpg",
    fotoAlt: "Discos ventilados, campana y bomba de freno TAJIRO junto a su envase rojo.",
  },
  {
    nombre: "Embrague",
    foto: "/images/familias/embrague.jpg",
    fotoAlt: "Plato, disco, rulemán y cilindro de embrague TAJIRO.",
  },
  {
    nombre: "Suspensión",
    foto: "/images/familias/suspension.jpg",
    fotoAlt: "Parrilla de suspensión y bieleta TAJIRO junto a su envase rojo.",
  },
  {
    nombre: "Transmisión",
    foto: "/images/familias/transmision.jpg",
    fotoAlt: "Semiejes, juntas homocinéticas y fuelles TAJIRO.",
  },
  {
    nombre: "Encendido",
    foto: "/images/familias/encendido.jpg",
    fotoAlt: "Bobinas de encendido TAJIRO junto a sus envases rojos.",
  },
  {
    nombre: "Refrigeración",
    foto: "/images/familias/refrigeracion.jpg",
    fotoAlt: "Bomba de agua, termostato y mangueras de refrigeración TAJIRO.",
  },
  {
    nombre: "Lubricación",
    foto: "/images/familias/lubricacion.jpg",
    fotoAlt: "Bomba de aceite y tapa de distribución TAJIRO.",
  },
  {
    nombre: "Eléctrico",
    foto: "/images/familias/electrico.jpg",
    fotoAlt: "Cuerpo de aceleración, sensores y cinta de airbag TAJIRO.",
  },
  {
    nombre: "Juntas",
    foto: "/images/familias/juntas.jpg",
    fotoAlt: "Junta de tapa de cilindros y juntas de motor TAJIRO.",
  },
  {
    nombre: "Kits",
    foto: "/images/familias/kits.jpg",
    fotoAlt: "Kit de bujes, soportes y topes de goma TAJIRO.",
  },
  {
    nombre: "Cables",
    foto: "/images/familias/cables.jpg",
    fotoAlt: "Cables de comando TAJIRO junto a su envase rojo.",
  },
  {
    nombre: "Carrocería",
    foto: "/images/familias/carroceria.jpg",
    fotoAlt: "Manijas, molduras y piezas plásticas de carrocería TAJIRO.",
  },
  {
    nombre: "Bulones",
    foto: "/images/familias/bulones.jpg",
    fotoAlt: "Bulones y espárragos de rueda TAJIRO junto a su envase rojo.",
  },
  {
    nombre: "Mantenimiento liviano",
    foto: "/images/familias/mantenimiento-liviano.jpg",
    fotoAlt: "Filtros, correas, kit de distribución y escobillas TAJIRO.",
  },
]

export const seccionFamilias = {
  titulo: "NUESTRAS **FAMILIAS**",
}

/* ---------------------------------------------------------- EL CONTACTO -- */
/* Dos formularios en pestañas, como en Aequipe: uno para quien compra suelto
   y otro para casas de repuestos. Los dos abren WhatsApp con los datos ya
   escritos, así que no hace falta ningún servidor para que funcionen.        */

export const contacto = {
  titulo: "CONTACTANOS",
  intro:
    "Estamos acá para ayudarte. Elegí la opción que mejor se adapte a tu perfil y nos ponemos en contacto con vos.",

  /* El WhatsApp al que llegan las dos consultas.
     Va sin el + y sin espacios: código de país, 9, característica y número. */
  whatsapp: "5493513020497",

  /* Los datos de contacto de la izquierda.
     El "icono" elige el dibujo: mapa | telefono | mail | reloj */
  datos: [
    {
      icono: "mapa" as const,
      titulo: "Dirección",
      texto: "Av. Circunvalación y Rancagua, Córdoba - Argentina. CP 5012",
    },
    { icono: "telefono" as const, titulo: "Teléfono", texto: "+54 351 492 9000" },
    { icono: "mail" as const, titulo: "Email", texto: "balsamo@balsamo.com.ar" },
    { icono: "reloj" as const, titulo: "Horarios", texto: "Lun a Vie: 8:00 - 17:00" },
  ],

  pestanas: {
    particular: "Venta particular",
    mayorista: "Ventas mayoristas",
  },

  /* ── Formulario de venta particular ── */
  particular: {
    boton: "CONSULTAR",
    campos: {
      nombre: "Nombre",
      vehiculo: "Modelo y año de tu Nissan",
      vehiculoEjemplo: "Ej.: Frontier 2016",
      consulta: "Qué pieza necesitás",
      consultaEjemplo: "Contanos qué repuesto buscás o cómo podemos ayudarte...",
    },
  },

  /* ── Formulario de ventas mayoristas ── */
  mayorista: {
    boton: "ENVIAR SOLICITUD",
    campos: {
      nombre: "Nombre",
      telefono: "Teléfono",
      email: "Email",
      razonSocial: "Razón Social",
      nombreFantasia: "Nombre de Fantasía",
      provincia: "Provincia",
      provinciaVacio: "Seleccionar provincia",
      ciudad: "Ciudad",
      categoriaIva: "Categoría IVA",
      categoriaIvaVacio: "Seleccionar categoría",
      cuit: "CUIT",
      cuitEjemplo: "XX-XXXXXXXX-X",
      taller: "¿Tenés una casa de repuestos?",
      tallerVacio: "Seleccionar opción",
      comentarios: "Comentarios adicionales",
      comentariosEjemplo: "Contanos un poco sobre tu empresa...",
    },
  },

  /* Los mensajes que ve la persona. Explican qué pasó y cómo seguir. */
  mensajes: {
    campoVacio: "Completá este campo para poder responderte.",
    emailInvalido: "Revisá el correo: falta el @ o el dominio.",
    faltanDatos: "Faltan datos: revisá los campos marcados.",

    /* Venta particular: sale por WhatsApp. */
    abriendo: "Abriendo WhatsApp con tu consulta...",

    /* Ventas mayoristas: sale por mail. */
    enviando: "Enviando la solicitud...",
    enviado: "¡Solicitud enviada! Nuestro equipo comercial se pone en contacto con vos.",
    errorEnvio: "No pudimos enviar la solicitud. Probá de nuevo en un rato.",
    sinConfigurar: "El envío por mail todavía no está configurado en este sitio.",

    /* Si el mail falla, se ofrece WhatsApp como salida — pero con un link que
       la persona decide tocar, no abriéndolo solo. */
    salidaWhatsapp: "Escribinos por WhatsApp con estos datos",
  },

  provincias: [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Ciudad Autónoma de Buenos Aires",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán",
  ],

  categoriasIva: [
    "Responsable Inscripto",
    "Monotributista",
    "Exento",
    "Consumidor Final",
    "Responsable No Inscripto",
  ],

  /* Estas opciones tienen DOS partes, y no es un capricho.
   *
   *   `texto`  es lo que lee la persona en la pantalla.
   *   `valor`  es lo que viaja en el mail.
   *
   * El `valor` es el mismo que usa Aequipe (yes / planning / other), porque
   * las dos marcas mandan a la misma plantilla de EmailJS. Si acá viajara el
   * texto en castellano, el mail de TAJIRO llegaría distinto al de Aequipe y
   * habría que mantener dos plantillas.
   *
   * El texto sí se puede cambiar libremente. El valor NO: tiene que quedar
   * igual al de Aequipe. */
  opcionesTaller: [
    { valor: "yes", texto: "Sí, tengo una casa de repuestos" },
    { valor: "planning", texto: "No, pero planeo abrir una" },
    { valor: "other", texto: "Otro" },
  ],
}

/* --------------------------------------------------------------- EL PIE -- */

/* Cuatro columnas, igual que Aequipe: logotipo, contacto, enlaces rápidos y
   redes con los logos de las marcas del grupo.                              */

export const pie = {
  contacto: {
    titulo: "CONTACTO",
    ubicacion: ["Córdoba", "Argentina"],
    telefono: "+54 351 492 9000",
    email: "balsamo@balsamo.com.ar",
  },

  enlaces: {
    titulo: "ENLACES RÁPIDOS",
    items: [
      { texto: "La marca", href: "#marca" },
      { texto: "Familias", href: links.familias },
      { texto: "Contacto", href: links.contacto },
    ],
  },

  redes: {
    titulo: "SEGUINOS",
    items: [
      { red: "facebook" as const, href: "https://www.facebook.com/tajirorepuestos/" },
      { red: "instagram" as const, href: "https://www.instagram.com/tajirorepuestos/" },
    ],
  },

  /* Las marcas del grupo, como en el pie de Aequipe.
     Cada logo lleva al Instagram de esa marca y abre en una pestaña nueva. */
  marcas: {
    titulo: "Nuestras marcas",
    items: [
      {
        nombre: "Aequipe",
        logo: "/images/marcas/aequipe.webp",
        href: "https://www.instagram.com/aequiperepuestos/",
      },
      {
        nombre: "Kreisen",
        logo: "/images/marcas/kreisen.webp",
        href: "https://www.instagram.com/kreisenrepuestos/",
      },
      {
        nombre: "TAJIRO",
        logo: "/images/marcas/tajiro.webp",
        href: "https://www.instagram.com/tajirorepuestos/",
      },
      {
        nombre: "Oxion",
        logo: "/images/marcas/oxion.webp",
        href: "https://www.instagram.com/balsamosa/",
      },
    ],
  },

  derechos: "Todos los derechos reservados.",

  /* Aclaración legal sobre Nissan. No sacar sin consultar.
     Aequipe no la tiene porque no la necesita; TAJIRO sí. */
  legal:
    "TAJIRO es una línea independiente de repuestos para vehículos Nissan. Las marcas y modelos mencionados se usan únicamente como referencia de aplicación y no implican vínculo, licencia ni representación del fabricante.",
}
