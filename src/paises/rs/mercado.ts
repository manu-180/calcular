import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "rs",
  pais: "RS",
  nombre: "Srbija",
  // ADR 0002, D23: un «sr-RS» a secas daría cirílico en Intl. La latinica tiene que ir declarada.
  locale: "sr-Latn-RS",
  idioma: "sr",
  // ADR 0002, D23: «vi» en minúscula con imperativo de 2.ª del plural, como bancos y eUprava.
  trato: "usted",
  monedas: ["RSD"],
  zonaHoraria: "Europe/Belgrade",
  estado: "publicado",
  // Los obračuni de zarada y el PDV se llevan con para, de ahí los dos decimales.
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 100,
};
