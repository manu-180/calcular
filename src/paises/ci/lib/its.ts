import { aplicarEscalaMarginal, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;
type Arrondi = (n: number) => number;

export const REQ_ITS = {
  "ci.its-bareme": "escala",
  "ci.its-ricf": "mapa",
  "ci.its-parts-max": "numero",
} as const;

export interface ValeursIts {
  readonly "ci.its-bareme": readonly FilaEscala[];
  readonly "ci.its-ricf": Mapa;
  readonly "ci.its-parts-max": number;
}

export type Situation = "celibataire" | "marie" | "veuf";

export const OPTIONS_SITUATION = [
  { valor: "celibataire", etiqueta: "Célibataire ou divorcé" },
  { valor: "marie", etiqueta: "Marié" },
  { valor: "veuf", etiqueta: "Veuf" },
] as const;

// Grille des parts de l'article 121 du CGI telle que la présente la DGI : une part pour une personne
// seule sans enfant, deux pour un couple ; le veuf avec enfants suit la ligne du marié, le
// célibataire ou divorcé avec enfants part de 1,5. Chaque enfant ajoute une demi-part, un point s'il
// est infirme. Le plafond de 5 parts est une donnée.
export function nombreDeParts(situation: Situation, enfants: number, dontInfirmes: number, plafond: number): number {
  if (dontInfirmes > enfants) throw new ErrorEntrada("Le nombre d'enfants infirmes ne peut pas dépasser le nombre d'enfants à charge.", "infirmes");
  const supplement = (enfants - dontInfirmes) * 0.5 + dontInfirmes;
  let base: number;
  if (situation === "marie") base = 2;
  else if (enfants === 0) base = 1;
  else base = situation === "veuf" ? 2 : 1.5;
  return Math.min(base + supplement, plafond);
}

export function ricfMensuelle(parts: number, ricf: Mapa): number {
  const cle = String(Math.round(parts * 10));
  if (!(cle in ricf)) throw new ErrorEntrada({ codigo: "opcion-invalida" });
  return ricf[cle];
}

export interface Its {
  parts: number;
  impotBrut: number;
  ricf: number;
  impotNet: number;
}

export function itsMensuel(base: number, parts: number, v: ValeursIts, r: Arrondi): Its {
  const impotBrut = r(aplicarEscalaMarginal(v["ci.its-bareme"], Math.max(0, base)));
  const ricf = Math.min(impotBrut, ricfMensuelle(parts, v["ci.its-ricf"]));
  return { parts, impotBrut, ricf, impotNet: r(impotBrut - ricf) };
}

export function reductionRetraite(impot: number, taux: number, r: Arrondi): number {
  return r(porcentaje(impot, taux));
}
