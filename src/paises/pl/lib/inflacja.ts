import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import { nazwaMiesiaca } from "./kalendarz";

export function miesiacRok(fecha: string): string {
  return `${nazwaMiesiaca(Number(fecha.slice(5, 7)))} ${fecha.slice(0, 4)}`;
}

function poczatekMiesiaca(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

function miesiaceWstecz(fecha: FechaISO, n: number): FechaISO {
  const t = Number(fecha.slice(0, 4)) * 12 + Number(fecha.slice(5, 7)) - 1 - n;
  return `${Math.floor(t / 12)}-${String((t % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface Zmiana {
  od: FechaISO;
  do: FechaISO;
  indeksOd: number;
  indeksDo: number;
  mnoznik: number;
  laczna: number;
  rokDoRoku: number | null;
  uwagi: string[];
}

// Silnik podaje tylko ostatni punkt serii; historia z series.json jest obcięta do niego, żeby przypadek
// z ustaloną datą nie widział miesięcy opublikowanych później.
export function zmianaCen(punkty: readonly PuntoSerieTupla[], ostatni: PuntoSerie, od: FechaISO, do_: FechaISO, pola: { od: string; do: string }): Zmiana {
  const dostepne = punkty.filter(([f]) => f <= ostatni.fecha);
  const indeks = new Map<string, number>(dostepne);
  const pierwszy = dostepne[0]?.[0];
  if (!pierwszy) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const uwagi: string[] = [];
  const m1 = poczatekMiesiaca(od);
  let m2 = poczatekMiesiaca(do_);
  if (m1 < pierwszy) throw new ErrorEntrada(`Dane zaczynają się od miesiąca: ${miesiacRok(pierwszy)}.`, pola.od);
  if (m1 > ostatni.fecha) throw new ErrorEntrada(`GUS nie opublikował jeszcze danych za ten miesiąc. Ostatnie są za: ${miesiacRok(ostatni.fecha)}.`, pola.od);
  if (m2 > ostatni.fecha) {
    uwagi.push(`Ostatnie dane GUS są za: ${miesiacRok(ostatni.fecha)}. Do tego miesiąca liczymy.`);
    m2 = ostatni.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Miesiąc początkowy musi być wcześniejszy niż końcowy.", pola.od);
  const indeksOd = indeks.get(m1);
  const indeksDo = indeks.get(m2);
  if (indeksOd === undefined || indeksDo === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const rokWczesniej = indeks.get(miesiaceWstecz(m2, 12));
  const mnoznik = indeksDo / indeksOd;
  return {
    od: m1,
    do: m2,
    indeksOd,
    indeksDo,
    mnoznik,
    laczna: (mnoznik - 1) * 100,
    rokDoRoku: rokWczesniej === undefined ? null : (indeksDo / rokWczesniej - 1) * 100,
    uwagi,
  };
}
