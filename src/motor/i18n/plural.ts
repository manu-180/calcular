// Búlgaro (ADR 0002, D24): Intl.PluralRules("bg") tiene dos categorías, «one» (solo el 1) y «other»
// (0, 2, 21, las fracciones). Los sustantivos masculinos que no son de persona van en forma numérica
// detrás de un número («2 калкулатора», «5 часа», «3 месеца»), así que «otros» es esa forma y no el
// plural común («калкулатори»). Recibe number o string porque check_i18n llama a las funciones de los
// diccionarios con argumentos de muestra.
const REGLAS_BG = new Intl.PluralRules("bg");

export function formaBg(n: number | string, uno: string, otros: string): string {
  return REGLAS_BG.select(Math.abs(Number(n))) === "one" ? uno : otros;
}

// El número y la palabra: «1 калкулатор», «2 калкулатора», «40 държави».
export function pluralBg(n: number | string, uno: string, otros: string): string {
  return `${n} ${formaBg(n, uno, otros)}`;
}
