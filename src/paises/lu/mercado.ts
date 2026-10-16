import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "lu",
  pais: "LU",
  nombre: "Luxembourg",
  locale: "fr-LU",
  idioma: "fr",
  trato: "usted",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Luxembourg",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 0.9,
};
