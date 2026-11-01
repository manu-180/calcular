// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calcul-its": () => import("@/paises/mr/calculadoras/calcul-its"),
  "calcul-tva": () => import("@/paises/mr/calculadoras/calcul-tva"),
  "conges-payes": () => import("@/paises/mr/calculadoras/conges-payes"),
  "cotisations-cnss": () => import("@/paises/mr/calculadoras/cotisations-cnss"),
  "cours-dollar-ouguiya": () => import("@/paises/mr/calculadoras/cours-dollar-ouguiya"),
  "cout-employeur": () => import("@/paises/mr/calculadoras/cout-employeur"),
  "heures-supplementaires": () => import("@/paises/mr/calculadoras/heures-supplementaires"),
  "impot-dividendes": () => import("@/paises/mr/calculadoras/impot-dividendes"),
  "impot-sur-les-societes": () => import("@/paises/mr/calculadoras/impot-sur-les-societes"),
  "indemnite-licenciement": () => import("@/paises/mr/calculadoras/indemnite-licenciement"),
  "pension-retraite": () => import("@/paises/mr/calculadoras/pension-retraite"),
  "preavis": () => import("@/paises/mr/calculadoras/preavis"),
  "salaire-brut": () => import("@/paises/mr/calculadoras/salaire-brut"),
  "salaire-net": () => import("@/paises/mr/calculadoras/salaire-net"),
  "smig": () => import("@/paises/mr/calculadoras/smig"),
  "vignette-automobile": () => import("@/paises/mr/calculadoras/vignette-automobile"),
};
