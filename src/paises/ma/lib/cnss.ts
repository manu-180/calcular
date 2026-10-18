import { porcentaje } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;
type Afronden = (n: number) => number;

export const REQ_CNSS = {
  "ma.cnss-salarie": "mapa",
  "ma.cnss-employeur": "mapa",
  "ma.cnss-plafond": "numero",
} as const;

export interface ValeursCnss {
  readonly "ma.cnss-salarie": Mapa;
  readonly "ma.cnss-employeur": Mapa;
  readonly "ma.cnss-plafond": number;
}

// Les prestations sociales sont plafonnées ; l'AMO, les allocations familiales et la taxe de formation
// professionnelle portent sur tout le salaire.
export function cotisations(brut: number, v: ValeursCnss, r: Afronden) {
  const plafonne = Math.min(brut, v["ma.cnss-plafond"]);
  const s = v["ma.cnss-salarie"];
  const e = v["ma.cnss-employeur"];
  const salarieCnss = r(porcentaje(plafonne, s["prestations-sociales"]));
  const salarieAmo = r(porcentaje(brut, s.amo));
  const employeurCnss = r(porcentaje(plafonne, e["prestations-sociales"]));
  const employeurAf = r(porcentaje(brut, e["allocations-familiales"]));
  const employeurAmo = r(porcentaje(brut, e.amo));
  const employeurTfp = r(porcentaje(brut, e["formation-professionnelle"]));
  return {
    salarieCnss,
    salarieAmo,
    salarie: r(salarieCnss + salarieAmo),
    employeurCnss,
    employeurAf,
    employeurAmo,
    employeurTfp,
    employeur: r(employeurCnss + employeurAf + employeurAmo + employeurTfp),
  };
}
