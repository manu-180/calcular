import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "al",
  pais: "AL",
  nombre: "Shqipëri",
  locale: "sq-AL",
  idioma: "sq",
  // ADR 0002, D31: «ju» en minúscula con 2.ª del plural, el registro de e-Albania y Tatime.
  trato: "usted",
  monedas: ["ALL"],
  zonaHoraria: "Europe/Tirane",
  estado: "interno",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  escala: 90,
};
