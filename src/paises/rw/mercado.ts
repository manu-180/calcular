import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "rw",
  pais: "RW",
  nombre: "Rwanda",
  locale: "en-RW",
  idioma: "en",
  trato: "tu",
  monedas: ["RWF"],
  // Intl escribe "RF" para en-RW; RSSB y el BNR escriben RWF.
  simbolos: { RWF: "RWF" },
  zonaHoraria: "Africa/Kigali",
  estado: "publicado",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  escala: 1450,
};
