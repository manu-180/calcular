import { IDIOMAS, type Idioma, type Trato } from "../tipos";
import { variantesDeLocale } from "./variantes";

type Hoja = string | number | boolean | null | undefined | ((...args: never[]) => unknown) | readonly unknown[];

// Un parche toca solo lo que cambia con el trato. Funciones y listas se reemplazan enteras: un
// merge por posición en una lista de promesas o de pasos mezclaría dos registros en un mismo bloque.
export type Parche<T> = T extends Hoja ? T : { readonly [K in keyof T]?: Parche<T[K]> };

// base va en el registro informal ("tu"). usted es el formal del idioma; vos, el voseo, solo
// existe en español: en cualquier otro idioma un mercado de vos se resuelve como tu.
// regional: parches por locale (pt-PT, en-GB, fr-CA) que se aplican después del trato, para la
// palabra que cambia de un país a otro dentro del mismo idioma. Van en el orden de
// variantesDeLocale (./variantes.ts): pt-AO toma el de pt-PT, después el de la lusofonía y al final
// el suyo, si lo tiene.
export interface Diccionario<T> {
  readonly base: T;
  readonly usted?: Parche<T>;
  readonly vos?: Parche<T>;
  readonly regional?: Readonly<Record<string, Parche<T>>>;
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

// Ajustes de escritura por locale que valen para todo texto de ese idioma y país, sin reescribir
// diccionarios: en Suiza y Liechtenstein el alemán no usa «ß».
const AJUSTES_LOCALE: Readonly<Record<string, (texto: string) => string>> = {
  "de-CH": (t) => t.replace(/ß/g, "ss"),
  "de-LI": (t) => t.replace(/ß/g, "ss"),
};

export function ajusteDeLocale(locale: string | undefined): ((texto: string) => string) | undefined {
  return locale ? AJUSTES_LOCALE[locale] : undefined;
}

// Aplica el ajuste a cada texto, también a lo que devuelven las funciones del diccionario.
export function adaptar<T>(valor: T, ajuste: (texto: string) => string): T {
  if (typeof valor === "string") return ajuste(valor) as T;
  if (typeof valor === "function") return ((...args: unknown[]) => adaptar((valor as (...a: unknown[]) => unknown)(...args), ajuste)) as T;
  if (Array.isArray(valor)) return valor.map((x) => adaptar(x, ajuste)) as T;
  if (!esPlano(valor)) return valor;
  const salida: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(valor)) salida[k] = adaptar(v, ajuste);
  return salida as T;
}

// Los parches regionales que tocan a un locale, del más general al más específico.
export function regionalesDe<T>(dic: Pick<Diccionario<T>, "regional">, locale: string | undefined): Parche<T>[] {
  return variantesDeLocale(locale).flatMap((k) => (dic.regional?.[k] ? [dic.regional[k]] : []));
}

const memo = new WeakMap<object, Map<string, unknown>>();

export function resolver<T>(dics: Diccionarios<T>, idioma: Idioma, trato: Trato, locale?: string): T {
  let cache = memo.get(dics);
  if (!cache) {
    cache = new Map();
    memo.set(dics, cache);
  }
  const dic = dics[idioma] ?? dics.es;
  const regionales = regionalesDe(dic, locale);
  const ajuste = ajusteDeLocale(locale);
  const clave = `${idioma}:${trato}:${regionales.length || ajuste ? locale : ""}`;
  if (cache.has(clave)) return cache.get(clave) as T;
  let valor = fusionar(dic.base, parcheDe(dic, idioma, trato));
  for (const regional of regionales) valor = fusionar(valor, regional);
  if (ajuste) valor = adaptar(valor, ajuste);
  cache.set(clave, valor);
  return valor;
}

export function idiomaDeLocale(locale: string): Idioma | null {
  const [base] = locale.toLowerCase().split("-");
  return IDIOMAS.find((i) => i === base) ?? null;
}
