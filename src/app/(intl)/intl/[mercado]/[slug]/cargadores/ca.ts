// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "canada-child-benefit": () => import("@/paises/ca/calculadoras/canada-child-benefit"),
  "capital-gains-tax": () => import("@/paises/ca/calculadoras/capital-gains-tax"),
  "cpp-calculator": () => import("@/paises/ca/calculadoras/cpp-calculator"),
  "ei-benefits-calculator": () => import("@/paises/ca/calculadoras/ei-benefits-calculator"),
  "ei-premium-calculator": () => import("@/paises/ca/calculadoras/ei-premium-calculator"),
  "employer-payroll-cost": () => import("@/paises/ca/calculadoras/employer-payroll-cost"),
  "income-tax-calculator": () => import("@/paises/ca/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/ca/calculadoras/inflation-calculator"),
  "land-transfer-tax": () => import("@/paises/ca/calculadoras/land-transfer-tax"),
  "minimum-wage": () => import("@/paises/ca/calculadoras/minimum-wage"),
  "oas-clawback": () => import("@/paises/ca/calculadoras/oas-clawback"),
  "overtime-calculator": () => import("@/paises/ca/calculadoras/overtime-calculator"),
  "rrsp-contribution-limit": () => import("@/paises/ca/calculadoras/rrsp-contribution-limit"),
  "sales-tax-calculator": () => import("@/paises/ca/calculadoras/sales-tax-calculator"),
  "severance-pay": () => import("@/paises/ca/calculadoras/severance-pay"),
  "take-home-pay": () => import("@/paises/ca/calculadoras/take-home-pay"),
  "termination-pay": () => import("@/paises/ca/calculadoras/termination-pay"),
  "tfsa-contribution-room": () => import("@/paises/ca/calculadoras/tfsa-contribution-room"),
  "usd-to-cad": () => import("@/paises/ca/calculadoras/usd-to-cad"),
  "vacation-pay": () => import("@/paises/ca/calculadoras/vacation-pay"),
  "variable-rate-mortgage": () => import("@/paises/ca/calculadoras/variable-rate-mortgage"),
};
