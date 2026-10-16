import type { FechaISO } from "@/motor/tipos";

export const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export function parties(fecha: string): { a: number; m: number; j: number } {
  return { a: Number(fecha.slice(0, 4)), m: Number(fecha.slice(5, 7)), j: Number(fecha.slice(8, 10)) };
}

export function iso(a: number, m: number, j: number): FechaISO {
  return `${a}-${String(m).padStart(2, "0")}-${String(j).padStart(2, "0")}` as FechaISO;
}

export function joursDuMois(a: number, m: number): number {
  return new Date(Date.UTC(a, m, 0)).getUTCDate();
}

export function plusJours(fecha: string, jours: number): FechaISO {
  const { a, m, j } = parties(fecha);
  const d = new Date(Date.UTC(a, m - 1, j + jours));
  return iso(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

export function plusMois(fecha: string, mois: number): FechaISO {
  const { a, m, j } = parties(fecha);
  const total = a * 12 + (m - 1) + mois;
  const na = Math.floor(total / 12);
  const nm = (total % 12) + 1;
  return iso(na, nm, Math.min(j, joursDuMois(na, nm)));
}

export function anneesCompletes(debut: string, fin: string): number {
  const x = parties(debut);
  const y = parties(fin);
  let n = y.a - x.a;
  if (y.m < x.m || (y.m === x.m && y.j < x.j)) n -= 1;
  return Math.max(n, 0);
}

export function nomDuMois(fecha: string): string {
  return `${MOIS[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}
