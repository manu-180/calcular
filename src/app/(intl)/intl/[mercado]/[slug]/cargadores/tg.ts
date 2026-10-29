// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "allocations-familiales": () => import("@/paises/tg/calculadoras/allocations-familiales"),
  "calcul-irpp": () => import("@/paises/tg/calculadoras/calcul-irpp"),
  "calcul-salaire-net": () => import("@/paises/tg/calculadoras/calcul-salaire-net"),
  "calcul-tva": () => import("@/paises/tg/calculadoras/calcul-tva"),
  "conges-payes": () => import("@/paises/tg/calculadoras/conges-payes"),
  "convertisseur-dollar-fcfa": () => import("@/paises/tg/calculadoras/convertisseur-dollar-fcfa"),
  "convertisseur-euro-fcfa": () => import("@/paises/tg/calculadoras/convertisseur-euro-fcfa"),
  "cotisations-cnss": () => import("@/paises/tg/calculadoras/cotisations-cnss"),
  "cout-employeur": () => import("@/paises/tg/calculadoras/cout-employeur"),
  "heures-supplementaires": () => import("@/paises/tg/calculadoras/heures-supplementaires"),
  "impot-sur-les-dividendes": () => import("@/paises/tg/calculadoras/impot-sur-les-dividendes"),
  "impot-sur-les-loyers": () => import("@/paises/tg/calculadoras/impot-sur-les-loyers"),
  "impot-sur-les-societes": () => import("@/paises/tg/calculadoras/impot-sur-les-societes"),
  "indemnite-fin-de-contrat": () => import("@/paises/tg/calculadoras/indemnite-fin-de-contrat"),
  "indemnite-licenciement": () => import("@/paises/tg/calculadoras/indemnite-licenciement"),
  "plus-value-immobiliere": () => import("@/paises/tg/calculadoras/plus-value-immobiliere"),
  "preavis": () => import("@/paises/tg/calculadoras/preavis"),
  "retenue-a-la-source": () => import("@/paises/tg/calculadoras/retenue-a-la-source"),
  "smig": () => import("@/paises/tg/calculadoras/smig"),
  "taxe-fonciere": () => import("@/paises/tg/calculadoras/taxe-fonciere"),
  "taxe-professionnelle-unique": () => import("@/paises/tg/calculadoras/taxe-professionnelle-unique"),
  "vignette-auto": () => import("@/paises/tg/calculadoras/vignette-auto"),
};
