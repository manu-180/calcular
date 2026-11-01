// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calcul-its": () => import("@/paises/ne/calculadoras/calcul-its"),
  "calcul-tva": () => import("@/paises/ne/calculadoras/calcul-tva"),
  "convertisseur-dollar-fcfa": () => import("@/paises/ne/calculadoras/convertisseur-dollar-fcfa"),
  "convertisseur-euro-fcfa": () => import("@/paises/ne/calculadoras/convertisseur-euro-fcfa"),
  "droit-commande-publique": () => import("@/paises/ne/calculadoras/droit-commande-publique"),
  "droits-conservation-fonciere": () => import("@/paises/ne/calculadoras/droits-conservation-fonciere"),
  "smig": () => import("@/paises/ne/calculadoras/smig"),
  "taxe-jeux-de-hasard": () => import("@/paises/ne/calculadoras/taxe-jeux-de-hasard"),
  "taxe-paiements-numeraire": () => import("@/paises/ne/calculadoras/taxe-paiements-numeraire"),
  "taxe-transferts-argent": () => import("@/paises/ne/calculadoras/taxe-transferts-argent"),
};
