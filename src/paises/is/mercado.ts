import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "is",
  pais: "IS",
  nombre: "Ísland",
  locale: "is-IS",
  idioma: "is",
  // ADR 0002, D34: «þú» e imperativo de singular, como Skatturinn y los bancos del país.
  trato: "tu",
  monedas: ["ISK"],
  // Node da «kr.» y Chromium «ISK» para la misma corona: sin esto la página no hidrata.
  simbolos: { ISK: "kr." },
  zonaHoraria: "Atlantic/Reykjavik",
  estado: "publicado",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  escala: 130,
};
