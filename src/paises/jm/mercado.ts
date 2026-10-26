import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "jm",
  pais: "JM",
  nombre: "Jamaica",
  locale: "en-JM",
  idioma: "en",
  trato: "tu",
  monedas: ["JMD"],
  simbolos: { JMD: "J$" },
  zonaHoraria: "America/Jamaica",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 160,
};
