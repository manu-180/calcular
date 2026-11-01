import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "et",
  pais: "ET",
  nombre: "Ethiopia",
  locale: "en-ET",
  idioma: "en",
  trato: "tu",
  monedas: ["ETB"],
  zonaHoraria: "Africa/Addis_Ababa",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 150,
};
