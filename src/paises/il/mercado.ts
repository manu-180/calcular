import type { Mercado } from "@/motor/tipos";

// Hebreo con cifras occidentales y calendario gregoriano (ADR 0002, D22): los plazos de las leyes
// laborales, de רשות המסים y del ביטוח לאומי se cuentan en meses y años gregorianos, como en los
// bancos y en gov.il. Un solo registro (plural inclusivo), por eso trato "usted".
export const mercado: Mercado = {
  codigo: "il",
  pais: "IL",
  nombre: "ישראל",
  locale: "he-IL",
  idioma: "he",
  trato: "usted",
  monedas: ["ILS"],
  zonaHoraria: "Asia/Jerusalem",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 3.5,
};
