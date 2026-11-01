import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "ee",
  pais: "EE",
  nombre: "Eesti",
  locale: "et-EE",
  idioma: "et",
  // ADR 0002, D33: «sina», como la mayoría de los bancos estonios en su web.
  trato: "tu",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Tallinn",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 0.9,
};
