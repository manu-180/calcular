import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "fi",
  pais: "FI",
  nombre: "Suomi",
  locale: "fi-FI",
  idioma: "fi",
  trato: "tu",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Helsinki",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 0.9,
};
