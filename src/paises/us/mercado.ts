import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "us",
  pais: "US",
  nombre: "United States",
  locale: "en-US",
  idioma: "en",
  trato: "tu",
  monedas: ["USD"],
  zonaHoraria: "America/New_York",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 1,
  unidades: "imperial",
};
