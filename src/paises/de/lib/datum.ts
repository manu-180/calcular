import type { FechaISO } from "@/motor/tipos";

// Kalenderrechnung ohne Date, damit calcular() rein bleibt: Tage seit 1970 nach dem Algorithmus
// "days from civil" (proleptischer gregorianischer Kalender).
export interface Tag {
  j: number;
  m: number;
  t: number;
}

export function lesen(f: string): Tag {
  return { j: Number(f.slice(0, 4)), m: Number(f.slice(5, 7)), t: Number(f.slice(8, 10)) };
}

export function schreiben(d: Tag): FechaISO {
  return `${String(d.j).padStart(4, "0")}-${String(d.m).padStart(2, "0")}-${String(d.t).padStart(2, "0")}` as FechaISO;
}

export function tageImMonat(j: number, m: number): number {
  if (m === 2) return j % 4 === 0 && (j % 100 !== 0 || j % 400 === 0) ? 29 : 28;
  return [4, 6, 9, 11].includes(m) ? 30 : 31;
}

function tageSeitEpoche(d: Tag): number {
  const y = d.m <= 2 ? d.j - 1 : d.j;
  const era = Math.floor(y / 400);
  const yoe = y - era * 400;
  const doy = Math.floor((153 * (d.m + (d.m > 2 ? -3 : 9)) + 2) / 5) + d.t - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}

function ausTagen(z0: number): Tag {
  const z = z0 + 719468;
  const era = Math.floor(z / 146097);
  const doe = z - era * 146097;
  const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
  const mp = Math.floor((5 * doy + 2) / 153);
  const t = doy - Math.floor((153 * mp + 2) / 5) + 1;
  const m = mp < 10 ? mp + 3 : mp - 9;
  return { j: yoe + era * 400 + (m <= 2 ? 1 : 0), m, t };
}

export function plusTage(d: Tag, n: number): Tag {
  return ausTagen(tageSeitEpoche(d) + n);
}

export function tageZwischen(a: Tag, b: Tag): number {
  return tageSeitEpoche(b) - tageSeitEpoche(a);
}

// § 188 Absatz 3 BGB: fehlt der Tag im Zielmonat, endet die Frist am letzten Tag des Monats.
export function plusMonate(d: Tag, n: number): Tag {
  const gesamt = d.j * 12 + d.m - 1 + n;
  const j = Math.floor(gesamt / 12);
  const m = (gesamt % 12) + 1;
  return { j, m, t: Math.min(d.t, tageImMonat(j, m)) };
}

export function monatsende(d: Tag): Tag {
  return { j: d.j, m: d.m, t: tageImMonat(d.j, d.m) };
}

export function volleJahre(von: Tag, bis: Tag): number {
  let jahre = bis.j - von.j;
  if (bis.m < von.m || (bis.m === von.m && bis.t < von.t)) jahre--;
  return Math.max(jahre, 0);
}

export function vor(a: Tag, b: Tag): boolean {
  return tageSeitEpoche(a) < tageSeitEpoche(b);
}
