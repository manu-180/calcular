// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "401k-contribution": () => import("@/paises/us/calculadoras/401k-contribution"),
  "bonus-tax": () => import("@/paises/us/calculadoras/bonus-tax"),
  "capital-gains-tax": () => import("@/paises/us/calculadoras/capital-gains-tax"),
  "child-tax-credit": () => import("@/paises/us/calculadoras/child-tax-credit"),
  "employer-payroll-tax": () => import("@/paises/us/calculadoras/employer-payroll-tax"),
  "federal-income-tax": () => import("@/paises/us/calculadoras/federal-income-tax"),
  "fica-tax": () => import("@/paises/us/calculadoras/fica-tax"),
  "hsa-contribution": () => import("@/paises/us/calculadoras/hsa-contribution"),
  "inflation-calculator": () => import("@/paises/us/calculadoras/inflation-calculator"),
  "mileage-reimbursement": () => import("@/paises/us/calculadoras/mileage-reimbursement"),
  "minimum-wage": () => import("@/paises/us/calculadoras/minimum-wage"),
  "no-tax-on-overtime": () => import("@/paises/us/calculadoras/no-tax-on-overtime"),
  "no-tax-on-tips": () => import("@/paises/us/calculadoras/no-tax-on-tips"),
  "overtime": () => import("@/paises/us/calculadoras/overtime"),
  "quarterly-estimated-taxes": () => import("@/paises/us/calculadoras/quarterly-estimated-taxes"),
  "rmd-calculator": () => import("@/paises/us/calculadoras/rmd-calculator"),
  "roth-ira-contribution": () => import("@/paises/us/calculadoras/roth-ira-contribution"),
  "sales-tax": () => import("@/paises/us/calculadoras/sales-tax"),
  "self-employment-tax": () => import("@/paises/us/calculadoras/self-employment-tax"),
  "senior-deduction": () => import("@/paises/us/calculadoras/senior-deduction"),
  "social-security-benefits": () => import("@/paises/us/calculadoras/social-security-benefits"),
  "standard-deduction": () => import("@/paises/us/calculadoras/standard-deduction"),
  "take-home-pay": () => import("@/paises/us/calculadoras/take-home-pay"),
};
