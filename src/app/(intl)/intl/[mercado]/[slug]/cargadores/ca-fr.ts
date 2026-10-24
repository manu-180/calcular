// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import { traducida } from "@/motor/edicion";
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calcul-allocation-canadienne-pour-enfants": () => traducida(import("@/paises/ca/calculadoras/canada-child-benefit"), import("@/paises/ca-fr/textos/canada-child-benefit")),
  "calcul-cotisations-assurance-emploi": () => traducida(import("@/paises/ca/calculadoras/ei-premium-calculator"), import("@/paises/ca-fr/textos/ei-premium-calculator")),
  "calcul-cotisations-rrq": () => traducida(import("@/paises/ca/calculadoras/cpp-calculator"), import("@/paises/ca-fr/textos/cpp-calculator")),
  "calcul-heures-supplementaires": () => traducida(import("@/paises/ca/calculadoras/quebec-overtime"), import("@/paises/ca-fr/textos/quebec-overtime")),
  "calcul-hypotheque-taux-variable": () => traducida(import("@/paises/ca/calculadoras/variable-rate-mortgage"), import("@/paises/ca-fr/textos/variable-rate-mortgage")),
  "calcul-impot-revenu": () => traducida(import("@/paises/ca/calculadoras/income-tax-calculator"), import("@/paises/ca-fr/textos/income-tax-calculator")),
  "calcul-indemnite-de-vacances": () => traducida(import("@/paises/ca/calculadoras/quebec-vacation-pay"), import("@/paises/ca-fr/textos/quebec-vacation-pay")),
  "calcul-preavis-fin-emploi": () => traducida(import("@/paises/ca/calculadoras/quebec-notice-of-termination"), import("@/paises/ca-fr/textos/quebec-notice-of-termination")),
  "calcul-prestations-assurance-emploi": () => traducida(import("@/paises/ca/calculadoras/ei-benefits-calculator"), import("@/paises/ca-fr/textos/ei-benefits-calculator")),
  "calcul-salaire-net": () => traducida(import("@/paises/ca/calculadoras/take-home-pay"), import("@/paises/ca-fr/textos/take-home-pay")),
  "calcul-taxe-de-bienvenue": () => traducida(import("@/paises/ca/calculadoras/land-transfer-tax"), import("@/paises/ca-fr/textos/land-transfer-tax")),
  "calculatrice-inflation": () => traducida(import("@/paises/ca/calculadoras/inflation-calculator"), import("@/paises/ca-fr/textos/inflation-calculator")),
  "calculatrice-tps-tvq": () => traducida(import("@/paises/ca/calculadoras/sales-tax-calculator"), import("@/paises/ca-fr/textos/sales-tax-calculator")),
  "convertisseur-dollar-americain": () => traducida(import("@/paises/ca/calculadoras/usd-to-cad"), import("@/paises/ca-fr/textos/usd-to-cad")),
  "cout-employeur-salarie": () => traducida(import("@/paises/ca/calculadoras/employer-payroll-cost"), import("@/paises/ca-fr/textos/employer-payroll-cost")),
  "droits-cotisation-celi": () => traducida(import("@/paises/ca/calculadoras/tfsa-contribution-room"), import("@/paises/ca-fr/textos/tfsa-contribution-room")),
  "plafond-cotisation-reer": () => traducida(import("@/paises/ca/calculadoras/rrsp-contribution-limit"), import("@/paises/ca-fr/textos/rrsp-contribution-limit")),
  "recuperation-securite-vieillesse": () => traducida(import("@/paises/ca/calculadoras/oas-clawback"), import("@/paises/ca-fr/textos/oas-clawback")),
  "salaire-minimum": () => traducida(import("@/paises/ca/calculadoras/minimum-wage"), import("@/paises/ca-fr/textos/minimum-wage")),
};
