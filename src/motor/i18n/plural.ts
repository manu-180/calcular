// Ruso (ADR 0002, D17): las categorías de Intl.PluralRules("ru"). «one» es 1, 21, 31 (salvo 11),
// «few» 2 a 4, 22 a 24 (salvo 12 a 14), «many» 0, 5 a 20, 25 a 30, y «other» las fracciones, que en
// ruso van en genitivo singular («1,5 года»). Si no se da la forma de fracción se usa la de «few»,
// que para la mayoría de los sustantivos es la misma. Recibe number o string porque check_i18n llama
// a las funciones de los diccionarios con argumentos de muestra.
const REGLAS_RU = new Intl.PluralRules("ru");

export function formaRu(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  const categoria = REGLAS_RU.select(Math.abs(Number(n)));
  if (categoria === "one") return uno;
  if (categoria === "few") return pocos;
  if (categoria === "many") return muchos;
  return fraccion ?? pocos;
}

// El número y la palabra: «1 калькулятор», «3 калькулятора», «5 калькуляторов».
export function pluralRu(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  return `${n} ${formaRu(n, uno, pocos, muchos, fraccion)}`;
}
