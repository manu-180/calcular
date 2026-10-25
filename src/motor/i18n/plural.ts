// Polaco: 1 kalkulator, 2 a 4 kalkulatory (salvo 12 a 14), el resto kalkulatorów. Recibe number o
// string porque check_i18n llama a las funciones de los diccionarios con argumentos de muestra.
export function pluralPl(n: number | string, uno: string, pocos: string, muchos: string): string {
  const x = Math.abs(Number(n));
  if (x === 1) return `${n} ${uno}`;
  const d = x % 10;
  const c = x % 100;
  return `${n} ${d >= 2 && d <= 4 && (c < 12 || c > 14) ? pocos : muchos}`;
}
// Ucraniano (ADR 0002, D15): las categorías de Intl.PluralRules("uk"). «one» es 1, 21, 31 (salvo 11),
// «few» 2 a 4, 22 a 24 (salvo 12 a 14), «many» 0, 5 a 20, 25 a 30, y «other» las fracciones, que en
// ucraniano van en genitivo singular («1,5 року»). Si no se da la forma de fracción se usa la de
// «few», que para la mayoría de los sustantivos es la misma. Recibe number o string porque
// check_i18n llama a las funciones de los diccionarios con argumentos de muestra.
const REGLAS_UK = new Intl.PluralRules("uk");

export function formaUk(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  const categoria = REGLAS_UK.select(Math.abs(Number(n)));
  if (categoria === "one") return uno;
  if (categoria === "few") return pocos;
  if (categoria === "many") return muchos;
  return fraccion ?? pocos;
}

// El número y la palabra: «1 калькулятор», «3 калькулятори», «5 калькуляторів».
export function pluralUk(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  return `${n} ${formaUk(n, uno, pocos, muchos, fraccion)}`;
}
