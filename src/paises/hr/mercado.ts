import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "hr",
  pais: "HR",
  nombre: "Hrvatska",
  locale: "hr-HR",
  idioma: "hr",
  // ADR 0002, D27: «vi» en minúscula con imperativo de 2.ª del plural, como Porezna uprava y los bancos.
  trato: "usted",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Zagreb",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 0.9,
};
