import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "si",
  pais: "SI",
  nombre: "Slovenija",
  locale: "sl-SI",
  idioma: "sl",
  // ADR 0002, D32: vikanje con «vi» en minúscula, como FURS y los bancos.
  trato: "usted",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Ljubljana",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 0.9,
};
