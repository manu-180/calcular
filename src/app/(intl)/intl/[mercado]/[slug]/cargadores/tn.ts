// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "allocations-familiales": () => import("@/paises/tn/calculadoras/allocations-familiales"),
  "bareme-irpp": () => import("@/paises/tn/calculadoras/bareme-irpp"),
  "calcul-irpp-salaire": () => import("@/paises/tn/calculadoras/calcul-irpp-salaire"),
  "calcul-salaire-brut": () => import("@/paises/tn/calculadoras/calcul-salaire-brut"),
  "calcul-salaire-net": () => import("@/paises/tn/calculadoras/calcul-salaire-net"),
  "calcul-tva": () => import("@/paises/tn/calculadoras/calcul-tva"),
  "conge-maternite": () => import("@/paises/tn/calculadoras/conge-maternite"),
  "conges-payes": () => import("@/paises/tn/calculadoras/conges-payes"),
  "cotisations-cnss": () => import("@/paises/tn/calculadoras/cotisations-cnss"),
  "cotisations-travailleur-non-salarie": () => import("@/paises/tn/calculadoras/cotisations-travailleur-non-salarie"),
  "cout-employeur": () => import("@/paises/tn/calculadoras/cout-employeur"),
  "delai-de-preavis": () => import("@/paises/tn/calculadoras/delai-de-preavis"),
  "heures-supplementaires": () => import("@/paises/tn/calculadoras/heures-supplementaires"),
  "impot-sur-les-societes": () => import("@/paises/tn/calculadoras/impot-sur-les-societes"),
  "impot-sur-pension": () => import("@/paises/tn/calculadoras/impot-sur-pension"),
  "indemnite-fin-de-service": () => import("@/paises/tn/calculadoras/indemnite-fin-de-service"),
  "indemnite-licenciement-abusif": () => import("@/paises/tn/calculadoras/indemnite-licenciement-abusif"),
  "periode-d-essai": () => import("@/paises/tn/calculadoras/periode-d-essai"),
  "smig-tunisie": () => import("@/paises/tn/calculadoras/smig-tunisie"),
};
