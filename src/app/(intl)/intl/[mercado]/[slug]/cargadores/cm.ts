// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "avantages-en-nature": () => import("@/paises/cm/calculadoras/avantages-en-nature"),
  "calcul-irpp": () => import("@/paises/cm/calculadoras/calcul-irpp"),
  "calcul-patente": () => import("@/paises/cm/calculadoras/calcul-patente"),
  "calcul-salaire-net": () => import("@/paises/cm/calculadoras/calcul-salaire-net"),
  "calcul-tva": () => import("@/paises/cm/calculadoras/calcul-tva"),
  "conges-payes": () => import("@/paises/cm/calculadoras/conges-payes"),
  "convertisseur-euro-fcfa": () => import("@/paises/cm/calculadoras/convertisseur-euro-fcfa"),
  "cotisations-cnps": () => import("@/paises/cm/calculadoras/cotisations-cnps"),
  "cout-employeur": () => import("@/paises/cm/calculadoras/cout-employeur"),
  "droits-de-mutation": () => import("@/paises/cm/calculadoras/droits-de-mutation"),
  "impot-general-synthetique": () => import("@/paises/cm/calculadoras/impot-general-synthetique"),
  "impot-revenus-capitaux-mobiliers": () => import("@/paises/cm/calculadoras/impot-revenus-capitaux-mobiliers"),
  "impot-sur-les-societes": () => import("@/paises/cm/calculadoras/impot-sur-les-societes"),
  "redevance-audiovisuelle": () => import("@/paises/cm/calculadoras/redevance-audiovisuelle"),
  "salaire-net-en-brut": () => import("@/paises/cm/calculadoras/salaire-net-en-brut"),
  "smig": () => import("@/paises/cm/calculadoras/smig"),
  "taxe-developpement-local": () => import("@/paises/cm/calculadoras/taxe-developpement-local"),
  "taxe-fonciere": () => import("@/paises/cm/calculadoras/taxe-fonciere"),
  "vignette-automobile": () => import("@/paises/cm/calculadoras/vignette-automobile"),
};
