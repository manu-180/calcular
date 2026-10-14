import { IDIOMAS, type Idioma, type Trato } from "../tipos";

type Hoja = string | number | boolean | null | undefined | ((...args: never[]) => unknown) | readonly unknown[];

// Un parche toca solo lo que cambia con el trato. Funciones y listas se reemplazan enteras: un
// merge por posición en una lista de promesas o de pasos mezclaría dos registros en un mismo bloque.
export type Parche<T> = T extends Hoja ? T : { readonly [K in keyof T]?: Parche<T[K]> };

// base va en el registro informal ("tu"). usted es el formal del idioma; vos, el voseo, solo
// existe en español: en cualquier otro idioma un mercado de vos se resuelve como tu.
export interface Diccionario<T> {
  readonly base: T;
  readonly usted?: Parche<T>;
  readonly vos?: Parche<T>;
}

export type Diccionarios<T> = Readonly<Record<Idioma, Diccionario<T>>>;

const esPlano = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype;

export function fusionar<T>(base: T, parche: Parche<T> | undefined): T {
  if (parche === undefined) return base;
  if (!esPlano(base) || !esPlano(parche)) return parche as T;
  const salida: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(parche)) {
    if (v !== undefined) salida[k] = fusionar(salida[k], v as Parche<unknown>);
  }
  return salida as T;
}

export function parcheDe<T>(dic: Diccionario<T>, idioma: Idioma, trato: Trato): Parche<T> | undefined {
  if (trato === "usted") return dic.usted;
  if (trato === "vos" && idioma === "es") return dic.vos;
  return undefined;
}

const memo = new WeakMap<object, Map<string, unknown>>();

export function resolver<T>(dics: Diccionarios<T>, idioma: Idioma, trato: Trato): T {
  let cache = memo.get(dics);
  if (!cache) {
    cache = new Map();
    memo.set(dics, cache);
  }
  const clave = `${idioma}:${trato}`;
  if (cache.has(clave)) return cache.get(clave) as T;
  const dic = dics[idioma] ?? dics.es;
  const valor = fusionar(dic.base, parcheDe(dic, idioma, trato));
  cache.set(clave, valor);
  return valor;
}

export function idiomaDeLocale(locale: string): Idioma | null {
  const [base] = locale.toLowerCase().split("-");
  return IDIOMAS.find((i) => i === base) ?? null;
}
