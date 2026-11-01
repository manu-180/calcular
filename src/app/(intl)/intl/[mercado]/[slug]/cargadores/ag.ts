// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "abst-calculator": () => import("@/paises/ag/calculadoras/abst-calculator"),
  "employer-cost-calculator": () => import("@/paises/ag/calculadoras/employer-cost-calculator"),
  "maternity-allowance-calculator": () => import("@/paises/ag/calculadoras/maternity-allowance-calculator"),
  "medical-benefits-calculator": () => import("@/paises/ag/calculadoras/medical-benefits-calculator"),
  "minimum-wage-calculator": () => import("@/paises/ag/calculadoras/minimum-wage-calculator"),
  "notice-period-calculator": () => import("@/paises/ag/calculadoras/notice-period-calculator"),
  "overtime-calculator": () => import("@/paises/ag/calculadoras/overtime-calculator"),
  "public-holiday-pay-calculator": () => import("@/paises/ag/calculadoras/public-holiday-pay-calculator"),
  "severance-pay-calculator": () => import("@/paises/ag/calculadoras/severance-pay-calculator"),
  "sick-leave-pay-calculator": () => import("@/paises/ag/calculadoras/sick-leave-pay-calculator"),
  "sickness-benefit-calculator": () => import("@/paises/ag/calculadoras/sickness-benefit-calculator"),
  "social-security-calculator": () => import("@/paises/ag/calculadoras/social-security-calculator"),
  "take-home-pay-calculator": () => import("@/paises/ag/calculadoras/take-home-pay-calculator"),
  "unincorporated-business-tax-calculator": () => import("@/paises/ag/calculadoras/unincorporated-business-tax-calculator"),
  "usd-to-xcd": () => import("@/paises/ag/calculadoras/usd-to-xcd"),
  "vacation-leave-calculator": () => import("@/paises/ag/calculadoras/vacation-leave-calculator"),
};
