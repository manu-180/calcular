// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import { traducida } from "@/motor/edicion";
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "allocation-chomage": () => traducida(import("@/paises/dz/calculadoras/allocation-chomage"), import("@/paises/dz-ar/textos/allocation-chomage")),
  "calcul-ifu": () => traducida(import("@/paises/dz/calculadoras/calcul-ifu"), import("@/paises/dz-ar/textos/calcul-ifu")),
  "calcul-irg-prime": () => traducida(import("@/paises/dz/calculadoras/calcul-irg-prime"), import("@/paises/dz-ar/textos/calcul-irg-prime")),
  "calcul-irg-salaire": () => traducida(import("@/paises/dz/calculadoras/calcul-irg-salaire"), import("@/paises/dz-ar/textos/calcul-irg-salaire")),
  "calcul-salaire-brut": () => traducida(import("@/paises/dz/calculadoras/calcul-salaire-brut"), import("@/paises/dz-ar/textos/calcul-salaire-brut")),
  "calcul-salaire-net": () => traducida(import("@/paises/dz/calculadoras/calcul-salaire-net"), import("@/paises/dz-ar/textos/calcul-salaire-net")),
  "calcul-tva": () => traducida(import("@/paises/dz/calculadoras/calcul-tva"), import("@/paises/dz-ar/textos/calcul-tva")),
  "capital-deces": () => traducida(import("@/paises/dz/calculadoras/capital-deces"), import("@/paises/dz-ar/textos/capital-deces")),
  "conge-maternite": () => traducida(import("@/paises/dz/calculadoras/conge-maternite"), import("@/paises/dz-ar/textos/conge-maternite")),
  "conges-payes": () => traducida(import("@/paises/dz/calculadoras/conges-payes"), import("@/paises/dz-ar/textos/conges-payes")),
  "cotisations-cnas": () => traducida(import("@/paises/dz/calculadoras/cotisations-cnas"), import("@/paises/dz-ar/textos/cotisations-cnas")),
  "cout-employeur": () => traducida(import("@/paises/dz/calculadoras/cout-employeur"), import("@/paises/dz-ar/textos/cout-employeur")),
  "droits-enregistrement": () => traducida(import("@/paises/dz/calculadoras/droits-enregistrement"), import("@/paises/dz-ar/textos/droits-enregistrement")),
  "heures-supplementaires": () => traducida(import("@/paises/dz/calculadoras/heures-supplementaires"), import("@/paises/dz-ar/textos/heures-supplementaires")),
  "impot-interets-epargne": () => traducida(import("@/paises/dz/calculadoras/impot-interets-epargne"), import("@/paises/dz-ar/textos/impot-interets-epargne")),
  "impot-sur-dividendes": () => traducida(import("@/paises/dz/calculadoras/impot-sur-dividendes"), import("@/paises/dz-ar/textos/impot-sur-dividendes")),
  "impot-sur-les-societes": () => traducida(import("@/paises/dz/calculadoras/impot-sur-les-societes"), import("@/paises/dz-ar/textos/impot-sur-les-societes")),
  "indemnite-arret-maladie": () => traducida(import("@/paises/dz/calculadoras/indemnite-arret-maladie"), import("@/paises/dz-ar/textos/indemnite-arret-maladie")),
  "irg-activites-occasionnelles": () => traducida(import("@/paises/dz/calculadoras/irg-activites-occasionnelles"), import("@/paises/dz-ar/textos/irg-activites-occasionnelles")),
  "irg-revenus-locatifs": () => traducida(import("@/paises/dz/calculadoras/irg-revenus-locatifs"), import("@/paises/dz-ar/textos/irg-revenus-locatifs")),
  "pension-de-retraite": () => traducida(import("@/paises/dz/calculadoras/pension-de-retraite"), import("@/paises/dz-ar/textos/pension-de-retraite")),
  "plus-value-cession-actions": () => traducida(import("@/paises/dz/calculadoras/plus-value-cession-actions"), import("@/paises/dz-ar/textos/plus-value-cession-actions")),
  "plus-value-immobiliere": () => traducida(import("@/paises/dz/calculadoras/plus-value-immobiliere"), import("@/paises/dz-ar/textos/plus-value-immobiliere")),
  "snmg-algerie": () => traducida(import("@/paises/dz/calculadoras/snmg-algerie"), import("@/paises/dz-ar/textos/snmg-algerie")),
  "vignette-automobile": () => traducida(import("@/paises/dz/calculadoras/vignette-automobile"), import("@/paises/dz-ar/textos/vignette-automobile")),
};
