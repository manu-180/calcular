import type { Idioma } from "../tipos";

// Slug de «Tu sueldo en el mundo» por idioma. Es el mismo en todas las ediciones de un idioma, así el
// clúster hreflang se arma solo para cualquier país nuevo.
export const SLUG_MUNDO: Record<Idioma, string> = {
  es: "sueldo-en-el-mundo",
  pt: "salario-pelo-mundo",
  en: "salary-around-the-world",
  fr: "salaire-dans-le-monde",
  de: "gehalt-weltweit",
  it: "stipendio-nel-mondo",
  nl: "salaris-wereldwijd",
  ja: "sekai-no-kyuyo",
  ko: "segye-yeonbong",
  zh: "shijie-gongzi",
};

export const RUTA_MUNDO_AR = "/sueldo-en-el-mundo";

export function rutaMundo(mercado: string, idioma: Idioma): string {
  return mercado === "ar" ? RUTA_MUNDO_AR : `/${mercado}/${SLUG_MUNDO[idioma]}`;
}

// El sueldo que la persona ya cargó en su calculadora viaja a la página del mundo por sessionStorage,
// nunca en la URL: un monto en la query queda en logs, historial y en lo que se comparte.
export const CLAVE_TRASPASO = "cy-mundo-bruto";
