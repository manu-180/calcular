// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "allocations-familiales": () => import("@/paises/lu/calculadoras/allocations-familiales"),
  "calcul-inflation": () => import("@/paises/lu/calculadoras/calcul-inflation"),
  "calcul-tva": () => import("@/paises/lu/calculadoras/calcul-tva"),
  "conges-payes": () => import("@/paises/lu/calculadoras/conges-payes"),
  "cotisations-sociales": () => import("@/paises/lu/calculadoras/cotisations-sociales"),
  "cout-employeur": () => import("@/paises/lu/calculadoras/cout-employeur"),
  "droits-enregistrement": () => import("@/paises/lu/calculadoras/droits-enregistrement"),
  "heures-supplementaires": () => import("@/paises/lu/calculadoras/heures-supplementaires"),
  "impot-sur-le-revenu": () => import("@/paises/lu/calculadoras/impot-sur-le-revenu"),
  "indemnite-de-depart": () => import("@/paises/lu/calculadoras/indemnite-de-depart"),
  "indexation-salaires": () => import("@/paises/lu/calculadoras/indexation-salaires"),
  "preavis-licenciement": () => import("@/paises/lu/calculadoras/preavis-licenciement"),
  "salaire-brut-net": () => import("@/paises/lu/calculadoras/salaire-brut-net"),
  "salaire-social-minimum": () => import("@/paises/lu/calculadoras/salaire-social-minimum"),
};
