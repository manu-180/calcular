import { enMapa, porcentaje } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;
type Arrondi = (n: number) => number;

export const REQ_CNPS = {
  "cm.cnps-pension": "mapa",
  "cm.cnps-prestations-familiales": "mapa",
  "cm.cnps-accidents-travail": "mapa",
  "cm.cnps-plafond": "numero",
} as const;

export interface ValeursCnps {
  readonly "cm.cnps-pension": Mapa;
  readonly "cm.cnps-prestations-familiales": Mapa;
  readonly "cm.cnps-accidents-travail": Mapa;
  readonly "cm.cnps-plafond": number;
}

export interface Cnps {
  basePlafonnee: number;
  pensionSalarie: number;
  pensionEmployeur: number;
  prestationsFamiliales: number;
  accidentsTravail: number;
  totalSalarie: number;
  totalEmployeur: number;
}

// Décret n° 2016/072 : pensions et prestations familiales sur le salaire plafonné ; accidents du
// travail sur toute la rémunération, au taux du groupe de risque de l'entreprise.
export function cotisationsCnps(brut: number, regime: string | null, groupe: string | null, v: ValeursCnps, r: Arrondi): Cnps {
  const basePlafonnee = Math.min(brut, v["cm.cnps-plafond"]);
  const pensionSalarie = r(porcentaje(basePlafonnee, v["cm.cnps-pension"].salarie));
  const pensionEmployeur = r(porcentaje(basePlafonnee, v["cm.cnps-pension"].employeur));
  const prestationsFamiliales = r(porcentaje(basePlafonnee, enMapa(v["cm.cnps-prestations-familiales"], regime)));
  const accidentsTravail = r(porcentaje(brut, enMapa(v["cm.cnps-accidents-travail"], groupe)));
  return {
    basePlafonnee,
    pensionSalarie,
    pensionEmployeur,
    prestationsFamiliales,
    accidentsTravail,
    totalSalarie: pensionSalarie,
    totalEmployeur: pensionEmployeur + prestationsFamiliales + accidentsTravail,
  };
}
