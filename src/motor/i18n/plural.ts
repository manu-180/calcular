// Serbio (ADR 0002, D23): las categorías de Intl.PluralRules("sr"). «one» es 1, 21, 31, 101... (no
// 11), «few» 2 a 4, 22 a 24... (no 12 a 14) y «other» todo lo demás, también 0 y las fracciones
// («1,5 godina»). Recibe number o string porque check_i18n llama a las funciones de los diccionarios
// con argumentos de muestra.
const REGLAS_SR = new Intl.PluralRules("sr");

export function formaSr(n: number | string, uno: string, pocos: string, muchos: string): string {
  const categoria = REGLAS_SR.select(Math.abs(Number(n)));
  if (categoria === "one") return uno;
  if (categoria === "few") return pocos;
  return muchos;
}

// El número y la palabra: «1 kalkulator», «3 kalkulatora», «5 kalkulatora», «21 dan», «22 dana».
export function pluralSr(n: number | string, uno: string, pocos: string, muchos: string): string {
  return `${n} ${formaSr(n, uno, pocos, muchos)}`;
}
