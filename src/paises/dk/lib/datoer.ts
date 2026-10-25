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

export function datoTekst(d: string): string {
  const [a, m, dag] = dele(d);
  return `${dag}. ${MAANEDER[m - 1]} ${a}`;
}
