import { ErrorEntrada, porcentaje } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;
type Arrondi = (n: number) => number;

export const REQ_CNPS = {
  "ci.cnps-taux": "mapa",
  "ci.cnps-accident-travail": "mapa",
  "ci.cnps-plafond-prestations": "numero",
  "ci.cnps-plafond-retraite-smig": "numero",
  "ci.smig": "numero",
} as const;

export interface ValeursCnps {
  readonly "ci.cnps-taux": Mapa;
  readonly "ci.cnps-accident-travail": Mapa;
  readonly "ci.cnps-plafond-prestations": number;
  readonly "ci.cnps-plafond-retraite-smig": number;
  readonly "ci.smig": number;
}

export interface Cnps {
  plafondRetraite: number;
  baseRetraite: number;
  basePrestations: number;
  retraiteSalarie: number;
  retraiteEmployeur: number;
  prestationsFamiliales: number;
  maternite: number;
  accidentTravail: number;
  totalSalarie: number;
  totalEmployeur: number;
}

// Le plafond de la retraite n'est pas un montant publié mais un multiple du SMIG (45 fois selon la
// CNPS) : il suit donc tout changement du SMIG sans autre mise à jour.
export function cotisationsCnps(brut: number, tauxAt: number, v: ValeursCnps, r: Arrondi): Cnps {
  const at = v["ci.cnps-accident-travail"];
  if (tauxAt < at.minimum || tauxAt > at.maximum) {
    throw new ErrorEntrada(`Le taux accidents du travail va de ${at.minimum} % à ${at.maximum} % selon le secteur.`, "tauxAt");
  }
  const t = v["ci.cnps-taux"];
  const plafondRetraite = r(v["ci.smig"] * v["ci.cnps-plafond-retraite-smig"]);
  const baseRetraite = Math.min(brut, plafondRetraite);
  const basePrestations = Math.min(brut, v["ci.cnps-plafond-prestations"]);
  const retraiteSalarie = r(porcentaje(baseRetraite, t["retraite-salarie"]));
  const retraiteEmployeur = r(porcentaje(baseRetraite, t["retraite-employeur"]));
  const prestationsFamiliales = r(porcentaje(basePrestations, t["prestations-familiales"]));
  const maternite = r(porcentaje(basePrestations, t.maternite));
  const accidentTravail = r(porcentaje(basePrestations, tauxAt));
  return {
    plafondRetraite,
    baseRetraite,
    basePrestations,
    retraiteSalarie,
    retraiteEmployeur,
    prestationsFamiliales,
    maternite,
    accidentTravail,
    totalSalarie: retraiteSalarie,
    totalEmployeur: r(retraiteEmployeur + prestationsFamiliales + maternite + accidentTravail),
  };
}
