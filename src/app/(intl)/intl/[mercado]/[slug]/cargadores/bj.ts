// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "acompte-aib": () => import("@/paises/bj/calculadoras/acompte-aib"),
  "avantages-en-nature": () => import("@/paises/bj/calculadoras/avantages-en-nature"),
  "calcul-its": () => import("@/paises/bj/calculadoras/calcul-its"),
  "calcul-salaire-net": () => import("@/paises/bj/calculadoras/calcul-salaire-net"),
  "calcul-tva": () => import("@/paises/bj/calculadoras/calcul-tva"),
  "conges-payes": () => import("@/paises/bj/calculadoras/conges-payes"),
  "convertisseur-dollar-fcfa": () => import("@/paises/bj/calculadoras/convertisseur-dollar-fcfa"),
  "convertisseur-euro-fcfa": () => import("@/paises/bj/calculadoras/convertisseur-euro-fcfa"),
  "cotisations-cnss": () => import("@/paises/bj/calculadoras/cotisations-cnss"),
  "cout-employeur": () => import("@/paises/bj/calculadoras/cout-employeur"),
  "heures-supplementaires": () => import("@/paises/bj/calculadoras/heures-supplementaires"),
  "impot-revenus-capitaux-mobiliers": () => import("@/paises/bj/calculadoras/impot-revenus-capitaux-mobiliers"),
  "impot-revenus-fonciers": () => import("@/paises/bj/calculadoras/impot-revenus-fonciers"),
  "impot-sur-les-benefices-d-affaires": () => import("@/paises/bj/calculadoras/impot-sur-les-benefices-d-affaires"),
  "impot-sur-les-societes": () => import("@/paises/bj/calculadoras/impot-sur-les-societes"),
  "indemnite-licenciement-abusif": () => import("@/paises/bj/calculadoras/indemnite-licenciement-abusif"),
  "its-treizieme-mois": () => import("@/paises/bj/calculadoras/its-treizieme-mois"),
  "plus-value-immobiliere": () => import("@/paises/bj/calculadoras/plus-value-immobiliere"),
  "preavis": () => import("@/paises/bj/calculadoras/preavis"),
  "smig": () => import("@/paises/bj/calculadoras/smig"),
  "taxe-professionnelle-synthetique": () => import("@/paises/bj/calculadoras/taxe-professionnelle-synthetique"),
  "taxe-vehicules-a-moteur": () => import("@/paises/bj/calculadoras/taxe-vehicules-a-moteur"),
};
