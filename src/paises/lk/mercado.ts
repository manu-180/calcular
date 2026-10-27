import type { Mercado } from "@/motor/tipos";

// El IRD, el Department of Labour y los bancos escriben «Rs. 150,000»; Intl pone «LKR 150,000.00».
export const mercado: Mercado = {
  codigo: "lk",
  pais: "LK",
  nombre: "Sri Lanka",
  locale: "en-LK",
  idioma: "en",
  trato: "tu",
  monedas: ["LKR"],
  zonaHoraria: "Asia/Colombo",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  simbolos: { LKR: "Rs." },
  escala: 300,
};
