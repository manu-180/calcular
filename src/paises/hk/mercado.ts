import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "hk",
  pais: "HK",
  nombre: "Hong Kong",
  locale: "en-HK",
  idioma: "en",
  trato: "tu",
  monedas: ["HKD"],
  zonaHoraria: "Asia/Hong_Kong",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 8,
};
