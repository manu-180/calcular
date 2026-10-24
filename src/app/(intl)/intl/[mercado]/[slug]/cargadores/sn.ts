// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calcul-cfce": () => import("@/paises/sn/calculadoras/calcul-cfce"),
  "calcul-contribution-fonciere": () => import("@/paises/sn/calculadoras/calcul-contribution-fonciere"),
  "calcul-impot-sur-le-revenu": () => import("@/paises/sn/calculadoras/calcul-impot-sur-le-revenu"),
  "calcul-impot-sur-les-societes": () => import("@/paises/sn/calculadoras/calcul-impot-sur-les-societes"),
  "calcul-nombre-de-parts": () => import("@/paises/sn/calculadoras/calcul-nombre-de-parts"),
  "calcul-trimf": () => import("@/paises/sn/calculadoras/calcul-trimf"),
  "calcul-tva": () => import("@/paises/sn/calculadoras/calcul-tva"),
  "convertisseur-franc-cfa-euro": () => import("@/paises/sn/calculadoras/convertisseur-franc-cfa-euro"),
  "retenue-revenus-capitaux-mobiliers": () => import("@/paises/sn/calculadoras/retenue-revenus-capitaux-mobiliers"),
};
