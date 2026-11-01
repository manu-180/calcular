// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => import("@/paises/qa/calculadoras/annual-leave"),
  "corporate-tax-calculator": () => import("@/paises/qa/calculadoras/corporate-tax-calculator"),
  "domestic-worker-gratuity": () => import("@/paises/qa/calculadoras/domestic-worker-gratuity"),
  "employer-cost-calculator": () => import("@/paises/qa/calculadoras/employer-cost-calculator"),
  "excise-tax-calculator": () => import("@/paises/qa/calculadoras/excise-tax-calculator"),
  "final-settlement": () => import("@/paises/qa/calculadoras/final-settlement"),
  "gratuity-calculator": () => import("@/paises/qa/calculadoras/gratuity-calculator"),
  "grsia-contribution-calculator": () => import("@/paises/qa/calculadoras/grsia-contribution-calculator"),
  "maternity-leave-pay": () => import("@/paises/qa/calculadoras/maternity-leave-pay"),
  "minimum-wage": () => import("@/paises/qa/calculadoras/minimum-wage"),
  "notice-period": () => import("@/paises/qa/calculadoras/notice-period"),
  "overtime-calculator": () => import("@/paises/qa/calculadoras/overtime-calculator"),
  "pension-calculator": () => import("@/paises/qa/calculadoras/pension-calculator"),
  "property-registration-fee": () => import("@/paises/qa/calculadoras/property-registration-fee"),
  "qar-usd-converter": () => import("@/paises/qa/calculadoras/qar-usd-converter"),
  "ramadan-working-hours": () => import("@/paises/qa/calculadoras/ramadan-working-hours"),
  "sick-leave-pay": () => import("@/paises/qa/calculadoras/sick-leave-pay"),
  "sugar-tax-calculator": () => import("@/paises/qa/calculadoras/sugar-tax-calculator"),
  "take-home-pay": () => import("@/paises/qa/calculadoras/take-home-pay"),
  "withholding-tax-calculator": () => import("@/paises/qa/calculadoras/withholding-tax-calculator"),
};
