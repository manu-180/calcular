import { aplicarEscala, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const REQ_DBST = {
  "ch.dbst-tarif-alleinstehend": "escala",
  "ch.dbst-tarif-verheiratet": "escala",
  "ch.dbst-kinderermaessigung": "numero",
  "ch.dbst-mindestbetrag": "numero",
} as const;

export const ZIVILSTAND = [
  { valor: "alleinstehend", etiqueta: "Alleinstehend" },
  { valor: "verheiratet", etiqueta: "Verheiratet oder eingetragene Partnerschaft" },
] as const;
export type Zivilstand = (typeof ZIVILSTAND)[number]["valor"];

export interface DbstWerte {
  alleinstehend: readonly FilaEscala[];
  verheiratet: readonly FilaEscala[];
  kinderermaessigung: number;
  mindestbetrag: number;
}

export function dbstWerteAus(v: {
  readonly "ch.dbst-tarif-alleinstehend": readonly FilaEscala[];
  readonly "ch.dbst-tarif-verheiratet": readonly FilaEscala[];
  readonly "ch.dbst-kinderermaessigung": number;
  readonly "ch.dbst-mindestbetrag": number;
}): DbstWerte {
  return {
    alleinstehend: v["ch.dbst-tarif-alleinstehend"],
    verheiratet: v["ch.dbst-tarif-verheiratet"],
    kinderermaessigung: v["ch.dbst-kinderermaessigung"],
    mindestbetrag: v["ch.dbst-mindestbetrag"],
  };
}

// Der Tarif in Art. 36 DBG steigt "für je weitere 100 Franken": angebrochene Hunderter zählen nicht.
export function aufHundertAbgerundet(einkommen: number): number {
  return Math.floor(Math.max(einkommen, 0) / 100) * 100;
}

// Art. 36 Abs. 2bis DBG: Wer mit Kindern im gleichen Haushalt lebt, wird nach dem Tarif für
// Verheiratete besteuert, auch wenn er alleinstehend ist.
export function tarifFuer(zivilstand: Zivilstand, kinder: number, w: DbstWerte): readonly FilaEscala[] {
  return zivilstand === "verheiratet" || kinder > 0 ? w.verheiratet : w.alleinstehend;
}

export function tarifsteuer(einkommen: number, tarif: readonly FilaEscala[]): number {
  return aplicarEscala(tarif, aufHundertAbgerundet(einkommen));
}

export interface Bundessteuer {
  basis: number;
  tarifsteuer: number;
  ermaessigung: number;
  steuer: number;
}

export function bundessteuer(einkommen: number, zivilstand: Zivilstand, kinder: number, w: DbstWerte, redondear: (n: number) => number): Bundessteuer {
  const basis = aufHundertAbgerundet(einkommen);
  const roh = redondear(aplicarEscala(tarifFuer(zivilstand, kinder, w), basis));
  const ermaessigung = Math.min(roh, kinder * w.kinderermaessigung);
  const nachKindern = redondear(roh - ermaessigung);
  return { basis, tarifsteuer: roh, ermaessigung, steuer: nachKindern < w.mindestbetrag ? 0 : nachKindern };
}

export function pruefeKinder(kinder: number, feld: string): void {
  if (!Number.isInteger(kinder) || kinder < 0 || kinder > 15) throw new ErrorEntrada("Bitte eine Zahl von 0 bis 15 eingeben.", feld);
}

export function grenzsteuersatz(einkommen: number, zivilstand: Zivilstand, kinder: number, w: DbstWerte): number {
  const tarif = tarifFuer(zivilstand, kinder, w);
  const basis = aufHundertAbgerundet(einkommen);
  return aplicarEscala(tarif, basis + 100) - aplicarEscala(tarif, basis);
}
