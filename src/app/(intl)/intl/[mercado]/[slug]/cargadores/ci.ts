// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calcul-cotisations-cnps": () => import("@/paises/ci/calculadoras/calcul-cotisations-cnps"),
  "calcul-its": () => import("@/paises/ci/calculadoras/calcul-its"),
  "calcul-salaire-net": () => import("@/paises/ci/calculadoras/calcul-salaire-net"),
  "calcul-tva": () => import("@/paises/ci/calculadoras/calcul-tva"),
  "conges-payes": () => import("@/paises/ci/calculadoras/conges-payes"),
  "convertisseur-dollar-fcfa": () => import("@/paises/ci/calculadoras/convertisseur-dollar-fcfa"),
  "convertisseur-euro-fcfa": () => import("@/paises/ci/calculadoras/convertisseur-euro-fcfa"),
  "cout-employeur": () => import("@/paises/ci/calculadoras/cout-employeur"),
  "heures-supplementaires": () => import("@/paises/ci/calculadoras/heures-supplementaires"),
  "impot-sur-les-benefices": () => import("@/paises/ci/calculadoras/impot-sur-les-benefices"),
  "indemnite-depart-retraite": () => import("@/paises/ci/calculadoras/indemnite-depart-retraite"),
  "indemnite-fin-de-contrat": () => import("@/paises/ci/calculadoras/indemnite-fin-de-contrat"),
  "indemnite-licenciement": () => import("@/paises/ci/calculadoras/indemnite-licenciement"),
  "preavis": () => import("@/paises/ci/calculadoras/preavis"),
  "prime-anciennete": () => import("@/paises/ci/calculadoras/prime-anciennete"),
  "prime-de-fin-d-annee": () => import("@/paises/ci/calculadoras/prime-de-fin-d-annee"),
  "smig": () => import("@/paises/ci/calculadoras/smig"),
  "taxe-entreprenant": () => import("@/paises/ci/calculadoras/taxe-entreprenant"),
};
