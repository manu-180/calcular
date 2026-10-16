import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "be",
  pais: "BE",
  nombre: "België",
  locale: "nl-BE",
  idioma: "nl",
  trato: "tu",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Brussels",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 1,
};
