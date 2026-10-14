import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "at",
  pais: "AT",
  nombre: "Österreich",
  locale: "de-AT",
  idioma: "de",
  trato: "usted",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Vienna",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 1,
};
