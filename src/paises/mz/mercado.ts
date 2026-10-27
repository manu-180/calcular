import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "mz",
  pais: "MZ",
  nombre: "Moçambique",
  locale: "pt-MZ",
  idioma: "pt",
  trato: "usted",
  monedas: ["MZN"],
  zonaHoraria: "Africa/Maputo",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 64,
  simbolos: { MZN: "MT" },
};
