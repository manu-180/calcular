// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/ws/calculadoras/annual-leave-calculator"),
  "business-income-tax-calculator": () => import("@/paises/ws/calculadoras/business-income-tax-calculator"),
  "employer-cost-calculator": () => import("@/paises/ws/calculadoras/employer-cost-calculator"),
  "final-pay-calculator": () => import("@/paises/ws/calculadoras/final-pay-calculator"),
  "inflation-calculator": () => import("@/paises/ws/calculadoras/inflation-calculator"),
  "maternity-leave-calculator": () => import("@/paises/ws/calculadoras/maternity-leave-calculator"),
  "minimum-wage": () => import("@/paises/ws/calculadoras/minimum-wage"),
  "net-pay-calculator": () => import("@/paises/ws/calculadoras/net-pay-calculator"),
  "notice-period-calculator": () => import("@/paises/ws/calculadoras/notice-period-calculator"),
  "npf-calculator": () => import("@/paises/ws/calculadoras/npf-calculator"),
  "overtime-calculator": () => import("@/paises/ws/calculadoras/overtime-calculator"),
  "paye-calculator": () => import("@/paises/ws/calculadoras/paye-calculator"),
  "provisional-tax-calculator": () => import("@/paises/ws/calculadoras/provisional-tax-calculator"),
  "usd-to-wst": () => import("@/paises/ws/calculadoras/usd-to-wst"),
  "vagst-calculator": () => import("@/paises/ws/calculadoras/vagst-calculator"),
  "withholding-tax-calculator": () => import("@/paises/ws/calculadoras/withholding-tax-calculator"),
};
