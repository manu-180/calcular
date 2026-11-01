import type { Idioma } from "../tipos";

export type Direccion = "ltr" | "rtl";

const DERECHA_A_IZQUIERDA: ReadonlySet<Idioma> = new Set<Idioma>(["ar", "he"]);

export function direccionDe(idioma: Idioma): Direccion {
  return DERECHA_A_IZQUIERDA.has(idioma) ? "rtl" : "ltr";
}

// La coma y el punto y coma que el código pone entre dos textos (nombre y fecha, lista de organismos):
// en árabe van «،» y «؛», no los signos latinos (reglas_idioma los rechaza pegados a una letra árabe).
// Los demás idiomas siguen con «, » y «; » como hasta ahora (el hebreo, aunque sea rtl, usa la
// puntuación latina).
export function coma(idioma: Idioma): string {
  return idioma === "ar" ? "، " : ", ";
}

export function puntoYComa(idioma: Idioma): string {
  return idioma === "ar" ? "؛ " : "; ";
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

// En rtl, un símbolo con letras latinas y un signo detrás («US$», «HK$») se ve «$US»: el «$» queda
// entre las letras y el final del párrafo y toma la dirección árabe. Una marca LRM (invisible) detrás
// lo ata a las letras. Los símbolos en letras árabes (ج.م.، ر.س.) y los de un solo signo (€, ₹, ₪) no la
// necesitan. Lo usan formatearMoneda y los componentes que arman el monto con formatToParts. Vale para
// los dos idiomas rtl, árabe y hebreo (ADR 0002, D10 y D22).
export const LOCALE_RTL = /^(?:ar|he)(?:-|$)/i;

export function simboloLegible(simbolo: string, locale: string): string {
  return LOCALE_RTL.test(locale) && /[A-Za-z]/.test(simbolo) && /[^A-Za-z]$/.test(simbolo) ? `${simbolo}\u200e` : simbolo;
}
