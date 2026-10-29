// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => import("@/paises/ls/calculadoras/annual-leave"),
  "bonus-tax-calculator": () => import("@/paises/ls/calculadoras/bonus-tax-calculator"),
  "company-tax-calculator": () => import("@/paises/ls/calculadoras/company-tax-calculator"),
  "final-pay": () => import("@/paises/ls/calculadoras/final-pay"),
  "fringe-benefits-tax": () => import("@/paises/ls/calculadoras/fringe-benefits-tax"),
  "gross-salary-calculator": () => import("@/paises/ls/calculadoras/gross-salary-calculator"),
  "hourly-rate-calculator": () => import("@/paises/ls/calculadoras/hourly-rate-calculator"),
  "income-tax-calculator": () => import("@/paises/ls/calculadoras/income-tax-calculator"),
  "maternity-leave": () => import("@/paises/ls/calculadoras/maternity-leave"),
  "notice-period": () => import("@/paises/ls/calculadoras/notice-period"),
  "overtime-calculator": () => import("@/paises/ls/calculadoras/overtime-calculator"),
  "pension-lump-sum-tax": () => import("@/paises/ls/calculadoras/pension-lump-sum-tax"),
  "severance-pay": () => import("@/paises/ls/calculadoras/severance-pay"),
  "sick-leave": () => import("@/paises/ls/calculadoras/sick-leave"),
  "take-home-pay": () => import("@/paises/ls/calculadoras/take-home-pay"),
  "vat-calculator": () => import("@/paises/ls/calculadoras/vat-calculator"),
  "withholding-tax-calculator": () => import("@/paises/ls/calculadoras/withholding-tax-calculator"),
};
