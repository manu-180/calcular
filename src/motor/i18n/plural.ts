// Checo (ADR 0002, D19): las categorías de Intl.PluralRules("cs"). «one» es solo 1, «few» 2 a 4
// (también 2 a 4 sin excepción por decenas: 22 ya es «other»), «other» 0 y 5 en adelante, y «many»
// las fracciones, que en checo van en genitivo singular («1,5 roku», «2,5 hodiny»). Si no se da la
// forma de fracción se usa la de «few», que para muchos sustantivos coincide. Recibe number o string
// porque check_i18n llama a las funciones de los diccionarios con argumentos de muestra.
const REGLAS_CS = new Intl.PluralRules("cs");

export function formaCs(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  const categoria = REGLAS_CS.select(Math.abs(Number(n)));
  if (categoria === "one") return uno;
  if (categoria === "few") return pocos;
  if (categoria === "many") return fraccion ?? pocos;
  return muchos;
}

// El número y la palabra: «1 kalkulačka», «3 kalkulačky», «5 kalkulaček».
export function pluralCs(n: number | string, uno: string, pocos: string, muchos: string, fraccion?: string): string {
  return `${n} ${formaCs(n, uno, pocos, muchos, fraccion)}`;
}
