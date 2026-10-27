import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "lr",
  pais: "LR",
  nombre: "Liberia",
  locale: "en-LR",
  idioma: "en",
  trato: "tu",
  monedas: ["LRD", "USD"],
  zonaHoraria: "Africa/Monrovia",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  simbolos: { LRD: "L$" },
  escala: 200,
  unidades: "imperial",
};
