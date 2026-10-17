import type { Idioma } from "../tipos";

export type Direccion = "ltr" | "rtl";

const DERECHA_A_IZQUIERDA: ReadonlySet<Idioma> = new Set<Idioma>(["ar"]);

export function direccionDe(idioma: Idioma): Direccion {
  return DERECHA_A_IZQUIERDA.has(idioma) ? "rtl" : "ltr";
}

// Los mercados árabes llevan -u-ca-gregory-nu-latn en el locale para que Intl formatee con dígitos
// latinos y calendario gregoriano. lang, hreflang, og:locale e inLanguage no admiten extensiones:
// van con la etiqueta base («ar-EG»).
export function etiquetaIdioma(locale: string): string {
  try {
    return new Intl.Locale(locale).baseName;
  } catch {
    return locale;
  }
}
