import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "sg",
  pais: "SG",
  nombre: "Singapore",
  locale: "en-SG",
  idioma: "en",
  trato: "tu",
  monedas: ["SGD"],
  zonaHoraria: "Asia/Singapore",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 1.3,
};
