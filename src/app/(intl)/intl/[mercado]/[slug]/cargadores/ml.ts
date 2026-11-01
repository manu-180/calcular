// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calcul-irvm": () => import("@/paises/ml/calculadoras/calcul-irvm"),
  "calcul-its": () => import("@/paises/ml/calculadoras/calcul-its"),
  "calcul-salaire-net": () => import("@/paises/ml/calculadoras/calcul-salaire-net"),
  "calcul-tva": () => import("@/paises/ml/calculadoras/calcul-tva"),
  "conge-maternite": () => import("@/paises/ml/calculadoras/conge-maternite"),
  "conges-payes": () => import("@/paises/ml/calculadoras/conges-payes"),
  "convertisseur-dollar-fcfa": () => import("@/paises/ml/calculadoras/convertisseur-dollar-fcfa"),
  "convertisseur-euro-fcfa": () => import("@/paises/ml/calculadoras/convertisseur-euro-fcfa"),
  "cotisation-amo": () => import("@/paises/ml/calculadoras/cotisation-amo"),
  "cout-employeur": () => import("@/paises/ml/calculadoras/cout-employeur"),
  "heures-supplementaires": () => import("@/paises/ml/calculadoras/heures-supplementaires"),
  "impot-revenus-fonciers": () => import("@/paises/ml/calculadoras/impot-revenus-fonciers"),
  "impot-sur-les-societes": () => import("@/paises/ml/calculadoras/impot-sur-les-societes"),
  "impot-synthetique": () => import("@/paises/ml/calculadoras/impot-synthetique"),
  "indemnite-depart-retraite": () => import("@/paises/ml/calculadoras/indemnite-depart-retraite"),
  "indemnite-licenciement": () => import("@/paises/ml/calculadoras/indemnite-licenciement"),
  "indemnite-services-rendus": () => import("@/paises/ml/calculadoras/indemnite-services-rendus"),
  "preavis": () => import("@/paises/ml/calculadoras/preavis"),
  "retenue-non-residents": () => import("@/paises/ml/calculadoras/retenue-non-residents"),
  "smig": () => import("@/paises/ml/calculadoras/smig"),
  "taxes-sur-salaires": () => import("@/paises/ml/calculadoras/taxes-sur-salaires"),
};
