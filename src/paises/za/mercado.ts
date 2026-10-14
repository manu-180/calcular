import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "za",
  pais: "ZA",
  nombre: "South Africa",
  locale: "en-ZA",
  idioma: "en",
  trato: "tu",
  monedas: ["ZAR"],
  zonaHoraria: "Africa/Johannesburg",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 18,
};
