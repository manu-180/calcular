// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => import("@/paises/ae/calculadoras/annual-leave"),
  "corporate-tax-calculator": () => import("@/paises/ae/calculadoras/corporate-tax-calculator"),
  "dewa-bill-calculator": () => import("@/paises/ae/calculadoras/dewa-bill-calculator"),
  "dubai-transfer-fee": () => import("@/paises/ae/calculadoras/dubai-transfer-fee"),
  "eibor-mortgage-calculator": () => import("@/paises/ae/calculadoras/eibor-mortgage-calculator"),
  "emirati-minimum-wage": () => import("@/paises/ae/calculadoras/emirati-minimum-wage"),
  "emiratisation-contribution": () => import("@/paises/ae/calculadoras/emiratisation-contribution"),
  "employer-cost-calculator": () => import("@/paises/ae/calculadoras/employer-cost-calculator"),
  "gpssa-contribution-calculator": () => import("@/paises/ae/calculadoras/gpssa-contribution-calculator"),
  "gratuity-calculator": () => import("@/paises/ae/calculadoras/gratuity-calculator"),
  "maternity-leave-pay": () => import("@/paises/ae/calculadoras/maternity-leave-pay"),
  "notice-period": () => import("@/paises/ae/calculadoras/notice-period"),
  "overtime-calculator": () => import("@/paises/ae/calculadoras/overtime-calculator"),
  "rental-yield-calculator": () => import("@/paises/ae/calculadoras/rental-yield-calculator"),
  "sick-leave-pay": () => import("@/paises/ae/calculadoras/sick-leave-pay"),
  "take-home-pay": () => import("@/paises/ae/calculadoras/take-home-pay"),
  "tourist-vat-refund": () => import("@/paises/ae/calculadoras/tourist-vat-refund"),
  "unemployment-insurance": () => import("@/paises/ae/calculadoras/unemployment-insurance"),
};
