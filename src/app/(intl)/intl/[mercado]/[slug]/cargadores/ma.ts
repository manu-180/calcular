// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calcul-ir-salaire": () => import("@/paises/ma/calculadoras/calcul-ir-salaire"),
  "calcul-salaire-net": () => import("@/paises/ma/calculadoras/calcul-salaire-net"),
  "calcul-tva": () => import("@/paises/ma/calculadoras/calcul-tva"),
  "conges-payes": () => import("@/paises/ma/calculadoras/conges-payes"),
  "cotisations-cnss": () => import("@/paises/ma/calculadoras/cotisations-cnss"),
  "cout-employeur": () => import("@/paises/ma/calculadoras/cout-employeur"),
  "delai-de-preavis": () => import("@/paises/ma/calculadoras/delai-de-preavis"),
  "droits-enregistrement": () => import("@/paises/ma/calculadoras/droits-enregistrement"),
  "heures-supplementaires": () => import("@/paises/ma/calculadoras/heures-supplementaires"),
  "impot-auto-entrepreneur": () => import("@/paises/ma/calculadoras/impot-auto-entrepreneur"),
  "impot-sur-les-societes": () => import("@/paises/ma/calculadoras/impot-sur-les-societes"),
  "indemnite-licenciement": () => import("@/paises/ma/calculadoras/indemnite-licenciement"),
  "smig-maroc": () => import("@/paises/ma/calculadoras/smig-maroc"),
};
