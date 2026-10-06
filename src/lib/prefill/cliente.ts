"use client";

const CLAVE = (slug: string) => `ca:compra:${slug}`;
const VIGENCIA_MS = 7 * 24 * 3600 * 1000;

// La calculadora deja acá lo que la persona cargó; el diálogo de compra lo levanta y lo manda
// con el checkout. localStorage y no estado de React: la compra pasa en otra página (la landing).
export function recordarDatosCompra(slug: string, datos: unknown): void {
  try {
    localStorage.setItem(CLAVE(slug), JSON.stringify({ t: Date.now(), datos }));
  } catch {}
}

export function leerDatosCompra(slug: string): unknown | null {
  try {
    const crudo = localStorage.getItem(CLAVE(slug));
    if (!crudo) return null;
    const { t, datos } = JSON.parse(crudo) as { t: number; datos: unknown };
    if (typeof t !== "number" || Date.now() - t > VIGENCIA_MS) return null;
    return datos ?? null;
  } catch {
    return null;
  }
}
