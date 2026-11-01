import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "sk",
  pais: "SK",
  nombre: "Slovensko",
  locale: "sk-SK",
  idioma: "sk",
  trato: "usted",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Bratislava",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 0.9,
};
