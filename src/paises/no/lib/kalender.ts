import type { FechaISO } from "@/motor/tipos";

const MANEDER = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"] as const;

export function manedsnavn(maned: number): string {
  return MANEDER[maned - 1] ?? "";
}

export function manedOgAr(fecha: string): string {
  return `${manedsnavn(Number(fecha.slice(5, 7)))} ${fecha.slice(0, 4)}`;
}

function dagerIManed(ar: number, maned: number): number {
  return [31, ar % 4 === 0 && (ar % 100 !== 0 || ar % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][maned - 1];
}

function iso(ar: number, maned: number, dag: number): FechaISO {
  return `${ar}-${String(maned).padStart(2, "0")}-${String(dag).padStart(2, "0")}` as FechaISO;
}

// Første dag i måneden etter datoen.
export function forsteIManedenEtter(fecha: FechaISO): FechaISO {
  const ar = Number(fecha.slice(0, 4));
  const maned = Number(fecha.slice(5, 7));
  return maned === 12 ? iso(ar + 1, 1, 1) : iso(ar, maned + 1, 1);
}

// Siste dag i måneden som ligger (antall - 1) måneder etter en dato som er den første i måneden.
export function sisteDagEtterManeder(start: FechaISO, antall: number): FechaISO {
  const t = Number(start.slice(0, 4)) * 12 + Number(start.slice(5, 7)) - 1 + antall - 1;
  const ar = Math.floor(t / 12);
  const maned = (t % 12) + 1;
  return iso(ar, maned, dagerIManed(ar, maned));
}
