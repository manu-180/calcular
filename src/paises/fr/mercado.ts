import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "fr",
  pais: "FR",
  nombre: "France",
  locale: "fr-FR",
  idioma: "fr",
  trato: "usted",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Paris",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 1,
};
