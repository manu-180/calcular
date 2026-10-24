import { esExperiencia, esOcupacion } from "./catalogo";
import { esTramoPublicado, TRAMOS, type AgregadosPais, type CeldaPublica, type OcupacionPublica, type Tramo } from "./tipos";

// Una fila de ca_sueldos_leer tal como la devuelve PostgREST (numeric llega como número o texto).
export interface FilaAgregada {
  ocupacion: string;
  experiencia: string | null;
  moneda: string | null;
  tramo: string;
  p25: number | string | null;
  p50: number | string | null;
  p75: number | string | null;
  desde: string | null;
  hasta: string | null;
}

const num = (x: number | string | null): number | null => {
  if (x === null || x === undefined) return null;
  const n = typeof x === "number" ? x : Number(x);
  return Number.isFinite(n) ? n : null;
};

const esTramo = (x: unknown): x is Tramo => typeof x === "string" && (TRAMOS as readonly string[]).includes(x);

// Un tramo publicado sin las tres cifras no se muestra como publicado: queda «cerca».
function celda(f: FilaAgregada): CeldaPublica | null {
  if (!esTramo(f.tramo)) return null;
  const p25 = num(f.p25);
  const p50 = num(f.p50);
  const p75 = num(f.p75);
  const cifras = esTramoPublicado(f.tramo) && p25 !== null && p50 !== null && p75 !== null ? { p25, p50, p75 } : null;
  return { tramo: cifras ? f.tramo : esTramoPublicado(f.tramo) ? "cerca" : f.tramo, cifras };
}

// Filas de la base a la forma de la página. Una ocupación o experiencia que el código ya no conoce se
// ignora (nunca se publica algo que la lista cerrada no nombra).
export function agregadosDeFilas(mercado: string, filas: readonly FilaAgregada[]): AgregadosPais {
  const ocupaciones: AgregadosPais["ocupaciones"] = {};
  let moneda = "";
  let desde: string | null = null;
  let hasta: string | null = null;
  for (const f of filas) {
    if (!esOcupacion(f.ocupacion)) continue;
    const c = celda(f);
    if (!c) continue;
    if (f.moneda) moneda = f.moneda;
    if (c.cifras) {
      if (f.desde && (!desde || f.desde < desde)) desde = f.desde;
      if (f.hasta && (!hasta || f.hasta > hasta)) hasta = f.hasta;
    }
    const actual: OcupacionPublica = ocupaciones[f.ocupacion] ?? { tramo: "lejos", cifras: null, porExperiencia: {} };
    if (f.experiencia === null) {
      actual.tramo = c.tramo;
      actual.cifras = c.cifras;
    } else if (esExperiencia(f.experiencia)) {
      actual.porExperiencia[f.experiencia] = c;
    }
    ocupaciones[f.ocupacion] = actual;
  }
  return { mercado, moneda, desde, hasta, ocupaciones };
}

export function ocupacionesPublicadas(a: AgregadosPais): number {
  return Object.values(a.ocupaciones).filter((o) => o?.cifras).length;
}
