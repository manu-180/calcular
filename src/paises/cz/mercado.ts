import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "cz",
  pais: "CZ",
  nombre: "Česko",
  locale: "cs-CZ",
  idioma: "cs",
  trato: "usted",
  monedas: ["CZK"],
  zonaHoraria: "Europe/Prague",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 22,
};
