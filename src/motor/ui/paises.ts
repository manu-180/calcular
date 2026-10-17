import { tieneBandera } from "./Bandera";

// [código del mercado, ISO del país, nombre en el idioma de la página, href si no es /<código>,
// idioma solo en países con varias ediciones]. Una tupla y no un objeto: con 190 países la lista
// viaja una sola vez en el payload de cada página (ListaPaises.tsx) y las claves repetidas eran la
// mitad del peso.
export type PaisCompacto = readonly [codigo: string, pais: string, nombre: string, href?: string | null, idioma?: string];

export interface OpcionPais {
  codigo: string;
  nombre: string;
  pais: string;
  href: string;
  idioma?: string;
}

export function desdeCompacto([codigo, pais, nombre, href, idioma]: PaisCompacto): OpcionPais {
  return { codigo, pais, nombre, href: href ?? `/${codigo}`, ...(idioma ? { idioma } : {}) };
}

export function aCompacto(o: OpcionPais): PaisCompacto {
  const href = o.href === `/${o.codigo}` ? null : o.href;
  if (o.idioma) return [o.codigo, o.pais, o.nombre, href, o.idioma];
  return href === null ? [o.codigo, o.pais, o.nombre] : [o.codigo, o.pais, o.nombre, href];
}

const nombres = new Map<string, Intl.DisplayNames | null>();
const idiomas = new Map<string, Intl.DisplayNames | null>();

function displayNames(cache: Map<string, Intl.DisplayNames | null>, locale: string, type: "region" | "language"): Intl.DisplayNames | null {
  if (!cache.has(locale)) {
    try {
      cache.set(locale, new Intl.DisplayNames([locale], { type, fallback: "none" }));
    } catch {
      cache.set(locale, null);
    }
  }
  return cache.get(locale)!;
}

// El idioma en su propio idioma y con mayúscula («English», «Français»): así lo busca quien lo habla.
export function autonimo(idioma: string): string {
  const nombre = displayNames(idiomas, idioma, "language")?.of(idioma) ?? idioma;
  return nombre.charAt(0).toLocaleUpperCase(idioma) + nombre.slice(1);
}

// El nombre del país en el idioma de quien lee (en una página en inglés, "Mexico" y no "México"). El
// del mercado (m.nombre) es el del propio país y queda de respaldo para lo que no es un ISO (zz).
// Un país con varias ediciones (/ca y /ca-fr) suma el idioma de cada una: «Canada (English)» y
// «Canada (Français)».
export function nombreDePais(m: { codigo: string; pais: string; nombre: string; idioma: string }, locale: string, conIdioma = false): string {
  const base = tieneBandera(m.pais) ? (displayNames(nombres, locale, "region")?.of(m.pais) ?? m.nombre) : m.nombre;
  return conIdioma ? `${base} (${autonimo(m.idioma)})` : base;
}

// Entre las ediciones de un país, la del primer idioma del navegador que tenga una; si ninguno
// coincide, la principal (la que no tiene sufijo). Sin ediciones, la única opción del país.
export function edicionPara<T extends { codigo: string; pais: string; idioma?: string }>(
  opciones: readonly T[],
  pais: string,
  idiomasNavegador: readonly string[],
): T | undefined {
  const delPais = opciones.filter((o) => o.pais === pais);
  if (delPais.length < 2) return delPais[0];
  for (const l of idiomasNavegador) {
    const idioma = l.toLowerCase().split("-")[0];
    const elegida = delPais.find((o) => (o.idioma ?? o.codigo.split("-")[1]) === idioma);
    if (elegida) return elegida;
  }
  return delPais.find((o) => !o.codigo.includes("-")) ?? delPais[0];
}

export function idiomasDelNavegador(): readonly string[] {
  if (typeof navigator === "undefined") return [];
  return navigator.languages?.length ? navigator.languages : navigator.language ? [navigator.language] : [];
}

export function ordenarPorNombre<T extends { nombre: string }>(lista: readonly T[], locale: string): T[] {
  const colador = new Intl.Collator(locale);
  return [...lista].sort((a, b) => colador.compare(a.nombre, b.nombre));
}
