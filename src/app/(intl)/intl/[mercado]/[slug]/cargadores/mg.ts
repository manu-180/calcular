// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "avantages-en-nature": () => import("@/paises/mg/calculadoras/avantages-en-nature"),
  "calcul-impot-sur-les-revenus": () => import("@/paises/mg/calculadoras/calcul-impot-sur-les-revenus"),
  "calcul-ircm": () => import("@/paises/mg/calculadoras/calcul-ircm"),
  "calcul-irsa": () => import("@/paises/mg/calculadoras/calcul-irsa"),
  "calcul-salaire-net": () => import("@/paises/mg/calculadoras/calcul-salaire-net"),
  "calcul-tva": () => import("@/paises/mg/calculadoras/calcul-tva"),
  "convertisseur-ariary-euro": () => import("@/paises/mg/calculadoras/convertisseur-ariary-euro"),
  "droit-enregistrement-bail": () => import("@/paises/mg/calculadoras/droit-enregistrement-bail"),
  "droits-de-donation": () => import("@/paises/mg/calculadoras/droits-de-donation"),
  "droits-de-mutation-immobiliere": () => import("@/paises/mg/calculadoras/droits-de-mutation-immobiliere"),
  "droits-enregistrement-cession": () => import("@/paises/mg/calculadoras/droits-enregistrement-cession"),
  "impot-foncier-propriete-batie": () => import("@/paises/mg/calculadoras/impot-foncier-propriete-batie"),
  "impot-plus-value-immobiliere": () => import("@/paises/mg/calculadoras/impot-plus-value-immobiliere"),
  "impot-synthetique": () => import("@/paises/mg/calculadoras/impot-synthetique"),
  "taxe-sur-les-assurances": () => import("@/paises/mg/calculadoras/taxe-sur-les-assurances"),
  "taxe-vehicules-a-moteur": () => import("@/paises/mg/calculadoras/taxe-vehicules-a-moteur"),
};
