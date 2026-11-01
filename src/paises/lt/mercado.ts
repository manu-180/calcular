import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "lt",
  pais: "LT",
  nombre: "Lietuva",
  locale: "lt-LT",
  idioma: "lt",
  trato: "usted",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Vilnius",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 0.9,
};
