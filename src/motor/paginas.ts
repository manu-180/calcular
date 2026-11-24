import type { FechaISO } from "./tipos";

export const PAGINAS_GLOBALES = ["privacidad", "terminos", "contacto", "sobre"] as const;
export type PaginaGlobal = (typeof PAGINAS_GLOBALES)[number];

// Última vez que cambió el texto de las páginas globales (privacidad, términos, contacto, sobre):
// es su lastmod en el sitemap. Moverla a mano cuando se edite src/motor/ui/Legales.tsx.
export const ACTUALIZACION_PAGINAS_GLOBALES: FechaISO = "2026-10-24";

// Privacidad, términos y contacto dicen lo mismo en cada edición: solo la de global se indexa; las de
// cada país siguen vivas y enlazadas (noindex, follow), fuera del sitemap y sin clúster. «Quiénes somos»
// sí se indexa por edición: es quién responde por los números, en el idioma de quien lee.
// Por qué: docs/decisiones/desindexacion-2026-11.md.
export function legalIndexable(codigo: string, slug: PaginaGlobal): boolean {
  return codigo === "global" || slug === "sobre";
}

export const PAGINAS_MERCADO = ["fuentes", "novedades"] as const;
export type PaginaMercado = (typeof PAGINAS_MERCADO)[number];

export function esPaginaGlobal(slug: string): slug is PaginaGlobal {
  return (PAGINAS_GLOBALES as readonly string[]).includes(slug);
}

export function esPaginaMercado(slug: string): slug is PaginaMercado {
  return (PAGINAS_MERCADO as readonly string[]).includes(slug);
}
