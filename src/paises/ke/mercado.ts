import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "ke",
  pais: "KE",
  nombre: "Kenya",
  locale: "en-KE",
  idioma: "en",
  trato: "tu",
  monedas: ["KES"],
  zonaHoraria: "Africa/Nairobi",
  estado: "interno",
  regiones: [
    { id: "cities", nombre: "Nairobi, Mombasa, Kisumu, Nakuru and Eldoret" },
    { id: "municipalities", nombre: "Former municipalities of Mavoko, Ruiru and Limuru" },
    { id: "other", nombre: "All other areas" },
  ],
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 130,
};
