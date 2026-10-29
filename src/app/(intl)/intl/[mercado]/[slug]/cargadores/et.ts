// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/et/calculadoras/annual-leave-calculator"),
  "business-income-tax-calculator": () => import("@/paises/et/calculadoras/business-income-tax-calculator"),
  "dividend-tax-calculator": () => import("@/paises/et/calculadoras/dividend-tax-calculator"),
  "dollar-to-birr": () => import("@/paises/et/calculadoras/dollar-to-birr"),
  "employer-cost-calculator": () => import("@/paises/et/calculadoras/employer-cost-calculator"),
  "final-settlement-calculator": () => import("@/paises/et/calculadoras/final-settlement-calculator"),
  "gross-salary-calculator": () => import("@/paises/et/calculadoras/gross-salary-calculator"),
  "income-tax-calculator": () => import("@/paises/et/calculadoras/income-tax-calculator"),
  "maternity-leave-calculator": () => import("@/paises/et/calculadoras/maternity-leave-calculator"),
  "net-salary-calculator": () => import("@/paises/et/calculadoras/net-salary-calculator"),
  "notice-period-calculator": () => import("@/paises/et/calculadoras/notice-period-calculator"),
  "overtime-calculator": () => import("@/paises/et/calculadoras/overtime-calculator"),
  "pension-calculator": () => import("@/paises/et/calculadoras/pension-calculator"),
  "pension-contribution-calculator": () => import("@/paises/et/calculadoras/pension-contribution-calculator"),
  "public-holiday-pay-calculator": () => import("@/paises/et/calculadoras/public-holiday-pay-calculator"),
  "rental-income-tax-calculator": () => import("@/paises/et/calculadoras/rental-income-tax-calculator"),
  "severance-pay-calculator": () => import("@/paises/et/calculadoras/severance-pay-calculator"),
  "sick-leave-calculator": () => import("@/paises/et/calculadoras/sick-leave-calculator"),
  "vat-calculator": () => import("@/paises/et/calculadoras/vat-calculator"),
  "withholding-tax-calculator": () => import("@/paises/et/calculadoras/withholding-tax-calculator"),
};
