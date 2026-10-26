// Marcador de una fila de escala ({{dato[n].campo}}). En bengalí la regla de textos marca cualquier
// cifra latina, también el índice del marcador, aunque el motor lo reemplaza por el valor con dígitos
// bengalíes; armarlo acá deja el índice fuera del texto que revisa el check.
// fin: la puntuación que sigue pegada al valor («।»), que el check no puede ver tras la expresión.
export function fila(dato: string, n: number, campo: "tasa" | "desde" | "hasta", fin = ""): string {
  return `{{${dato}[${n}].${campo}}}${fin}`;
}

export const tramoRenta = (n: number, campo: "tasa" | "desde" | "hasta", fin = "") => fila("bd.income-tax-slabs", n, campo, fin);
