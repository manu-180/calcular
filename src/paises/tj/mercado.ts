import type { Mercado } from "@/motor/tipos";

// Русский: язык межнационального общения в Таджикистане и язык, на котором ищут калькуляторы
// (ADR 0002, D17). Таджикский остается возможной будущей редакцией.
export const mercado: Mercado = {
  codigo: "tj",
  pais: "TJ",
  nombre: "Таджикистан",
  locale: "ru-TJ",
  idioma: "ru",
  trato: "usted",
  monedas: ["TJS"],
  zonaHoraria: "Asia/Dushanbe",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 10,
};
