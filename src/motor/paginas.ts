import type { FechaISO } from "./tipos";

export const PAGINAS_GLOBALES = ["privacidad", "terminos", "contacto", "sobre"] as const;
export type PaginaGlobal = (typeof PAGINAS_GLOBALES)[number];

// Última vez que cambió el texto de las páginas globales (privacidad, términos, contacto, sobre):
// es su lastmod en el sitemap. Moverla a mano cuando se edite src/motor/ui/Legales.tsx.
export const ACTUALIZACION_PAGINAS_GLOBALES: FechaISO = "2026-10-07";

export const PAGINAS_MERCADO = ["fuentes", "novedades"] as const;
export type PaginaMercado = (typeof PAGINAS_MERCADO)[number];

export function esPaginaGlobal(slug: string): slug is PaginaGlobal {
  return (PAGINAS_GLOBALES as readonly string[]).includes(slug);
}

export function esPaginaMercado(slug: string): slug is PaginaMercado {
  return (PAGINAS_MERCADO as readonly string[]).includes(slug);
}
