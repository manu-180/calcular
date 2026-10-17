import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "ch",
  pais: "CH",
  nombre: "Schweiz",
  locale: "de-CH",
  idioma: "de",
  trato: "usted",
  monedas: ["CHF"],
  zonaHoraria: "Europe/Zurich",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 0.9,
};
