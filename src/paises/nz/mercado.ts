import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "nz",
  pais: "NZ",
  nombre: "New Zealand",
  locale: "en-NZ",
  idioma: "en",
  trato: "tu",
  monedas: ["NZD"],
  zonaHoraria: "Pacific/Auckland",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 1.7,
};
