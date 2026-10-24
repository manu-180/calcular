import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "tr",
  pais: "TR",
  nombre: "Türkiye",
  locale: "tr-TR",
  idioma: "tr",
  trato: "usted",
  monedas: ["TRY"],
  zonaHoraria: "Europe/Istanbul",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 42,
};
