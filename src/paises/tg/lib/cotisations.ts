import { porcentaje } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;
type Arrondi = (n: number) => number;

export const REQ_COTISATIONS = {
  "tg.cnss-taux": "mapa",
  "tg.amu-taux": "mapa",
  "tg.smig": "numero",
} as const;

export interface ValeursCotisations {
  readonly "tg.cnss-taux": Mapa;
  readonly "tg.amu-taux": Mapa;
  readonly "tg.smig": number;
}

export interface Cotisations {
  assiette: number;
  plancher: boolean;
  pensionSalarie: number;
  amuSalarie: number;
  totalSalarie: number;
  pensionEmployeur: number;
  prestationsFamiliales: number;
  risquesProfessionnels: number;
  amuEmployeur: number;
  totalEmployeur: number;
}

// La CNSS calcule les cotisations sur toute la rémunération, sans plafond, et jamais sur moins que
// le SMIG. L'AMU suit la même assiette (décret n° 2023-096, articles 9 et 10).
export function cotisations(brut: number, v: ValeursCotisations, r: Arrondi): Cotisations {
  const assiette = Math.max(brut, v["tg.smig"]);
  const t = v["tg.cnss-taux"];
  const amu = v["tg.amu-taux"];
  const pensionSalarie = r(porcentaje(assiette, t["pension-salarie"]));
  const amuSalarie = r(porcentaje(assiette, amu.salarie));
  const pensionEmployeur = r(porcentaje(assiette, t["pension-employeur"]));
  const prestationsFamiliales = r(porcentaje(assiette, t["prestations-familiales"]));
  const risquesProfessionnels = r(porcentaje(assiette, t["risques-professionnels"]));
  const amuEmployeur = r(porcentaje(assiette, amu.employeur));
  return {
    assiette,
    plancher: assiette > brut,
    pensionSalarie,
    amuSalarie,
    totalSalarie: pensionSalarie + amuSalarie,
    pensionEmployeur,
    prestationsFamiliales,
    risquesProfessionnels,
    amuEmployeur,
    totalEmployeur: pensionEmployeur + prestationsFamiliales + risquesProfessionnels + amuEmployeur,
  };
}

export const NOTE_PLANCHER = "Le salaire est inférieur au SMIG : les cotisations sont calculées sur le SMIG, plancher fixé par la CNSS.";
