import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "lv",
  pais: "LV",
  nombre: "Latvija",
  locale: "lv-LV",
  idioma: "lv",
  // ADR 0002, D35: «jūs» en minúscula e imperativo en -iet, como VID.
  trato: "usted",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Riga",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 0.9,
};
