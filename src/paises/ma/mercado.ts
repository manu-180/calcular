import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "ma",
  pais: "MA",
  nombre: "Maroc",
  locale: "fr-MA",
  idioma: "fr",
  trato: "usted",
  monedas: ["MAD"],
  zonaHoraria: "Africa/Casablanca",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 10,
};
