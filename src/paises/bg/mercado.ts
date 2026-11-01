import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "bg",
  pais: "BG",
  nombre: "България",
  locale: "bg-BG",
  idioma: "bg",
  // ADR 0002, D24: un solo registro, 2.ª del plural con «Вие» en mayúscula.
  trato: "usted",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Sofia",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 0.9,
};
