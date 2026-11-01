import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "ge",
  pais: "GE",
  nombre: "საქართველო",
  locale: "ka-GE",
  idioma: "ka",
  // ADR 0002, D26: «თქვენ» con formas corteses, como rs.ge, TBC y Bank of Georgia.
  trato: "usted",
  monedas: ["GEL"],
  zonaHoraria: "Asia/Tbilisi",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 3,
};
