import type { Idioma } from "../tipos";

// Slug del calendario por idioma, igual en todas las ediciones de ese idioma (como SLUG_MUNDO). Vive
// aparte de rutas.ts porque next.config lo lee (secciones.ts) y rutas.ts arrastra el registro entero.
// check_calendario falla si una calculadora de algún país usa uno de estos slugs.
export const SLUG_CALENDARIO: Record<Idioma, string> = {
  sq: "kalendari-i-pagave",
  es: "calendario-laboral",
  pt: "calendario-trabalhista",
  en: "pay-calendar",
  fr: "calendrier-paie",
  de: "lohnkalender",
  it: "calendario-lavoro",
  nl: "loonkalender",
  ja: "kyuyo-karenda",
  ko: "geupyeo-dallyeok",
  zh: "gongzi-rili",
  pl: "kalendarz-placowy",
  sv: "lonekalender",
  da: "lonkalender",
  nb: "lonnskalender",
  fi: "palkkakalenteri",
  ar: "taqwim-alrawatib",
  id: "kalender-gaji",
  tr: "maas-takvimi",
  bn: "beton-calendar",
  th: "patithin-ngoen-duean",
  uk: "kalendar-vyplat",
  uz: "ish-haqi-kalendari",
  // ru no puede usar «kalendar-vyplat»: es la carpeta del ucraniano (ADR 0002, D17).
  ru: "kalendar-zarplaty",
  ro: "calendar-salarial",
  cs: "vyplatni-kalendar",
  el: "imerologio-misthodosias",
  hu: "fizetesi-naptar",
  he: "luach-maskorot",
  sr: "kalendar-isplata",
  bg: "raboten-kalendar",
};
