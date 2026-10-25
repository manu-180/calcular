// Griego (ADR 0002, D20): Intl.PluralRules("el") tiene dos categorías, «one» (solo 1) y «other» (0,
// 2 en adelante y las fracciones: «1,5 ώρες»). Recibe number o string porque check_i18n llama a las
// funciones de los diccionarios con argumentos de muestra; un string que no es número cae en «other».
const REGLAS_EL = new Intl.PluralRules("el");

export function formaEl(n: number | string, uno: string, otros: string): string {
  return REGLAS_EL.select(Math.abs(Number(n))) === "one" ? uno : otros;
}

// El número y la palabra: «1 αριθμομηχανή», «5 αριθμομηχανές».
export function pluralEl(n: number | string, uno: string, otros: string): string {
  return `${n} ${formaEl(n, uno, otros)}`;
}
