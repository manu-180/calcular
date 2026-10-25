import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "se",
  pais: "SE",
  nombre: "Sverige",
  locale: "sv-SE",
  idioma: "sv",
  trato: "tu",
  monedas: ["SEK"],
  zonaHoraria: "Europe/Stockholm",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 10,
};
