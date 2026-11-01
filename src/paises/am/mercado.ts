import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "am",
  pais: "AM",
  nombre: "Հայաստան",
  locale: "hy-AM",
  idioma: "hy",
  // ADR 0002, D30: Դուք con mayúscula, el registro de los bancos y servicios.
  trato: "usted",
  monedas: ["AMD"],
  zonaHoraria: "Asia/Yerevan",
  estado: "interno",
  // El dram se usa sin decimales: nóminas, facturas y precios no llevan luma.
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  escala: 400,
};
