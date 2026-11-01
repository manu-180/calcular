import type { Idioma } from "../tipos";

// Slug de «Sueldos reales» por idioma, igual en todas las ediciones de un idioma (como SLUG_MUNDO).
// check_sueldos falla si alguno choca con una calculadora o una página del registro.
export const SLUG_SUELDOS: Record<Idioma, string> = {
  sq: "pagat-reale",
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
  bg: "realni-zaplati",
  mn: "bodit-tsalin",
  hy: "irakan-ashkhatavardzer",
  sl: "dejanske-place",
  et: "tegelikud-palgad",
  is: "raunveruleg-laun",
  lv: "realas-algas",
  mk: "realni-plati",
  vi: "luong-thuc-te",

  pl: "prawdziwe-zarobki",
  sv: "verkliga-loner",
  da: "rigtige-lonninger",
  nb: "faktiske-lonninger",
  fi: "todelliset-palkat",
  ar: "rawatib-haqiqiya",
  id: "gaji-sebenarnya",
  tr: "gercek-maaslar",
  bn: "asol-beton",
  th: "ngoen-duean-ching",
  uk: "realni-zarplaty",
  uz: "haqiqiy-maoshlar",
  ru: "realnye-zarplaty",
  ro: "salarii-reale",
  cs: "skutecne-mzdy",
  el: "pragmatikoi-misthoi",
  hu: "valodi-fizetesek",
  he: "sachar-amiti",
  sr: "stvarne-plate",
  sk: "skutocne-mzdy",
  ka: "realuri-khelpasebi",
  hr: "stvarne-place",
};

export const RUTA_SUELDOS_AR = "/sueldos-reales";

export const API_SUELDOS = "/api/sueldos";

// Lo que el navegador recuerda de sus aportes, para no cargar dos veces el mismo país en el mismo mes.
// Solo país, ocupación y mes: nunca el monto.
export const CLAVE_APORTES = "cy-sueldos-aportes";
