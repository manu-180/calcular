import type { FechaISO } from "@/motor/tipos";

const MAANEDER = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];

function dele(d: string): [number, number, number] {
  return [Number(d.slice(0, 4)), Number(d.slice(5, 7)), Number(d.slice(8, 10))];
}

function iso(aar: number, maaned: number, dag: number): FechaISO {
  return `${aar}-${String(maaned).padStart(2, "0")}-${String(dag).padStart(2, "0")}` as FechaISO;
}

export function dageIMaaned(aar: number, maaned: number): number {
  if (maaned === 2) return (aar % 4 === 0 && aar % 100 !== 0) || aar % 400 === 0 ? 29 : 28;
  return [4, 6, 9, 11].includes(maaned) ? 30 : 31;
}

// Samme dato n måneder senere; findes dagen ikke (31. i en kort måned), bruges månedens sidste dag.
export function plusMaaneder(d: string, n: number): FechaISO {
  const [a, m, dag] = dele(d);
  const t = a * 12 + (m - 1) + n;
  const aar = Math.floor(t / 12);
  const maaned = (t % 12) + 1;
  return iso(aar, maaned, Math.min(dag, dageIMaaned(aar, maaned)));
}

// Sidste dag i den måned, der ligger n måneder efter d's måned.
export function sidsteDagEfter(d: string, n: number): FechaISO {
  const [a, m] = dele(d);
  const t = a * 12 + (m - 1) + n;
  const aar = Math.floor(t / 12);
  const maaned = (t % 12) + 1;
  return iso(aar, maaned, dageIMaaned(aar, maaned));
}

// Hele år fra fra til til (fødselsdagsreglen).
export function heleAar(fra: string, til: string): number {
  const [a1, m1, d1] = dele(fra);
  const [a2, m2, d2] = dele(til);
  let aar = a2 - a1;
  if (m2 < m1 || (m2 === m1 && d2 < d1)) aar--;
  return aar;
}

export function heleMaaneder(fra: string, til: string): number {
  const [a1, m1, d1] = dele(fra);
  const [a2, m2, d2] = dele(til);
  let n = (a2 - a1) * 12 + (m2 - m1);
  if (d2 < d1) n--;
  return n;
}

export function maanedNavn(maaned: number): string {
  return MAANEDER[maaned - 1];
}

// Dagnummer (proleptisk gregoriansk kalender), så forskellen mellem to datoer er antal dage.
export function dagNummer(d: string): number {
  const [aar, maaned, dag] = dele(d);
  const a = maaned <= 2 ? aar - 1 : aar;
  const m = maaned <= 2 ? maaned + 12 : maaned;
  return Math.floor(365.25 * (a + 4716)) + Math.floor(30.6001 * (m + 1)) + dag + 2 - Math.floor(a / 100) + Math.floor(a / 400);
}

export function dageMellem(fra: string, til: string): number {
  return dagNummer(til) - dagNummer(fra);
}

export function datoTekst(d: string): string {
  const [a, m, dag] = dele(d);
  return `${dag}. ${MAANEDER[m - 1]} ${a}`;
}
