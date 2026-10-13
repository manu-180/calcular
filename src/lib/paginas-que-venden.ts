// Dónde NO se cargan anuncios, y por qué.
//
// La aritmética (19/9/2026, con ~90 clics/día): un clic en AdSense desde Argentina paga del
// orden de USD 0,02-0,10; una planilla son $14.900 ARS ≈ USD 11. La relación es de ~100 a 1 a
// favor del producto propio, así que en una página que vende, un anuncio que se lleve UNA visita
// cuesta más de lo que TODO el mes de anuncios puede rendir. Y los auto ads de Google eligen
// solos dónde meterse: el anchor de abajo y el in-article compiten justo con el CTA.
//
// Hay un segundo costo, menos medible y más caro: el activo de este sitio es que se lo ve
// confiable —fuentes oficiales, fecha de verificación, la cuenta a la vista—, y en Argentina el
// inventario de display que llena estos espacios es casino, préstamos y clickbait. En la página
// donde alguien decide pagar $14.900, eso es un impuesto a la conversión.
//
// Por eso: los anuncios viven en las páginas informativas (guías, series de datos, inflación),
// donde la visita no tiene intención de compra y el clic hacia afuera no cuesta nada.
//
// LÍMITE CONOCIDO: esto evita que el script se cargue cuando alguien ATERRIZA en una de estas
// páginas, que es como llega el tráfico de buscadores (o sea, casi todo). Si el visitante entra
// por una página con anuncios y navega hacia acá, el script ya está vivo. Cerrar eso del todo se
// hace en el panel de AdSense (excluir estas URLs de los auto ads), y está anotado en el INBOX.

/** Rutas con CTA de producto pago, con sus subrutas: los `[mes]` de un convenio también venden. */
export const RUTAS_QUE_VENDEN = [
  "/planillas",
  "/informes",
  "/convenios/comercio",
  "/dia-del-empleado-de-comercio",
  "/convenios/uocra",
  "/convenios/camioneros",
  "/sueldo-neto/camioneros",
  "/sueldo-neto/comercio",
  "/sueldo-neto/construccion",
  "/blog/aumento-comercio-agosto-2026",
  "/blog/como-calcular-aguinaldo-empleado-de-comercio",
  "/blog/como-liquidar-sueldo-empleado-de-comercio",
  "/blog/modelo-recibo-de-sueldo-empleado-de-comercio",
  "/blog/nuevo-recibo-de-sueldo-2026",
] as const;

/** Rutas que venden sólo en la página misma: `/cuota-alimentaria/[mes]` es la serie mensual, sin CTA,
 *  y apagarle los anuncios por prefijo era regalar ingresos. */
export const RUTAS_QUE_VENDEN_EXACTAS = [
  "/inflacion/alquiler",
  "/cuota-alimentaria",
  "/empleada-domestica",
  "/sueldo-neto",
  "/indemnizacion",
  "/inflacion",
  "/ganancias",
  "/plazo-fijo",
  "/actualizacion-creditos-laborales",
  "/vacaciones",
  "/aguinaldo",
  "/monotributo",
  "/monotributo/recategorizacion",
  "/monotributo/categorias",
  "/obra-social-monotributo",
  "/descuentos-del-sueldo",
  "/salario-minimo",
  "/asignaciones-familiares",
  "/despido-empleada-domestica",
  "/aportes-empleada-domestica",
  "/art-empleada-domestica",
  "/deduccion-empleada-domestica",
] as const;

/** `true` si en esa ruta hay algo a la venta (incluye las subrutas de RUTAS_QUE_VENDEN). */
export function vendeAlgo(pathname: string): boolean {
  const ruta = pathname.replace(/\/+$/, "") || "/";
  if ((RUTAS_QUE_VENDEN_EXACTAS as readonly string[]).includes(ruta)) return true;
  return RUTAS_QUE_VENDEN.some((r) => ruta === r || ruta.startsWith(`${r}/`));
}
