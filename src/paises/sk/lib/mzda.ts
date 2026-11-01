import type { FilaEscala } from "@/motor/tipos";
import type { ParametreMzdy } from "./parametre";
import { nadol, najblizsie } from "./zaokruhlenie";

// Daň progresiva: delitel 12 da las franjas mensuales de § 35 ods. 2 (3 665,28; 5 029,10; 6 250,86).
export function danProgresivna(zaklad: number, pasma: readonly FilaEscala[], delitel = 1): number {
  if (zaklad <= 0) return 0;
  let dan = 0;
  for (const p of pasma) {
    const od = najblizsie(p.desde / delitel);
    const po = p.hasta === null ? Infinity : najblizsie(p.hasta / delitel);
    if (zaklad > od) dan += ((Math.min(zaklad, po) - od) * p.tasa) / 100;
  }
  return najblizsie(dan);
}

// Nezdaniteľná časť pri ročnom zúčtovaní: § 11 ods. 2.
export function nezdanitelnaCast(zaklad: number, plna: number, hranica: number, suma: number): number {
  if (zaklad <= hranica) return plna;
  return Math.max(0, najblizsie(suma - zaklad / 3));
}

export function poistne(zaklad: number, sadzby: Readonly<Record<string, number>>, strop: number, bezStropu: readonly string[] = []): number {
  let spolu = 0;
  for (const [k, s] of Object.entries(sadzby)) {
    spolu += nadol(((bezStropu.includes(k) ? zaklad : Math.min(zaklad, strop)) * s) / 100);
  }
  return Math.round(spolu * 100) / 100;
}

// Limit de § 33 ods. 6 y reducción de ods. 11. Para la nómina mensual se usa 1/12 de la franja anual,
// porque § 35 ods. 5 aplica el límite «za príslušný kalendárny mesiac».
export function danovyBonus(zaklad: number, do15: number, od15: number, p: ParametreMzdy, mesiace = 1): number {
  const deti = do15 + od15;
  if (deti <= 0 || zaklad <= 0) return 0;
  const hranica = (p.bonusHranica * mesiace) / 12;
  const znizenie = zaklad > hranica ? (zaklad - hranica) / 10 : 0;
  const naDieta = (suma: number) => Math.max(0, suma * mesiace - znizenie);
  const narok = do15 * naDieta(p.bonus.do15) + od15 * naDieta(p.bonus.od15);
  const limit = (zaklad * p.bonusLimit[`d${Math.min(deti, 6)}`]) / 100;
  return najblizsie(Math.min(narok, limit));
}

export interface Mzda {
  socialne: number;
  zdravotne: number;
  zdanitelna: number;
  zakladDane: number;
  dan: number;
  bonus: number;
  cista: number;
  socialneFirma: number;
  zdravotneFirma: number;
  cena: number;
}

export function cistaMzda(hruba: number, do15: number, od15: number, uplatnujeNczd: boolean, p: ParametreMzdy): Mzda {
  const socialne = poistne(hruba, p.zamestnanec, p.maxVz);
  const zdravotne = nadol((hruba * p.zdravotne.zamestnanec) / 100);
  const zdanitelna = najblizsie(hruba - socialne - zdravotne);
  const nczd = uplatnujeNczd ? najblizsie(p.nczd / 12) : 0;
  const zakladDane = Math.max(0, najblizsie(zdanitelna - nczd));
  const dan = danProgresivna(zakladDane, p.pasma, 12);
  const bonus = danovyBonus(zdanitelna, do15, od15, p);
  const socialneFirma = poistne(hruba, p.zamestnavatel, p.maxVz, ["urazove"]);
  const zdravotneFirma = nadol((hruba * p.zdravotne.zamestnavatel) / 100);
  return {
    socialne,
    zdravotne,
    zdanitelna,
    zakladDane,
    dan,
    bonus,
    cista: najblizsie(hruba - socialne - zdravotne - dan + bonus),
    socialneFirma,
    zdravotneFirma,
    cena: najblizsie(hruba + socialneFirma + zdravotneFirma),
  };
}

// La neta es monótona respecto de la bruta salvo saltos de céntimos: bisección y luego el céntimo que alcanza.
export function hrubaZCistej(cielova: number, do15: number, od15: number, uplatnujeNczd: boolean, p: ParametreMzdy): number {
  let a = 0;
  let b = Math.max(1000, cielova * 3);
  for (let i = 0; i < 60; i++) {
    const m = (a + b) / 2;
    if (cistaMzda(m, do15, od15, uplatnujeNczd, p).cista < cielova) a = m;
    else b = m;
  }
  return Math.ceil(b * 100 - 1e-6) / 100;
}
