// El chino tiene un solo Idioma ("zh") y dos escrituras que no se convierten solas: tradicional en
// Taiwán y Hong Kong (base de los diccionarios) y simplificada en China continental y Singapur
// (parche regional completo, escrito a mano: el vocabulario también cambia, no solo los caracteres).
export type EscrituraZh = "hant" | "hans";

const SIMPLIFICADO = /^zh-(?:CN|SG|MY|Hans)(?:-|$)/i;

export function escrituraZh(locale: string | undefined): EscrituraZh {
  return locale && SIMPLIFICADO.test(locale) ? "hans" : "hant";
}

export const LOCALES_SIMPLIFICADOS = ["zh-CN", "zh-SG"] as const;
