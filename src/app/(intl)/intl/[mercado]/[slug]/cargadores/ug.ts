// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/ug/calculadoras/annual-leave-calculator"),
  "dollar-to-shilling": () => import("@/paises/ug/calculadoras/dollar-to-shilling"),
  "employer-cost-calculator": () => import("@/paises/ug/calculadoras/employer-cost-calculator"),
  "inflation-calculator": () => import("@/paises/ug/calculadoras/inflation-calculator"),
  "local-service-tax-calculator": () => import("@/paises/ug/calculadoras/local-service-tax-calculator"),
  "maternity-leave-calculator": () => import("@/paises/ug/calculadoras/maternity-leave-calculator"),
  "net-salary-calculator": () => import("@/paises/ug/calculadoras/net-salary-calculator"),
  "notice-period-calculator": () => import("@/paises/ug/calculadoras/notice-period-calculator"),
  "nssf-calculator": () => import("@/paises/ug/calculadoras/nssf-calculator"),
  "nssf-midterm-access-calculator": () => import("@/paises/ug/calculadoras/nssf-midterm-access-calculator"),
  "overtime-calculator": () => import("@/paises/ug/calculadoras/overtime-calculator"),
  "paye-calculator": () => import("@/paises/ug/calculadoras/paye-calculator"),
  "presumptive-tax-calculator": () => import("@/paises/ug/calculadoras/presumptive-tax-calculator"),
  "rental-income-tax-calculator": () => import("@/paises/ug/calculadoras/rental-income-tax-calculator"),
  "severance-pay-calculator": () => import("@/paises/ug/calculadoras/severance-pay-calculator"),
  "sick-pay-calculator": () => import("@/paises/ug/calculadoras/sick-pay-calculator"),
  "stamp-duty-calculator": () => import("@/paises/ug/calculadoras/stamp-duty-calculator"),
  "terminal-benefits-calculator": () => import("@/paises/ug/calculadoras/terminal-benefits-calculator"),
  "withholding-tax-calculator": () => import("@/paises/ug/calculadoras/withholding-tax-calculator"),
};
