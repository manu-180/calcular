// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "allocations-familiales": () => import("@/paises/fr/calculadoras/allocations-familiales"),
  "bareme-kilometrique": () => import("@/paises/fr/calculadoras/bareme-kilometrique"),
  "calcul-allocation-chomage": () => import("@/paises/fr/calculadoras/calcul-allocation-chomage"),
  "calcul-inflation": () => import("@/paises/fr/calculadoras/calcul-inflation"),
  "calcul-interets-livret-a": () => import("@/paises/fr/calculadoras/calcul-interets-livret-a"),
  "calcul-tva": () => import("@/paises/fr/calculadoras/calcul-tva"),
  "charges-micro-entrepreneur": () => import("@/paises/fr/calculadoras/charges-micro-entrepreneur"),
  "conges-payes": () => import("@/paises/fr/calculadoras/conges-payes"),
  "droits-de-donation": () => import("@/paises/fr/calculadoras/droits-de-donation"),
  "droits-de-succession": () => import("@/paises/fr/calculadoras/droits-de-succession"),
  "heures-supplementaires": () => import("@/paises/fr/calculadoras/heures-supplementaires"),
  "impot-sur-le-revenu": () => import("@/paises/fr/calculadoras/impot-sur-le-revenu"),
  "indemnite-licenciement": () => import("@/paises/fr/calculadoras/indemnite-licenciement"),
  "indemnites-journalieres-maladie": () => import("@/paises/fr/calculadoras/indemnites-journalieres-maladie"),
  "preavis": () => import("@/paises/fr/calculadoras/preavis"),
  "prelevement-a-la-source": () => import("@/paises/fr/calculadoras/prelevement-a-la-source"),
  "prime-de-precarite": () => import("@/paises/fr/calculadoras/prime-de-precarite"),
  "rupture-conventionnelle": () => import("@/paises/fr/calculadoras/rupture-conventionnelle"),
  "salaire-brut-net": () => import("@/paises/fr/calculadoras/salaire-brut-net"),
  "smic": () => import("@/paises/fr/calculadoras/smic"),
};
