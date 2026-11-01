import { ErrorEntrada, porcentaje } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;
type Arrondi = (n: number) => number;

export const REQ_CNSS = { "bj.cnss-taux": "mapa" } as const;

export interface ValeursCnss {
  readonly "bj.cnss-taux": Mapa;
}

export interface Cnss {
  pensionSalarie: number;
  pensionEmployeur: number;
  prestationsFamiliales: number;
  risquesProfessionnels: number;
  totalSalarie: number;
  totalEmployeur: number;
}

// Décret n° 94-258 : la pension et les prestations familiales se calculent sur l'ensemble des
// rémunérations, sans plafond. Le taux des risques professionnels dépend de l'entreprise et vient
// de la saisie.
export function cotisationsCnss(brut: number, tauxRisques: number, v: ValeursCnss, r: Arrondi): Cnss {
  if (tauxRisques < 0 || tauxRisques > 20) throw new ErrorEntrada("Indiquez un taux de risques professionnels entre 0 et 20 %.", "tauxRisques");
  const t = v["bj.cnss-taux"];
  const pensionSalarie = r(porcentaje(brut, t["pension-salarie"]));
  const pensionEmployeur = r(porcentaje(brut, t["pension-employeur"]));
  const prestationsFamiliales = r(porcentaje(brut, t["prestations-familiales"]));
  const risquesProfessionnels = r(porcentaje(brut, tauxRisques));
  return {
    pensionSalarie,
    pensionEmployeur,
    prestationsFamiliales,
    risquesProfessionnels,
    totalSalarie: pensionSalarie,
    totalEmployeur: r(pensionEmployeur + prestationsFamiliales + risquesProfessionnels),
  };
}
