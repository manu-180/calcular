import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "pt",
  pais: "PT",
  nombre: "Portugal",
  locale: "pt-PT",
  idioma: "pt",
  trato: "usted",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Lisbon",
  estado: "publicado",
  regiones: [
    { id: "continente", nombre: "Continente" },
    { id: "acores", nombre: "Região Autónoma dos Açores" },
    { id: "madeira", nombre: "Região Autónoma da Madeira" },
  ],
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 1,
};
