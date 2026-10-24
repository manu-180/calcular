// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import { traducida } from "@/motor/edicion";
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "abfindung-rechner": () => traducida(import("@/paises/lu/calculadoras/indemnite-de-depart"), import("@/paises/lu-de/textos/indemnite-de-depart")),
  "arbeitgeberkosten-rechner": () => traducida(import("@/paises/lu/calculadoras/cout-employeur"), import("@/paises/lu-de/textos/cout-employeur")),
  "brutto-netto-rechner": () => traducida(import("@/paises/lu/calculadoras/salaire-brut-net"), import("@/paises/lu-de/textos/salaire-brut-net")),
  "einkommensteuer-rechner": () => traducida(import("@/paises/lu/calculadoras/impot-sur-le-revenu"), import("@/paises/lu-de/textos/impot-sur-le-revenu")),
  "familienzulagen-rechner": () => traducida(import("@/paises/lu/calculadoras/allocations-familiales"), import("@/paises/lu-de/textos/allocations-familiales")),
  "indextranche-rechner": () => traducida(import("@/paises/lu/calculadoras/indexation-salaires"), import("@/paises/lu-de/textos/indexation-salaires")),
  "inflationsrechner": () => traducida(import("@/paises/lu/calculadoras/calcul-inflation"), import("@/paises/lu-de/textos/calcul-inflation")),
  "kuendigungsfrist-rechner": () => traducida(import("@/paises/lu/calculadoras/preavis-licenciement"), import("@/paises/lu-de/textos/preavis-licenciement")),
  "mehrwertsteuer-rechner": () => traducida(import("@/paises/lu/calculadoras/calcul-tva"), import("@/paises/lu-de/textos/calcul-tva")),
  "mindestlohn-rechner": () => traducida(import("@/paises/lu/calculadoras/salaire-social-minimum"), import("@/paises/lu-de/textos/salaire-social-minimum")),
  "registrierungsgebuehren-rechner": () => traducida(import("@/paises/lu/calculadoras/droits-enregistrement"), import("@/paises/lu-de/textos/droits-enregistrement")),
  "sozialversicherungsbeitraege-rechner": () => traducida(import("@/paises/lu/calculadoras/cotisations-sociales"), import("@/paises/lu-de/textos/cotisations-sociales")),
  "ueberstunden-rechner": () => traducida(import("@/paises/lu/calculadoras/heures-supplementaires"), import("@/paises/lu-de/textos/heures-supplementaires")),
  "urlaubsrechner": () => traducida(import("@/paises/lu/calculadoras/conges-payes"), import("@/paises/lu-de/textos/conges-payes")),
};
