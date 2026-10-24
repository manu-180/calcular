import { MINIMO_PAISES } from "./calculo";
import { PRODUCTO_INICIAL, PRODUCTOS } from "./productos";
import type { IndiceHoras } from "./tipos";

// Qué páginas de «¿Cuántas horas de trabajo cuesta?» existen hoy. Una sola regla para la página (404),
// el sitemap, el hreflang y llms.txt: si los precios vencen todos juntos, desaparecen de todos lados el
// mismo día y nada lista una URL que da 404.
// - Un producto se publica con al menos MINIMO_PAISES_PRODUCTO países (un ranking de uno no es ranking).
// - El índice, con al menos MINIMO_PAISES países y algún producto publicado.
// - `inicial` es el producto que muestra el índice: PRODUCTO_INICIAL si se publica, si no el primero que
//   se publique. Su página (/<m>/<slug>/<inicial>) lleva canonical al índice y no va al sitemap.
export const MINIMO_PAISES_PRODUCTO = 2;

export interface PublicacionHoras {
  productos: readonly string[];
  inicial: string | null;
}

export const SIN_HORAS: PublicacionHoras = { productos: [], inicial: null };

export function publicacionDe(indice: IndiceHoras): PublicacionHoras {
  if (indice.filas.length < MINIMO_PAISES) return SIN_HORAS;
  const productos = PRODUCTOS.filter((p) => indice.filas.filter((f) => f.celdas[p.id]).length >= MINIMO_PAISES_PRODUCTO).map((p) => p.id);
  if (!productos.length) return SIN_HORAS;
  return { productos, inicial: productos.includes(PRODUCTO_INICIAL) ? PRODUCTO_INICIAL : productos[0] };
}

// Páginas que van al sitemap: el índice y cada producto publicado menos el inicial (es el índice).
export function paginasHoras(p: PublicacionHoras): (string | undefined)[] {
  return p.inicial ? [undefined, ...p.productos.filter((id) => id !== p.inicial)] : [];
}
