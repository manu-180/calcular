// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "age-de-depart-a-la-retraite": () => import("@/paises/bf/calculadoras/age-de-depart-a-la-retraite"),
  "assurance-volontaire-cnss": () => import("@/paises/bf/calculadoras/assurance-volontaire-cnss"),
  "calcul-ircm": () => import("@/paises/bf/calculadoras/calcul-ircm"),
  "calcul-iuts": () => import("@/paises/bf/calculadoras/calcul-iuts"),
  "calcul-salaire-net": () => import("@/paises/bf/calculadoras/calcul-salaire-net"),
  "calcul-tva": () => import("@/paises/bf/calculadoras/calcul-tva"),
  "conge-maternite": () => import("@/paises/bf/calculadoras/conge-maternite"),
  "conges-payes": () => import("@/paises/bf/calculadoras/conges-payes"),
  "convertisseur-dollar-fcfa": () => import("@/paises/bf/calculadoras/convertisseur-dollar-fcfa"),
  "convertisseur-euro-fcfa": () => import("@/paises/bf/calculadoras/convertisseur-euro-fcfa"),
  "cotisations-cnss": () => import("@/paises/bf/calculadoras/cotisations-cnss"),
  "cout-employeur": () => import("@/paises/bf/calculadoras/cout-employeur"),
  "impot-revenus-fonciers": () => import("@/paises/bf/calculadoras/impot-revenus-fonciers"),
  "impot-sur-les-benefices": () => import("@/paises/bf/calculadoras/impot-sur-les-benefices"),
  "impot-sur-les-societes": () => import("@/paises/bf/calculadoras/impot-sur-les-societes"),
  "indemnite-maladie": () => import("@/paises/bf/calculadoras/indemnite-maladie"),
  "periode-d-essai": () => import("@/paises/bf/calculadoras/periode-d-essai"),
  "preavis": () => import("@/paises/bf/calculadoras/preavis"),
  "rupture-irreguliere": () => import("@/paises/bf/calculadoras/rupture-irreguliere"),
  "smig": () => import("@/paises/bf/calculadoras/smig"),
};
