import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "bo",
  pais: "BO",
  nombre: "Bolivia",
  locale: "es-BO",
  idioma: "es",
  trato: "usted",
  monedas: ["BOB", "USD"],
  zonaHoraria: "America/La_Paz",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  // En Bolivia el dólar se escribe "$us" (así lo publica el BCB: "Bs 11,52/$us"); Intl pone "USD".
  simbolos: { USD: "$us" },
};
