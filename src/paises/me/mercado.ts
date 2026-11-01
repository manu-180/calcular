import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "me",
  pais: "ME",
  nombre: "Crna Gora",
  // ADR 0002, D23: el motor no tiene montenegrino aparte. Idioma sr, latinica declarada y textos
  // locales en ijekavski, que reglas_idioma permite solo con un locale terminado en -ME.
  locale: "sr-Latn-ME",
  idioma: "sr",
  trato: "usted",
  monedas: ["EUR"],
  // Sin Intl propio: «€» detrás del número, como lo da sr-Latn-ME y como escriben los organismos.
  zonaHoraria: "Europe/Podgorica",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 0.9,
};
