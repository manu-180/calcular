import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MJESECI = ["siječanj", "veljača", "ožujak", "travanj", "svibanj", "lipanj", "srpanj", "kolovoz", "rujan", "listopad", "studeni", "prosinac"];

export function mjesecGodina(fecha: string): string {
  return `${MJESECI[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}.`;
}

function pocetakMjeseca(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface Promjena {
  od: FechaISO;
  do: FechaISO;
  faktor: number;
  ukupno: number;
  napomene: string[];
}

// Motor predaje samo posljednju točku serije, pa se povijest iz series.json siječe na tu točku: slučaj s
// fiksnim datumom ne smije vidjeti mjesece objavljene kasnije.
export function promjena(tocke: readonly PuntoSerieTupla[], zadnja: PuntoSerie, od: FechaISO, doDatuma: FechaISO, polja: { od: string; do: string }): Promjena {
  const dostupne = tocke.filter(([f]) => f <= zadnja.fecha);
  const indeks = new Map<string, number>(dostupne);
  const prva = dostupne[0]?.[0];
  if (!prva) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const napomene: string[] = [];
  const m1 = pocetakMjeseca(od);
  let m2 = pocetakMjeseca(doDatuma);
  if (m1 < prva) throw new ErrorEntrada(`Podaci postoje od ovog mjeseca: ${mjesecGodina(prva)}`, polja.od);
  if (m1 > zadnja.fecha) throw new ErrorEntrada(`Za taj mjesec još nema podatka. Zadnji je: ${mjesecGodina(zadnja.fecha)}`, polja.od);
  if (m2 > zadnja.fecha) {
    napomene.push(`Zadnji objavljeni podatak je za ${mjesecGodina(zadnja.fecha)} Računali smo do tog mjeseca.`);
    m2 = zadnja.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Početni mjesec ne može biti nakon završnog.", polja.od);
  const i1 = indeks.get(m1);
  const i2 = indeks.get(m2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const faktor = i2 / i1;
  return { od: m1, do: m2, faktor, ukupno: (faktor - 1) * 100, napomene };
}
