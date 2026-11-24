import type { Mercado } from "@/motor/tipos";

// Árabe con cifras occidentales y calendario gregoriano (ADR 0002, D10). La libra no usa fracciones en
// la práctica desde la crisis: los montos van sin decimales.
export const mercado: Mercado = {
  codigo: "lb",
  pais: "LB",
  nombre: "لبنان",
  locale: "ar-LB-u-ca-gregory-nu-latn",
  idioma: "ar",
  trato: "usted",
  monedas: ["LBP"],
  zonaHoraria: "Asia/Beirut",
  estado: "publicado",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  escala: 90000,
};
