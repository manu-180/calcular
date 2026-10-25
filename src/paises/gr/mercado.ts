import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "gr",
  pais: "GR",
  nombre: "Ελλάδα",
  locale: "el-GR",
  idioma: "el",
  trato: "usted",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Athens",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 0.9,
};
