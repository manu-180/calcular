const CLAVE = "ca_recientes_v1";
const MAX = 8;

// Rutas que nunca son "donde estabas": se filtran al guardar para no gastar los 8 lugares.
const NO_REGISTRAR = /^\/(?:$|sobre|contacto|privacidad|terminos|blog$|cuenta|login|registro|recuperar|auth|dashboard|planillas\/(?:gracias|comprar))/;

type Visita = { p: string; t: number };

function leer(): Visita[] {
  try {
    const crudo = localStorage.getItem(CLAVE);
    const lista: unknown = crudo ? JSON.parse(crudo) : [];
    return Array.isArray(lista) ? lista.filter((v): v is Visita => typeof v?.p === "string").slice(0, MAX) : [];
  } catch {
    return [];
  }
}

export function registrarVisita(ruta: string): void {
  const p = ruta.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  if (NO_REGISTRAR.test(p) || p.length > 120) return;
  try {
    const lista = [{ p, t: Date.now() }, ...leer().filter((v) => v.p !== p)].slice(0, MAX);
    localStorage.setItem(CLAVE, JSON.stringify(lista));
  } catch {}
}

export function leerRecientes(): string[] {
  return leer().map((v) => v.p);
}
