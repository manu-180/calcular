import type { Mercado } from "@/motor/tipos";

// Árabe con cifras occidentales y calendario gregoriano (ADR 0002, D10). Los sueldos se pagan sobre todo
// en شيكل; el dólar va como segunda moneda.
export const mercado: Mercado = {
  codigo: "ps",
  pais: "PS",
  nombre: "فلسطين",
  locale: "ar-PS-u-ca-gregory-nu-latn",
  idioma: "ar",
  trato: "usted",
  monedas: ["ILS", "USD"],
  zonaHoraria: "Asia/Hebron",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 3.5,
};
