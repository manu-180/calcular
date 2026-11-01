import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "ba",
  pais: "BA",
  nombre: "Bosna i Hercegovina",
  locale: "bs-BA",
  idioma: "bs",
  trato: "usted",
  monedas: ["BAM"],
  zonaHoraria: "Europe/Sarajevo",
  estado: "interno",
  regiones: [
    { id: "fbih", nombre: "Federacija BiH" },
    { id: "rs", nombre: "Republika Srpska" },
    { id: "brcko", nombre: "Brčko distrikt" },
  ],
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 2,
};
