import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "hn",
  pais: "HN",
  nombre: "Honduras",
  locale: "es-HN",
  idioma: "es",
  trato: "usted",
  monedas: ["HNL"],
  zonaHoraria: "America/Tegucigalpa",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
};
