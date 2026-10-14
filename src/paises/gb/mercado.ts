import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "gb",
  pais: "GB",
  nombre: "United Kingdom",
  locale: "en-GB",
  idioma: "en",
  trato: "tu",
  monedas: ["GBP"],
  zonaHoraria: "Europe/London",
  estado: "interno",
  regiones: [
    { id: "england-wales-ni", nombre: "England, Wales or Northern Ireland" },
    { id: "scotland", nombre: "Scotland" },
  ],
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 1,
};
