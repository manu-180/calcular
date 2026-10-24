import { ErrorEntrada } from "@/motor/calculo";
type MapaValores = Readonly<Record<string, number>>;

export const ANZAHL = [
  { valor: "12", etiqueta: "12 Monatslöhne" },
  { valor: "13", etiqueta: "13 Monatslöhne" },
] as const;

export const ALTER_HILFE = "Kalenderjahr minus Geburtsjahr.";

export const REQ_LOHN = {
  "li.beitraege-arbeitnehmer": "mapa",
  "li.beitraege-arbeitgeber": "mapa",
  "li.alv-satz": "numero",
  "li.alv-hoechstlohn": "numero",
  "li.ahv-mindestrente": "numero",
  "li.bpv-altersbeitrag": "numero",
} as const;

export interface Parameter {
  an: MapaValores;
  ag: MapaValores;
  alvSatz: number;
  alvHoechst: number;
  mindestrente: number;
  bpvSatz: number;
}

export function summe(m: MapaValores): number {
  return Object.values(m).reduce((s, v) => s + v, 0);
}

export function satzAn(p: Parameter): number {
  return summe(p.an);
}

export function satzAg(p: Parameter): number {
  return summe(p.ag);
}

// ALV: je die Hälfte von 1 % bis 126 000 Franken Jahreslohn; darüber keine Beiträge.
export function alvHaelfte(jahreslohn: number, p: Parameter): number {
  return (Math.min(jahreslohn, p.alvHoechst) * p.alvSatz) / 2 / 100;
}

// BPVG Art. 4: versicherungspflichtig ab einem Jahreslohn in Höhe der minimalen jährlichen AHV-Altersrente,
// für das Alter ab dem 1. Januar nach dem vollendeten 19. Altersjahr (Kalenderjahr minus Geburtsjahr 20 oder mehr).
export function bpvPflichtig(jahreslohn: number, alter: number, p: Parameter): boolean {
  return jahreslohn >= p.mindestrente * 12 && alter >= 20;
}

// Art. 6 Abs. 1 und Art. 7 BPVG: mindestens 8 % des ganzen AHV-Jahreslohns, der Arbeitgeber trägt mindestens die Hälfte.
export function bpvMindestHaelfte(jahreslohn: number, alter: number, p: Parameter): number {
  return bpvPflichtig(jahreslohn, alter, p) ? (jahreslohn * p.bpvSatz) / 2 / 100 : 0;
}

export function verifiziereLohn(lohn: number, feld: string): void {
  if (!(lohn > 0)) throw new ErrorEntrada("Bitte einen Bruttolohn über null eingeben.", feld);
}

export function verifiziereAlter(alter: number): void {
  if (!Number.isInteger(alter) || alter < 15 || alter > 70) throw new ErrorEntrada("Bitte ein Alter zwischen 15 und 70 Jahren eingeben.", "alter");
}

type ValoresLohn = { readonly [K in keyof typeof REQ_LOHN]: (typeof REQ_LOHN)[K] extends "mapa" ? MapaValores : number };

export function parameter(v: ValoresLohn): Parameter {
  return {
    an: v["li.beitraege-arbeitnehmer"],
    ag: v["li.beitraege-arbeitgeber"],
    alvSatz: v["li.alv-satz"],
    alvHoechst: v["li.alv-hoechstlohn"],
    mindestrente: v["li.ahv-mindestrente"],
    bpvSatz: v["li.bpv-altersbeitrag"],
  };
}
