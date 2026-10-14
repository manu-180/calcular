import type { LohnsteuerWerte, SoliWerte, SvSaetze } from "./steuer";

export const REQ_TARIF = {
  "de.est-tarif": "mapa",
  "de.soli-satz": "numero",
  "de.soli-milderung": "numero",
  "de.soli-freigrenze": "numero",
} as const;

export const REQ_SV = {
  "de.kv-allgemein": "numero",
  "de.kv-ermaessigt": "numero",
  "de.kv-zusatzbeitrag": "numero",
  "de.rv-beitragssatz": "numero",
  "de.av-beitragssatz": "numero",
  "de.pv-beitragssatz": "numero",
  "de.pv-zuschlaege": "mapa",
  "de.pv-sachsen": "numero",
  "de.bbg-kv": "numero",
  "de.bbg-rv": "numero",
} as const;

export const REQ_LOHN = {
  ...REQ_TARIF,
  ...REQ_SV,
  "de.arbeitnehmer-pauschbetrag": "numero",
  "de.sonderausgaben-pauschbetrag": "numero",
  "de.entlastungsbetrag-alleinerziehende": "numero",
  "de.lohnsteuer-grenzen": "mapa",
  "de.kinderfreibetrag": "mapa",
} as const;

type Mapa = Readonly<Record<string, number>>;
type ValoresTarif = { readonly [K in keyof typeof REQ_TARIF]: (typeof REQ_TARIF)[K] extends "mapa" ? Mapa : number };
type ValoresSv = { readonly [K in keyof typeof REQ_SV]: (typeof REQ_SV)[K] extends "mapa" ? Mapa : number };
type ValoresLohn = { readonly [K in keyof typeof REQ_LOHN]: (typeof REQ_LOHN)[K] extends "mapa" ? Mapa : number };

export function soliAus(v: ValoresTarif): SoliWerte {
  return { satz: v["de.soli-satz"], milderung: v["de.soli-milderung"], freigrenze: v["de.soli-freigrenze"] };
}

export function svAus(v: ValoresSv, zusatzbeitrag?: number | null): SvSaetze {
  return {
    kvAllgemein: v["de.kv-allgemein"],
    kvErmaessigt: v["de.kv-ermaessigt"],
    kvZusatz: zusatzbeitrag ?? v["de.kv-zusatzbeitrag"],
    rv: v["de.rv-beitragssatz"],
    av: v["de.av-beitragssatz"],
    pv: v["de.pv-beitragssatz"],
    pvKinderlos: v["de.pv-zuschlaege"].kinderlos,
    pvAbschlagJeKind: v["de.pv-zuschlaege"]["abschlag-je-kind"],
    pvSachsen: v["de.pv-sachsen"],
    bbgKvMonat: v["de.bbg-kv"],
    bbgRvMonat: v["de.bbg-rv"],
  };
}

export function lohnWerteAus(v: ValoresLohn, zusatzbeitrag?: number | null): LohnsteuerWerte {
  return {
    tarif: v["de.est-tarif"],
    soli: soliAus(v),
    arbeitnehmerPauschbetrag: v["de.arbeitnehmer-pauschbetrag"],
    sonderausgabenPauschbetrag: v["de.sonderausgaben-pauschbetrag"],
    entlastungsbetrag: v["de.entlastungsbetrag-alleinerziehende"],
    grenzen: v["de.lohnsteuer-grenzen"],
    kinderfreibetrag: v["de.kinderfreibetrag"],
    sv: svAus(v, zusatzbeitrag),
  };
}

export const KINDERFREIBETRAEGE = ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4"].map((z) => ({ valor: z, etiqueta: z.replace(".", ",") }));

export const KINDER_PV = [
  { valor: "kinderlos", etiqueta: "Keine Kinder" },
  { valor: "1", etiqueta: "1 Kind" },
  { valor: "2", etiqueta: "2 Kinder" },
  { valor: "3", etiqueta: "3 Kinder" },
  { valor: "4", etiqueta: "4 Kinder" },
  { valor: "5", etiqueta: "5 oder mehr Kinder" },
] as const;

export function personAus(kinder: string, bundesland: string): { kinderlos: boolean; kinderUnter25: number; sachsen: boolean } {
  return { kinderlos: kinder === "kinderlos", kinderUnter25: kinder === "kinderlos" ? 0 : Number(kinder), sachsen: bundesland === "sn" };
}
