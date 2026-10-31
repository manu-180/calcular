import type { Mercado } from "@/motor/tipos";

// Árabe con cifras latinas y calendario gregoriano (ADR 0002, D10). Los textos legales de Mauritania
// (CGI, Code du travail, decretos de la CNSS y la CNAM) se publican en francés; el sitio va en árabe
// con el vocabulario administrativo que se usa en el país.
export const mercado: Mercado = {
  codigo: "mr",
  pais: "MR",
  nombre: "موريتانيا",
  locale: "ar-MR-u-ca-gregory-nu-latn",
  idioma: "ar",
  trato: "usted",
  monedas: ["MRU"],
  zonaHoraria: "Africa/Nouakchott",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 40,
};
