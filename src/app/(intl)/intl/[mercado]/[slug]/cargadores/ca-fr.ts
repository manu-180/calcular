// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import { traducida } from "@/motor/edicion";
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calcul-allocation-canadienne-pour-enfants": () => traducida(import("@/paises/ca/calculadoras/canada-child-benefit"), import("@/paises/ca-fr/textos/canada-child-benefit")),
  "calcul-cotisations-assurance-emploi": () => traducida(import("@/paises/ca/calculadoras/ei-premium-calculator"), import("@/paises/ca-fr/textos/ei-premium-calculator")),
  "calcul-cotisations-rrq": () => traducida(import("@/paises/ca/calculadoras/cpp-calculator"), import("@/paises/ca-fr/textos/cpp-calculator")),
  "calcul-hypotheque-taux-variable": () => traducida(import("@/paises/ca/calculadoras/variable-rate-mortgage"), import("@/paises/ca-fr/textos/variable-rate-mortgage")),
  "calcul-prestations-assurance-emploi": () => traducida(import("@/paises/ca/calculadoras/ei-benefits-calculator"), import("@/paises/ca-fr/textos/ei-benefits-calculator")),
  "calculatrice-inflation": () => traducida(import("@/paises/ca/calculadoras/inflation-calculator"), import("@/paises/ca-fr/textos/inflation-calculator")),
  "calculatrice-tps-tvq": () => traducida(import("@/paises/ca/calculadoras/sales-tax-calculator"), import("@/paises/ca-fr/textos/sales-tax-calculator")),
  "convertisseur-dollar-americain": () => traducida(import("@/paises/ca/calculadoras/usd-to-cad"), import("@/paises/ca-fr/textos/usd-to-cad")),
  "cout-employeur-salarie": () => traducida(import("@/paises/ca/calculadoras/employer-payroll-cost"), import("@/paises/ca-fr/textos/employer-payroll-cost")),
  "droits-cotisation-celi": () => traducida(import("@/paises/ca/calculadoras/tfsa-contribution-room"), import("@/paises/ca-fr/textos/tfsa-contribution-room")),
  "plafond-cotisation-reer": () => traducida(import("@/paises/ca/calculadoras/rrsp-contribution-limit"), import("@/paises/ca-fr/textos/rrsp-contribution-limit")),
  "recuperation-securite-vieillesse": () => traducida(import("@/paises/ca/calculadoras/oas-clawback"), import("@/paises/ca-fr/textos/oas-clawback")),
  "salaire-minimum": () => traducida(import("@/paises/ca/calculadoras/minimum-wage"), import("@/paises/ca-fr/textos/minimum-wage")),
};
