import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "it",
  pais: "IT",
  nombre: "Italia",
  locale: "it-IT",
  idioma: "it",
  trato: "tu",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Rome",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 1,
};
