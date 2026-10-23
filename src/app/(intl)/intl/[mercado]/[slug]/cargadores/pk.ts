// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "bank-profit-tax-calculator": () => import("@/paises/pk/calculadoras/bank-profit-tax-calculator"),
  "behbood-savings-certificate-calculator": () => import("@/paises/pk/calculadoras/behbood-savings-certificate-calculator"),
  "dollar-to-pkr": () => import("@/paises/pk/calculadoras/dollar-to-pkr"),
  "employer-cost-calculator": () => import("@/paises/pk/calculadoras/employer-cost-calculator"),
  "eobi-calculator": () => import("@/paises/pk/calculadoras/eobi-calculator"),
  "foreign-card-tax-calculator": () => import("@/paises/pk/calculadoras/foreign-card-tax-calculator"),
  "minimum-wage": () => import("@/paises/pk/calculadoras/minimum-wage"),
  "national-savings-account-calculator": () => import("@/paises/pk/calculadoras/national-savings-account-calculator"),
  "property-transfer-tax-calculator": () => import("@/paises/pk/calculadoras/property-transfer-tax-calculator"),
  "regular-income-certificate-calculator": () => import("@/paises/pk/calculadoras/regular-income-certificate-calculator"),
  "salary-tax-calculator": () => import("@/paises/pk/calculadoras/salary-tax-calculator"),
  "sales-tax-calculator": () => import("@/paises/pk/calculadoras/sales-tax-calculator"),
  "short-term-savings-certificate-calculator": () => import("@/paises/pk/calculadoras/short-term-savings-certificate-calculator"),
  "special-savings-certificate-calculator": () => import("@/paises/pk/calculadoras/special-savings-certificate-calculator"),
  "take-home-salary-calculator": () => import("@/paises/pk/calculadoras/take-home-salary-calculator"),
  "zakat-calculator": () => import("@/paises/pk/calculadoras/zakat-calculator"),
};
