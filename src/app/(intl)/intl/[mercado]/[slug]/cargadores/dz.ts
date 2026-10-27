// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "allocation-chomage": () => import("@/paises/dz/calculadoras/allocation-chomage"),
  "calcul-ifu": () => import("@/paises/dz/calculadoras/calcul-ifu"),
  "calcul-irg-prime": () => import("@/paises/dz/calculadoras/calcul-irg-prime"),
  "calcul-irg-salaire": () => import("@/paises/dz/calculadoras/calcul-irg-salaire"),
  "calcul-salaire-brut": () => import("@/paises/dz/calculadoras/calcul-salaire-brut"),
  "calcul-salaire-net": () => import("@/paises/dz/calculadoras/calcul-salaire-net"),
  "calcul-tva": () => import("@/paises/dz/calculadoras/calcul-tva"),
  "capital-deces": () => import("@/paises/dz/calculadoras/capital-deces"),
  "conge-maternite": () => import("@/paises/dz/calculadoras/conge-maternite"),
  "conges-payes": () => import("@/paises/dz/calculadoras/conges-payes"),
  "cotisations-cnas": () => import("@/paises/dz/calculadoras/cotisations-cnas"),
  "cout-employeur": () => import("@/paises/dz/calculadoras/cout-employeur"),
  "droits-enregistrement": () => import("@/paises/dz/calculadoras/droits-enregistrement"),
  "heures-supplementaires": () => import("@/paises/dz/calculadoras/heures-supplementaires"),
  "impot-interets-epargne": () => import("@/paises/dz/calculadoras/impot-interets-epargne"),
  "impot-sur-dividendes": () => import("@/paises/dz/calculadoras/impot-sur-dividendes"),
  "impot-sur-les-societes": () => import("@/paises/dz/calculadoras/impot-sur-les-societes"),
  "indemnite-arret-maladie": () => import("@/paises/dz/calculadoras/indemnite-arret-maladie"),
  "irg-activites-occasionnelles": () => import("@/paises/dz/calculadoras/irg-activites-occasionnelles"),
  "irg-revenus-locatifs": () => import("@/paises/dz/calculadoras/irg-revenus-locatifs"),
  "pension-de-retraite": () => import("@/paises/dz/calculadoras/pension-de-retraite"),
  "plus-value-cession-actions": () => import("@/paises/dz/calculadoras/plus-value-cession-actions"),
  "plus-value-immobiliere": () => import("@/paises/dz/calculadoras/plus-value-immobiliere"),
  "snmg-algerie": () => import("@/paises/dz/calculadoras/snmg-algerie"),
  "vignette-automobile": () => import("@/paises/dz/calculadoras/vignette-automobile"),
};
