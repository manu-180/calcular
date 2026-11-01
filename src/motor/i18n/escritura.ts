// El chino tiene un solo Idioma ("zh") y dos escrituras que no se convierten solas: tradicional en
// Taiwán y Hong Kong (base de los diccionarios) y simplificada en China continental y Singapur
// (parche regional completo, escrito a mano: el vocabulario también cambia, no solo los caracteres).
export type EscrituraZh = "hant" | "hans";

const SIMPLIFICADO = /^zh-(?:CN|SG|MY|Hans)(?:-|$)/i;

export function escrituraZh(locale: string | undefined): EscrituraZh {
  return locale && SIMPLIFICADO.test(locale) ? "hans" : "hant";
}

// Armenio reformado: la mayúscula de «և» es «ԵՎ», pero JavaScript y CSS la suben a «ԵՒ», la forma de la
// ortografía clásica. En CSS no se puede corregir, así que las etiquetas en armenio van sin mayúsculas
// sostenidas y las cejas de las OG quedan como en el diccionario (ADR 0002, D30).
export function sinMayusculas(locale: string | undefined): boolean {
  return Boolean(locale && /^hy(?:-|$)/i.test(locale));
}

export function mayusculasDe(texto: string, locale: string): string {
  return sinMayusculas(locale) ? texto : texto.toLocaleUpperCase(locale);
}

// Para el textTransform de Satori, que no sabe el idioma.
export function transformeOg(locale: string): "none" | "uppercase" {
  return sinMayusculas(locale) ? "none" : "uppercase";
}

export const LOCALES_SIMPLIFICADOS = ["zh-CN", "zh-SG"] as const;
