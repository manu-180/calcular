import type { Idioma } from "../tipos";

// Slug de «Sueldos reales» por idioma, igual en todas las ediciones de un idioma (como SLUG_MUNDO).
// check_sueldos falla si alguno choca con una calculadora o una página del registro.
export const SLUG_SUELDOS: Record<Idioma, string> = {
  es: "sueldos-reales",
  pt: "salarios-reais",
  en: "real-salaries",
  fr: "salaires-reels",
  de: "echte-gehaelter",
  it: "stipendi-reali",
  nl: "echte-salarissen",
  ja: "jissai-no-kyuyo",
  ko: "silje-yeonbong",
  zh: "zhenshi-xinzi",
  uz: "haqiqiy-maoshlar",
};

export const RUTA_SUELDOS_AR = "/sueldos-reales";

export const API_SUELDOS = "/api/sueldos";

// Lo que el navegador recuerda de sus aportes, para no cargar dos veces el mismo país en el mismo mes.
// Solo país, ocupación y mes: nunca el monto.
export const CLAVE_APORTES = "cy-sueldos-aportes";
