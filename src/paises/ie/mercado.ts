import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "ie",
  pais: "IE",
  nombre: "Ireland",
  locale: "en-IE",
  idioma: "en",
  trato: "tu",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Dublin",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 1,
};
