import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// Ordynacja podatkowa, art. 63 § 1: podstawę i kwotę podatku zaokrągla się do pełnych złotych
// (końcówki od 50 groszy w górę).
export function doZlotych(x: number): number {
  return Math.sign(x) * Math.round(Math.abs(x) + 1e-9);
}

export function doGroszy(x: number): number {
  return Math.sign(x) * Math.round(Math.abs(x) * 100 + 1e-7) / 100;
}

// Art. 63 § 1a: przy odsetkach (art. 30a ust. 1 pkt 1 do 3) do pełnych groszy w górę.
export function doGroszyWGore(x: number): number {
  return Math.ceil(x * 100 - 1e-7) / 100;
}

export interface Skala {
  progi: readonly FilaEscala[];
  kwotaZmniejszajaca: number;
}

// Art. 27 ust. 1: 12 % minus kwota zmniejszająca do progu, 32 % od nadwyżki.
export function podatekWedlugSkali(podstawa: number, skala: Skala): number {
  if (podstawa <= 0) return 0;
  return Math.max(0, aplicarEscalaMarginal(skala.progi, podstawa) - skala.kwotaZmniejszajaca);
}

export function prog(skala: Skala): number {
  return skala.progi[0].hasta ?? Infinity;
}

export interface SkladkiPracownika {
  emerytalne: number;
  rentowe: number;
  chorobowe: number;
}

export interface ParametryEtatu {
  skala: Skala;
  skladki: SkladkiPracownika;
  zdrowotna: number;
  limit30: number;
  koszty: number;
  pit2: boolean;
  limitMlodych: number | null;
}

export interface MiesiacEtatu {
  miesiac: number;
  brutto: number;
  emerytalne: number;
  rentowe: number;
  chorobowe: number;
  zdrowotna: number;
  zaliczka: number;
  netto: number;
}

// Umowa o pracę: rok liczony miesiąc po miesiącu, bo limit 30-krotności, próg 120 000 zł i limit ulgi
// dla młodych działają narastająco od początku roku.
export function rokNaEtacie(bruttoMiesieczne: number, p: ParametryEtatu): MiesiacEtatu[] {
  const wynik: MiesiacEtatu[] = [];
  let podstawaEmRentNarastajaco = 0;
  let przychodNarastajaco = 0;
  let podstawaPodatkuNarastajaco = 0;
  const kwotaMiesieczna = p.skala.kwotaZmniejszajaca / 12;
  const granica = prog(p.skala);
  for (let m = 1; m <= 12; m++) {
    const b = bruttoMiesieczne;
    const podstawaEmRent = Math.max(0, Math.min(b, p.limit30 - podstawaEmRentNarastajaco));
    podstawaEmRentNarastajaco += podstawaEmRent;
    const emerytalne = doGroszy((podstawaEmRent * p.skladki.emerytalne) / 100);
    const rentowe = doGroszy((podstawaEmRent * p.skladki.rentowe) / 100);
    const chorobowe = doGroszy((b * p.skladki.chorobowe) / 100);
    const spoleczne = emerytalne + rentowe + chorobowe;
    const zdrowotna = doGroszy(((b - spoleczne) * p.zdrowotna) / 100);

    // Część przychodu ponad limit ulgi dla młodych jest opodatkowana, reszta zwolniona.
    let opodatkowany = b;
    if (p.limitMlodych !== null) {
      opodatkowany = Math.max(0, przychodNarastajaco + b - p.limitMlodych) - Math.max(0, przychodNarastajaco - p.limitMlodych);
    }
    przychodNarastajaco += b;
    let zaliczka = 0;
    if (opodatkowany > 0) {
      const udzial = opodatkowany / b;
      const spoleczneOdliczane = spoleczne * udzial;
      const podstawa = Math.max(0, doZlotych(opodatkowany - spoleczneOdliczane - p.koszty));
      const doProgu = Math.max(0, Math.min(podstawa, granica - podstawaPodatkuNarastajaco));
      const ponad = podstawa - doProgu;
      podstawaPodatkuNarastajaco += podstawa;
      const t1 = p.skala.progi[0].tasa;
      const t2 = p.skala.progi[1]?.tasa ?? t1;
      zaliczka = Math.max(0, doZlotych((doProgu * t1 + ponad * t2) / 100 - (p.pit2 ? kwotaMiesieczna : 0)));
    }
    const netto = doGroszy(b - spoleczne - zdrowotna - zaliczka);
    wynik.push({ miesiac: m, brutto: b, emerytalne, rentowe, chorobowe, zdrowotna, zaliczka, netto });
  }
  return wynik;
}

export function suma(miesiace: readonly MiesiacEtatu[], pole: keyof MiesiacEtatu): number {
  return doGroszy(miesiace.reduce((s, m) => s + m[pole], 0));
}
