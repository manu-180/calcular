import type { Mercado } from "@/motor/tipos";

// es-CR agrupa los miles con espacio («₡268 731,31») y los decretos con punto («¢268.731,31»).
// Se deja es-CR porque el locale alimenta el hreflang; el parseo acepta las dos formas.
export const mercado: Mercado = {
  codigo: "cr",
  pais: "CR",
  nombre: "Costa Rica",
  locale: "es-CR",
  idioma: "es",
  trato: "usted",
  monedas: ["CRC"],
  zonaHoraria: "America/Costa_Rica",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
};
