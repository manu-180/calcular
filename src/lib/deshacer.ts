export type Quitada<T> = { item: T; indice: number };

export function quitarEn<T>(lista: readonly T[], indice: number): { lista: T[]; quitada: Quitada<T> | null } {
  if (indice < 0 || indice >= lista.length) return { lista: lista as T[], quitada: null };
  return { lista: lista.filter((_, j) => j !== indice), quitada: { item: lista[indice], indice } };
}

export function insertarEn<T>(lista: readonly T[], indice: number, item: T): T[] {
  const copia = [...lista];
  copia.splice(Math.min(Math.max(indice, 0), copia.length), 0, item);
  return copia;
}

export function apilar<T>(pila: readonly T[], entrada: T): T[] {
  return [...pila, entrada];
}

// LIFO: cada índice se guardó contra la lista que había en ese momento, así que sólo vuelve a su
// lugar exacto si se restaura en el orden inverso al que se quitó.
export function desapilar<T>(pila: readonly T[]): { pila: T[]; ultima: T | null } {
  if (pila.length === 0) return { pila: [], ultima: null };
  return { pila: pila.slice(0, -1), ultima: pila[pila.length - 1] };
}
