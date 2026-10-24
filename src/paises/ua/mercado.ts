import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "ua",
  pais: "UA",
  nombre: "Україна",
  locale: "uk-UA",
  idioma: "uk",
  trato: "usted",
  monedas: ["UAH"],
  zonaHoraria: "Europe/Kyiv",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 40,
};
