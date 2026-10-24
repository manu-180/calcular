// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "advance-tax-calculator": () => import("@/paises/ke/calculadoras/advance-tax-calculator"),
  "annual-leave-calculator": () => import("@/paises/ke/calculadoras/annual-leave-calculator"),
  "capital-gains-tax-calculator": () => import("@/paises/ke/calculadoras/capital-gains-tax-calculator"),
  "dollar-to-shilling": () => import("@/paises/ke/calculadoras/dollar-to-shilling"),
  "employer-cost-calculator": () => import("@/paises/ke/calculadoras/employer-cost-calculator"),
  "housing-levy-calculator": () => import("@/paises/ke/calculadoras/housing-levy-calculator"),
  "inflation-calculator": () => import("@/paises/ke/calculadoras/inflation-calculator"),
  "maternity-leave-calculator": () => import("@/paises/ke/calculadoras/maternity-leave-calculator"),
  "minimum-wage": () => import("@/paises/ke/calculadoras/minimum-wage"),
  "net-salary-calculator": () => import("@/paises/ke/calculadoras/net-salary-calculator"),
  "notice-period-calculator": () => import("@/paises/ke/calculadoras/notice-period-calculator"),
  "nssf-calculator": () => import("@/paises/ke/calculadoras/nssf-calculator"),
  "overtime-calculator": () => import("@/paises/ke/calculadoras/overtime-calculator"),
  "paye-calculator": () => import("@/paises/ke/calculadoras/paye-calculator"),
  "paye-penalty-calculator": () => import("@/paises/ke/calculadoras/paye-penalty-calculator"),
  "redundancy-calculator": () => import("@/paises/ke/calculadoras/redundancy-calculator"),
  "rental-income-tax-calculator": () => import("@/paises/ke/calculadoras/rental-income-tax-calculator"),
  "shif-calculator": () => import("@/paises/ke/calculadoras/shif-calculator"),
  "sick-leave-calculator": () => import("@/paises/ke/calculadoras/sick-leave-calculator"),
  "stamp-duty-calculator": () => import("@/paises/ke/calculadoras/stamp-duty-calculator"),
  "treasury-bill-calculator": () => import("@/paises/ke/calculadoras/treasury-bill-calculator"),
  "turnover-tax-calculator": () => import("@/paises/ke/calculadoras/turnover-tax-calculator"),
  "vat-calculator": () => import("@/paises/ke/calculadoras/vat-calculator"),
  "withholding-tax-calculator": () => import("@/paises/ke/calculadoras/withholding-tax-calculator"),
};
