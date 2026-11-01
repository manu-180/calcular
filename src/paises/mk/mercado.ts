import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "mk",
  pais: "MK",
  nombre: "Северна Македонија",
  locale: "mk-MK",
  idioma: "mk",
  // ADR 0002, D36: «вие» con minúscula y 2.ª del plural, como Комерцијална банка.
  trato: "usted",
  monedas: ["MKD"],
  zonaHoraria: "Europe/Skopje",
  estado: "publicado",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  escala: 55,
};
