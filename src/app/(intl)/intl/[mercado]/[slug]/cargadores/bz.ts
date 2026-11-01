// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "employer-cost-calculator": () => import("@/paises/bz/calculadoras/employer-cost-calculator"),
  "final-pay-calculator": () => import("@/paises/bz/calculadoras/final-pay-calculator"),
  "gst-calculator": () => import("@/paises/bz/calculadoras/gst-calculator"),
  "income-tax-calculator": () => import("@/paises/bz/calculadoras/income-tax-calculator"),
  "maternity-leave-calculator": () => import("@/paises/bz/calculadoras/maternity-leave-calculator"),
  "minimum-wage-calculator": () => import("@/paises/bz/calculadoras/minimum-wage-calculator"),
  "net-salary-calculator": () => import("@/paises/bz/calculadoras/net-salary-calculator"),
  "notice-pay-calculator": () => import("@/paises/bz/calculadoras/notice-pay-calculator"),
  "overtime-calculator": () => import("@/paises/bz/calculadoras/overtime-calculator"),
  "severance-pay-calculator": () => import("@/paises/bz/calculadoras/severance-pay-calculator"),
  "sick-leave-pay-calculator": () => import("@/paises/bz/calculadoras/sick-leave-pay-calculator"),
  "social-security-calculator": () => import("@/paises/bz/calculadoras/social-security-calculator"),
  "usd-to-bzd": () => import("@/paises/bz/calculadoras/usd-to-bzd"),
  "vacation-pay-calculator": () => import("@/paises/bz/calculadoras/vacation-pay-calculator"),
};
