// El chino tiene un solo Idioma ("zh") y dos escrituras que no se convierten solas: tradicional en
// Taiwán y Hong Kong (base de los diccionarios) y simplificada en China continental y Singapur
// (parche regional completo, escrito a mano: el vocabulario también cambia, no solo los caracteres).
export type EscrituraZh = "hant" | "hans";

const SIMPLIFICADO = /^zh-(?:CN|SG|MY|Hans)(?:-|$)/i;

export function escrituraZh(locale: string | undefined): EscrituraZh {
  return locale && SIMPLIFICADO.test(locale) ? "hans" : "hant";
}

// El georgiano de la interfaz (mkhedruli) no tiene mayúsculas. JavaScript y CSS sí suben las letras a
// mtavruli (U+1C90 a U+1CBF), que es otra forma de escribir y además no entra en las fuentes pedidas
// por subconjunto: toda mayúscula automática tiene que quedar neutra en georgiano (ADR 0002, D26).
export function sinMayusculas(locale: string | undefined): boolean {
  return Boolean(locale && /^ka(?:-|$)/i.test(locale));
}

export function mayusculasDe(texto: string, locale: string): string {
  return sinMayusculas(locale) ? texto : texto.toLocaleUpperCase(locale);
}

// Para el textTransform de Satori, que no sabe el idioma.
export function transformeOg(locale: string): "none" | "uppercase" {
  return sinMayusculas(locale) ? "none" : "uppercase";
}

export const LOCALES_SIMPLIFICADOS = ["zh-CN", "zh-SG"] as const;
