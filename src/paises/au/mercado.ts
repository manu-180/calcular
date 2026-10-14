import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "au",
  pais: "AU",
  nombre: "Australia",
  locale: "en-AU",
  idioma: "en",
  trato: "tu",
  monedas: ["AUD"],
  zonaHoraria: "Australia/Sydney",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 1.5,
};
