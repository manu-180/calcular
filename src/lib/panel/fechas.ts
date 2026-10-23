import { RANGOS, type Preset, type Rango } from "@/lib/panel/tipos";

// Fecha argentina "AAAA-MM-DD". Argentina está fija en UTC-3 (ver formato.ts).
export type Dia = string;

const DIA_MS = 86_400_000;
const OFFSET_AR_MS = 3 * 3600 * 1000;
const FORMA_DIA = /^\d{4}-\d{2}-\d{2}$/;
const DIAS_PRESET: Record<Preset, number> = { hoy: 1, "7d": 7, "30d": 30, "90d": 90 };
// ca_panel rechaza rangos de más de 400 días.
export const MAX_DIAS = 400;

export function hoyAR(ahora: number = Date.now()): Dia {
  return new Date(ahora - OFFSET_AR_MS).toISOString().slice(0, 10);
}

export function sumarDias(d: Dia, n: number): Dia {
  return new Date(Date.parse(`${d}T00:00:00Z`) + n * DIA_MS).toISOString().slice(0, 10);
}

export function diasEntre(desde: Dia, hasta: Dia): number {
  return Math.round((Date.parse(`${hasta}T00:00:00Z`) - Date.parse(`${desde}T00:00:00Z`)) / DIA_MS);
}

function esDia(valor: string): boolean {
  if (!FORMA_DIA.test(valor)) return false;
  const t = Date.parse(`${valor}T00:00:00Z`);
  return !Number.isNaN(t) && new Date(t).toISOString().slice(0, 10) === valor;
}

export function esPreset(r: string): r is Preset {
  return (RANGOS as string[]).includes(r);
}

export function extremos(r: Rango, hoy: Dia): { inicio: Dia; fin: Dia } {
  if (esPreset(r)) return { inicio: sumarDias(hoy, -(DIAS_PRESET[r] - 1)), fin: hoy };
  const [inicio, fin = inicio] = r.split("_");
  return { inicio, fin };
}

export function cantidadDias(r: Rango, hoy: Dia): number {
  const { inicio, fin } = extremos(r, hoy);
  return diasEntre(inicio, fin) + 1;
}

// Lo que coincide con un botón fijo vuelve a ser ese botón: el mismo período tiene una sola URL y un solo caché.
export function armarRango(a: Dia, b: Dia, hoy: Dia): Rango {
  const [inicio, fin] = a <= b ? [a, b] : [b, a];
  if (fin === hoy) {
    const n = diasEntre(inicio, fin) + 1;
    const preset = RANGOS.find((p) => DIAS_PRESET[p] === n);
    if (preset) return preset;
  }
  return (inicio === fin ? inicio : `${inicio}_${fin}`) as Rango;
}

export function leerRango(valor: unknown, hoy: Dia): Rango | null {
  if (typeof valor !== "string") return null;
  if (esPreset(valor)) return valor;
  const partes = valor.split("_");
  if (partes.length > 2 || !partes.every(esDia)) return null;
  const [a, b = a] = partes;
  const [inicio, fin] = a <= b ? [a, b] : [b, a];
  if (fin > hoy || diasEntre(inicio, fin) + 1 > MAX_DIAS) return null;
  return armarRango(inicio, fin, hoy);
}
