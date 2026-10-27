import { aplicarEscala, aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;
type Arrondi = (n: number) => number;

export const REQ_IRPP = {
  "cm.irpp-bareme": "escala",
  "cm.irpp-frais-professionnels": "numero",
  "cm.irpp-plafond-frais": "numero",
  "cm.irpp-abattement": "numero",
  "cm.irpp-seuil-retenue": "numero",
  "cm.cac": "numero",
  "cm.cnps-pension": "mapa",
  "cm.cnps-plafond": "numero",
} as const;

export interface ValeursIrpp {
  readonly "cm.irpp-bareme": readonly FilaEscala[];
  readonly "cm.irpp-frais-professionnels": number;
  readonly "cm.irpp-plafond-frais": number;
  readonly "cm.irpp-abattement": number;
  readonly "cm.irpp-seuil-retenue": number;
  readonly "cm.cac": number;
  readonly "cm.cnps-pension": Mapa;
  readonly "cm.cnps-plafond": number;
}

export const REQ_RETENUES = {
  ...REQ_IRPP,
  "cm.cfc-taux": "mapa",
  "cm.rav-bareme": "escala",
  "cm.tdl-bareme": "escala",
} as const;

export interface ValeursRetenues extends ValeursIrpp {
  readonly "cm.cfc-taux": Mapa;
  readonly "cm.rav-bareme": readonly FilaEscala[];
  readonly "cm.tdl-bareme": readonly FilaEscala[];
}

// Pension CNPS du salarié : taux sur le salaire limité au plafond mensuel du décret n° 2016/072.
export function pensionSalarie(brutMensuel: number, v: ValeursIrpp, r: Arrondi): number {
  return r(porcentaje(Math.min(brutMensuel, v["cm.cnps-plafond"]), v["cm.cnps-pension"].salarie));
}

export interface Irpp {
  fraisProfessionnels: number;
  cotisationPension: number;
  revenuNet: number;
  baseImposable: number;
  irpp: number;
  cac: number;
  total: number;
}

// CGI, articles 29, 34, 69 et 71, sur l'année : brut moins les frais professionnels (30 %, plafonnés)
// et la pension CNPS du salarié, moins l'abattement de 500 000 F, puis barème progressif et 10 % de
// centimes additionnels communaux.
export function irppAnnuel(brutAnnuel: number, pensionAnnuelle: number, v: ValeursIrpp, r: Arrondi): Irpp {
  const fraisProfessionnels = r(Math.min(porcentaje(brutAnnuel, v["cm.irpp-frais-professionnels"]), v["cm.irpp-plafond-frais"]));
  const revenuNet = Math.max(0, brutAnnuel - fraisProfessionnels - pensionAnnuelle);
  const baseImposable = Math.max(0, revenuNet - v["cm.irpp-abattement"]);
  const irpp = r(aplicarEscalaMarginal(v["cm.irpp-bareme"], baseImposable));
  const cac = r(porcentaje(irpp, v["cm.cac"]));
  return { fraisProfessionnels, cotisationPension: pensionAnnuelle, revenuNet, baseImposable, irpp, cac, total: irpp + cac };
}

// Retenue du mois : l'impôt de l'année ramené au mois, comme le barème mensuel de la DGI. En dessous
// du seuil de l'article 81 l'employeur ne retient rien.
export function irppMensuel(brutMensuel: number, v: ValeursIrpp, r: Arrondi): { irpp: number; cac: number } {
  if (brutMensuel < v["cm.irpp-seuil-retenue"]) return { irpp: 0, cac: 0 };
  const annuel = irppAnnuel(brutMensuel * 12, porcentaje(Math.min(brutMensuel, v["cm.cnps-plafond"]), v["cm.cnps-pension"].salarie) * 12, v, (n) => n);
  const irpp = r(annuel.irpp / 12);
  return { irpp, cac: r(porcentaje(irpp, v["cm.cac"])) };
}

export interface Retenues {
  cnps: number;
  irpp: number;
  cac: number;
  cfc: number;
  rav: number;
  tdl: number;
  total: number;
}

// La base du Crédit foncier est arrondie au millier inférieur (loi n° 77/10 modifiée, article 6).
// La TDL est un montant annuel selon le salaire de base, retenu par douzièmes avec l'IRPP.
export function retenuesMensuelles(brut: number, salaireBase: number, v: ValeursRetenues, r: Arrondi): Retenues {
  const cnps = pensionSalarie(brut, v, r);
  const { irpp, cac } = irppMensuel(brut, v, r);
  const cfc = r(porcentaje(Math.floor(brut / 1000) * 1000, v["cm.cfc-taux"].salarie));
  const rav = r(aplicarEscala(v["cm.rav-bareme"], brut));
  const tdl = r(aplicarEscala(v["cm.tdl-bareme"], salaireBase) / 12);
  return { cnps, irpp, cac, cfc, rav, tdl, total: cnps + irpp + cac + cfc + rav + tdl };
}
