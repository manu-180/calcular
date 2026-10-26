import { doGroszy, doZlotych, podatekWedlugSkali, type Skala } from "./podatki";
import { progRyczaltu } from "./dzialalnosc";

export interface WejscieB2b {
  przychod: number;
  koszty: number;
  spoleczne: number;
  fpFs: number;
}

export interface ParametryB2b {
  skala: Skala;
  liniowy: number;
  zdrowotna: number;
  zdrowotnaLiniowa: number;
  zdrowotnaMinimalna: number;
  limitZdrowotnejLiniowy: number;
  podstawyRyczaltu: Readonly<Record<string, number>>;
  odliczenieZdrowotnejRyczalt: number;
}

export interface WynikFormy {
  zdrowotna: number;
  podatekRoczny: number;
  naReke: number;
}

function naReke(miesiecznieProPrzedPodatkiem: number, podatekRoczny: number): number {
  return doGroszy((12 * miesiecznieProPrzedPodatkiem - podatekRoczny) / 12);
}

export function skala(w: WejscieB2b, p: ParametryB2b): WynikFormy {
  const baza = w.przychod - w.koszty - w.spoleczne;
  const zdrowotna = Math.max(p.zdrowotnaMinimalna, doGroszy((Math.max(0, baza) * p.zdrowotna) / 100));
  const podatekRoczny = doZlotych(podatekWedlugSkali(Math.max(0, doZlotych(12 * baza)), p.skala));
  return { zdrowotna, podatekRoczny, naReke: naReke(baza - w.fpFs - zdrowotna, podatekRoczny) };
}

export function liniowy(w: WejscieB2b, p: ParametryB2b): WynikFormy {
  const baza = w.przychod - w.koszty - w.spoleczne;
  const zdrowotna = Math.max(p.zdrowotnaMinimalna, doGroszy((Math.max(0, baza) * p.zdrowotnaLiniowa) / 100));
  const odliczenie = Math.min(12 * zdrowotna, p.limitZdrowotnejLiniowy);
  const podstawa = Math.max(0, doZlotych(12 * baza - odliczenie));
  const podatekRoczny = doZlotych((podstawa * p.liniowy) / 100);
  return { zdrowotna, podatekRoczny, naReke: naReke(baza - w.fpFs - zdrowotna, podatekRoczny) };
}

export function ryczalt(w: WejscieB2b, p: ParametryB2b, stawka: number): WynikFormy & { prog: string } {
  const prog = progRyczaltu(12 * w.przychod);
  const zdrowotna = doGroszy((p.podstawyRyczaltu[prog] * p.zdrowotna) / 100);
  const podstawa = Math.max(0, doZlotych(12 * w.przychod - 12 * w.spoleczne - (12 * zdrowotna * p.odliczenieZdrowotnejRyczalt) / 100));
  const podatekRoczny = doZlotych((podstawa * stawka) / 100);
  return { zdrowotna, podatekRoczny, naReke: naReke(w.przychod - w.koszty - w.spoleczne - w.fpFs - zdrowotna, podatekRoczny), prog };
}
