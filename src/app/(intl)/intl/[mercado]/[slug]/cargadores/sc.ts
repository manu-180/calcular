// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/sc/calculadoras/annual-leave-calculator"),
  "business-tax-calculator": () => import("@/paises/sc/calculadoras/business-tax-calculator"),
  "employer-cost-calculator": () => import("@/paises/sc/calculadoras/employer-cost-calculator"),
  "immovable-property-tax-calculator": () => import("@/paises/sc/calculadoras/immovable-property-tax-calculator"),
  "income-tax-calculator": () => import("@/paises/sc/calculadoras/income-tax-calculator"),
  "maternity-leave-calculator": () => import("@/paises/sc/calculadoras/maternity-leave-calculator"),
  "minimum-wage-calculator": () => import("@/paises/sc/calculadoras/minimum-wage-calculator"),
  "net-salary-calculator": () => import("@/paises/sc/calculadoras/net-salary-calculator"),
  "notice-period-calculator": () => import("@/paises/sc/calculadoras/notice-period-calculator"),
  "overtime-calculator": () => import("@/paises/sc/calculadoras/overtime-calculator"),
  "presumptive-tax-calculator": () => import("@/paises/sc/calculadoras/presumptive-tax-calculator"),
  "public-holiday-pay-calculator": () => import("@/paises/sc/calculadoras/public-holiday-pay-calculator"),
  "severance-pay-calculator": () => import("@/paises/sc/calculadoras/severance-pay-calculator"),
  "sick-leave-calculator": () => import("@/paises/sc/calculadoras/sick-leave-calculator"),
  "spf-contribution-calculator": () => import("@/paises/sc/calculadoras/spf-contribution-calculator"),
  "thirteenth-month-pay-calculator": () => import("@/paises/sc/calculadoras/thirteenth-month-pay-calculator"),
  "vat-calculator": () => import("@/paises/sc/calculadoras/vat-calculator"),
  "withholding-tax-calculator": () => import("@/paises/sc/calculadoras/withholding-tax-calculator"),
};
