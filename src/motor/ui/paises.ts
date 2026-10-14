import { tieneBandera } from "./Bandera";

// [código del mercado, ISO del país, nombre en el idioma de la página, href si no es /<código>].
// Una tupla y no un objeto: con 190 países la lista viaja una sola vez en el payload de cada página
// (ListaPaises.tsx) y las claves repetidas eran la mitad del peso.
export type PaisCompacto = readonly [codigo: string, pais: string, nombre: string, href?: string];

export interface OpcionPais {
  codigo: string;
  nombre: string;
  pais: string;
  href: string;
}

export function desdeCompacto([codigo, pais, nombre, href]: PaisCompacto): OpcionPais {
  return { codigo, pais, nombre, href: href ?? `/${codigo}` };
}

export function aCompacto(o: OpcionPais): PaisCompacto {
  return o.href === `/${o.codigo}` ? [o.codigo, o.pais, o.nombre] : [o.codigo, o.pais, o.nombre, o.href];
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

// El nombre del país en el idioma de quien lee (en una página en inglés, "Mexico" y no "México"). El
// del mercado (m.nombre) es el del propio país y queda de respaldo para lo que no es un ISO (zz).
// Una edición de otro idioma del mismo país (/ca-fr) suma el idioma entre paréntesis.
export function nombreDePais(m: { codigo: string; pais: string; nombre: string; idioma: string }, locale: string): string {
  if (!tieneBandera(m.pais)) return m.nombre;
  const base = displayNames(nombres, locale, "region")?.of(m.pais) ?? m.nombre;
  if (!m.codigo.includes("-")) return base;
  const idioma = displayNames(idiomas, locale, "language")?.of(m.idioma);
  return idioma ? `${base} (${idioma})` : base;
}

export function ordenarPorNombre<T extends { nombre: string }>(lista: readonly T[], locale: string): T[] {
  const colador = new Intl.Collator(locale);
  return [...lista].sort((a, b) => colador.compare(a.nombre, b.nombre));
}
