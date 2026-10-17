import { enMapa, ErrorEntrada } from "@/motor/calculo";

export const REQ_BVG = {
  "ch.bvg-eintrittsschwelle": "numero",
  "ch.bvg-koordinationsabzug": "numero",
  "ch.bvg-obere-grenze": "numero",
  "ch.bvg-min-koordinierter-lohn": "numero",
  "ch.bvg-altersgutschriften": "mapa",
} as const;

export const REQ_LOHN = {
  ...REQ_BVG,
  "ch.ahv-iv-eo-beitragssatz": "numero",
  "ch.alv-beitragssatz": "numero",
  "ch.hoechster-versicherter-verdienst": "numero",
} as const;

export interface BvgWerte {
  eintrittsschwelle: number;
  koordinationsabzug: number;
  obereGrenze: number;
  minKoordiniert: number;
  gutschriften: Readonly<Record<string, number>>;
}

export interface LohnWerte extends BvgWerte {
  ahvSatz: number;
  alvSatz: number;
  hoechstlohn: number;
}

type ValoresBvg = { readonly [K in keyof typeof REQ_BVG]: (typeof REQ_BVG)[K] extends "mapa" ? Readonly<Record<string, number>> : number };
type ValoresLohn = ValoresBvg & {
  readonly "ch.ahv-iv-eo-beitragssatz": number;
  readonly "ch.alv-beitragssatz": number;
  readonly "ch.hoechster-versicherter-verdienst": number;
};

export function bvgWerteAus(v: ValoresBvg): BvgWerte {
  return {
    eintrittsschwelle: v["ch.bvg-eintrittsschwelle"],
    koordinationsabzug: v["ch.bvg-koordinationsabzug"],
    obereGrenze: v["ch.bvg-obere-grenze"],
    minKoordiniert: v["ch.bvg-min-koordinierter-lohn"],
    gutschriften: v["ch.bvg-altersgutschriften"],
  };
}

export function lohnWerteAus(v: ValoresLohn): LohnWerte {
  return {
    ...bvgWerteAus(v),
    ahvSatz: v["ch.ahv-iv-eo-beitragssatz"],
    alvSatz: v["ch.alv-beitragssatz"],
    hoechstlohn: v["ch.hoechster-versicherter-verdienst"],
  };
}

// Art. 16 BVG: die Altersgutschrift richtet sich nach dem Altersjahr (Kalenderjahr minus Geburtsjahr).
export function altersgruppe(alter: number): string | null {
  if (alter < 25 || alter > 65) return null;
  if (alter <= 34) return "25-34";
  if (alter <= 44) return "35-44";
  if (alter <= 54) return "45-54";
  return "55-65";
}

export interface Bvg {
  versichert: boolean;
  koordinierterLohn: number;
  satz: number;
  altersgutschrift: number;
}

export function bvgJahr(jahreslohn: number, alter: number, w: BvgWerte): Bvg {
  if (jahreslohn <= w.eintrittsschwelle) return { versichert: false, koordinierterLohn: 0, satz: 0, altersgutschrift: 0 };
  const koordinierterLohn = Math.max(Math.min(jahreslohn, w.obereGrenze) - w.koordinationsabzug, w.minKoordiniert);
  const gruppe = altersgruppe(alter);
  const satz = gruppe === null ? 0 : enMapa(w.gutschriften, gruppe);
  return { versichert: true, koordinierterLohn, satz, altersgutschrift: (koordinierterLohn * satz) / 100 };
}

export interface LohnEingabe {
  monatslohn: number;
  anzahlLoehne: number;
  alter: number;
  nbuSatz: number;
  ktgSatz: number;
  bvgMonat: number | null;
}

export interface Abzuege {
  jahreslohn: number;
  ahv: number;
  alv: number;
  bvg: number;
  nbu: number;
  ktg: number;
  total: number;
  netto: number;
  ahvJahr: number;
  alvJahr: number;
  bvgJahr: number;
  nbuJahr: number;
  ktgJahr: number;
  nettoJahr: number;
  bvgDaten: Bvg;
  bvgGeschaetzt: boolean;
}

export function pruefeAlter(alter: number, feld: string): void {
  if (!Number.isInteger(alter) || alter < 15 || alter > 70) throw new ErrorEntrada("Bitte ein Alter zwischen 15 und 70 Jahren eingeben.", feld);
}

// Monatliche Werte gelten für einen normalen Monatslohn. ALV und NBU sind nur bis zum höchsten
// versicherten Verdienst geschuldet; die Grenze wird auf den Monat (ein Zwölftel) und aufs Jahr angewendet.
export function abzuegeArbeitnehmer(e: LohnEingabe, w: LohnWerte, redondear: (n: number) => number): Abzuege {
  const jahreslohn = e.monatslohn * e.anzahlLoehne;
  const halbAhv = w.ahvSatz / 2;
  const halbAlv = w.alvSatz / 2;
  const grenzeMonat = w.hoechstlohn / 12;
  const ahv = redondear((e.monatslohn * halbAhv) / 100);
  const alv = redondear((Math.min(e.monatslohn, grenzeMonat) * halbAlv) / 100);
  const nbu = redondear((Math.min(e.monatslohn, grenzeMonat) * e.nbuSatz) / 100);
  const ktg = redondear((e.monatslohn * e.ktgSatz) / 100);
  const bvgDaten = bvgJahr(jahreslohn, e.alter, w);
  const bvgGeschaetzt = e.bvgMonat === null;
  const bvg = e.bvgMonat === null ? redondear(bvgDaten.altersgutschrift / 2 / 12) : redondear(e.bvgMonat);
  const total = redondear(ahv + alv + bvg + nbu + ktg);
  const ahvJahr = redondear((jahreslohn * halbAhv) / 100);
  const alvJahr = redondear((Math.min(jahreslohn, w.hoechstlohn) * halbAlv) / 100);
  const nbuJahr = redondear((Math.min(jahreslohn, w.hoechstlohn) * e.nbuSatz) / 100);
  const ktgJahr = redondear((jahreslohn * e.ktgSatz) / 100);
  const bvgJahrBetrag = redondear(bvg * 12);
  return {
    jahreslohn: redondear(jahreslohn),
    ahv,
    alv,
    bvg,
    nbu,
    ktg,
    total,
    netto: redondear(e.monatslohn - total),
    ahvJahr,
    alvJahr,
    bvgJahr: bvgJahrBetrag,
    nbuJahr,
    ktgJahr,
    nettoJahr: redondear(jahreslohn - ahvJahr - alvJahr - bvgJahrBetrag - nbuJahr - ktgJahr),
    bvgDaten,
    bvgGeschaetzt,
  };
}

export function bvgHinweis(a: Abzuege, alter: number): string[] {
  if (!a.bvgGeschaetzt) return [];
  if (!a.bvgDaten.versichert) return ["Der Jahreslohn liegt nicht über der BVG-Eintrittsschwelle. Ein BVG-Abzug ist gesetzlich nicht vorgeschrieben."];
  if (a.bvgDaten.satz === 0)
    return [
      alter < 25
        ? "Vor dem 25. Altersjahr gibt es noch keine Altersgutschriften. Die Risikoprämie Ihrer Pensionskasse ist nicht eingerechnet."
        : "Nach dem 65. Altersjahr gibt es keine gesetzlichen Altersgutschriften mehr.",
    ];
  return ["Der BVG-Abzug ist geschätzt: die Hälfte der gesetzlichen Altersgutschrift, ohne Risikoprämie. Ihr Lohnausweis oder das Reglement Ihrer Pensionskasse zeigt den genauen Betrag."];
}
