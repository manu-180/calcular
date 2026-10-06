"use client";

const CLAVE = (slug: string) => `ca:compra:${slug}`;
const VIGENCIA_MS = 7 * 24 * 3600 * 1000;
const EVENTO = "ca:datos-compra";

// El diálogo de compra puede estar montado en la misma página que la calculadora (OfertaPlanilla):
// sin este aviso leería lo guardado un render tarde y ofrecería datos que ya no están.
function avisar(): void {
  try {
    window.dispatchEvent(new Event(EVENTO));
  } catch {}
}

/** Para `useSyncExternalStore`: avisa cuando cambian los datos guardados, en esta pestaña o en otra. */
export function suscribirDatosCompra(cb: () => void): () => void {
  window.addEventListener(EVENTO, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENTO, cb);
    window.removeEventListener("storage", cb);
  };
}

// La calculadora deja acá lo que la persona cargó; el diálogo de compra lo levanta y lo manda
// con el checkout. localStorage y no estado de React: la compra pasa en otra página (la landing).
export function recordarDatosCompra(slug: string, datos: unknown): void {
  try {
    localStorage.setItem(CLAVE(slug), JSON.stringify({ t: Date.now(), datos }));
  } catch {}
  avisar();
}

/** Cuando la calculadora queda sin un caso válido: si no, la compra saldría con un caso viejo. */
export function olvidarDatosCompra(slug: string): void {
  try {
    if (localStorage.getItem(CLAVE(slug)) === null) return;
    localStorage.removeItem(CLAVE(slug));
  } catch {
    return;
  }
  avisar();
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
