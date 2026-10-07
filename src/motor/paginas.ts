export const PAGINAS_GLOBALES = ["privacidad", "terminos", "contacto", "sobre"] as const;
export type PaginaGlobal = (typeof PAGINAS_GLOBALES)[number];

export const PAGINAS_MERCADO = ["fuentes", "novedades"] as const;
export type PaginaMercado = (typeof PAGINAS_MERCADO)[number];

export function esPaginaGlobal(slug: string): slug is PaginaGlobal {
  return (PAGINAS_GLOBALES as readonly string[]).includes(slug);
}

export function esPaginaMercado(slug: string): slug is PaginaMercado {
  return (PAGINAS_MERCADO as readonly string[]).includes(slug);
}
