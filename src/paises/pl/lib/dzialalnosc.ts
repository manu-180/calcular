import { enMapa } from "@/motor/calculo";
import { doGroszy } from "./podatki";

export interface StopySpoleczne {
  emerytalne: number;
  rentowe: number;
  chorobowe: number;
  wypadkowe: number;
  fpFs: number;
}

// Składka emerytalna i rentowa przedsiębiorcy to suma części pracownika i płatnika (art. 22 ust. 1:
// 19,52 % i 8 %). FP i FS razem według ustawy budżetowej.
export function stopyPrzedsiebiorcy(
  pracownik: Readonly<Record<string, number>>,
  platnik: Readonly<Record<string, number>>,
  wypadkowe: number,
  fundusze: Readonly<Record<string, number>>,
): StopySpoleczne {
  return {
    emerytalne: enMapa(pracownik, "emerytalne") + enMapa(platnik, "emerytalne"),
    rentowe: enMapa(pracownik, "rentowe") + enMapa(platnik, "rentowe"),
    chorobowe: enMapa(pracownik, "chorobowe"),
    wypadkowe,
    fpFs: enMapa(fundusze, "fp") + enMapa(fundusze, "fs"),
  };
}

export interface SkladkiSpoleczne {
  podstawa: number;
  emerytalne: number;
  rentowe: number;
  chorobowe: number;
  wypadkowe: number;
  fpFs: number;
  spoleczne: number;
  razem: number;
}

// FP i FS nie płaci się od podstawy preferencyjnej ani przy uldze na start; przy pełnym ZUS i małym
// ZUS plus tak, chyba że osoba skończyła 55 lat (kobieta) lub 60 lat (mężczyzna).
export function skladkiOdPodstawy(podstawa: number, s: StopySpoleczne, opcje: { chorobowe: boolean; fpFs: boolean }): SkladkiSpoleczne {
  const emerytalne = doGroszy((podstawa * s.emerytalne) / 100);
  const rentowe = doGroszy((podstawa * s.rentowe) / 100);
  const chorobowe = opcje.chorobowe ? doGroszy((podstawa * s.chorobowe) / 100) : 0;
  const wypadkowe = doGroszy((podstawa * s.wypadkowe) / 100);
  const fpFs = opcje.fpFs ? doGroszy((podstawa * s.fpFs) / 100) : 0;
  const spoleczne = doGroszy(emerytalne + rentowe + chorobowe + wypadkowe);
  return { podstawa, emerytalne, rentowe, chorobowe, wypadkowe, fpFs, spoleczne, razem: doGroszy(spoleczne + fpFs) };
}

export const ZERO: SkladkiSpoleczne = { podstawa: 0, emerytalne: 0, rentowe: 0, chorobowe: 0, wypadkowe: 0, fpFs: 0, spoleczne: 0, razem: 0 };

export function progRyczaltu(przychodRoczny: number): "do-60000" | "do-300000" | "ponad-300000" {
  if (przychodRoczny <= 60000) return "do-60000";
  if (przychodRoczny <= 300000) return "do-300000";
  return "ponad-300000";
}
