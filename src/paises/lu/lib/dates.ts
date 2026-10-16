import type { FechaISO } from "@/motor/tipos";

export const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

export function teile(fecha: string): { j: number; m: number; t: number } {
  return { j: Number(fecha.slice(0, 4)), m: Number(fecha.slice(5, 7)), t: Number(fecha.slice(8, 10)) };
}

export function iso(j: number, m: number, t: number): FechaISO {
  return `${j}-${String(m).padStart(2, "0")}-${String(t).padStart(2, "0")}` as FechaISO;
}

export function tageImMonat(j: number, m: number): number {
  return new Date(Date.UTC(j, m, 0)).getUTCDate();
}

export function plusTage(fecha: string, tage: number): FechaISO {
  const { j, m, t } = teile(fecha);
  const d = new Date(Date.UTC(j, m - 1, t + tage));
  return iso(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

export function plusMonate(fecha: string, monate: number): FechaISO {
  const { j, m, t } = teile(fecha);
  const gesamt = j * 12 + (m - 1) + monate;
  const nj = Math.floor(gesamt / 12);
  const nm = (gesamt % 12) + 1;
  return iso(nj, nm, Math.min(t, tageImMonat(nj, nm)));
}

export function monatsende(fecha: string): FechaISO {
  const { j, m } = teile(fecha);
  return iso(j, m, tageImMonat(j, m));
}

export function tageZwischen(von: string, bis: string): number {
  const a = teile(von);
  const b = teile(bis);
  return Math.round((Date.UTC(b.j, b.m - 1, b.t) - Date.UTC(a.j, a.m - 1, a.t)) / 86400000);
}

export function datumLang(fecha: string): string {
  const { j, m, t } = teile(fecha);
  return `${t}. ${MONATE[m - 1]} ${j}`;
}

export function monatsname(fecha: string): string {
  return `${MONATE[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

// Vollendete Dienstjahre am Stichtag: ein Dienstjahr ist am gleichen Kalendertag des Folgejahres vollendet.
export function vollendeteJahre(beginn: string, stichtag: string): number {
  const a = teile(beginn);
  const b = teile(stichtag);
  let jahre = b.j - a.j;
  if (b.m < a.m || (b.m === a.m && b.t < a.t)) jahre -= 1;
  return Math.max(jahre, 0);
}
