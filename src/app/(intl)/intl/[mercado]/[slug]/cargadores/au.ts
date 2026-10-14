// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/au/calculadoras/annual-leave-calculator"),
  "capital-gains-tax-calculator": () => import("@/paises/au/calculadoras/capital-gains-tax-calculator"),
  "car-expenses-calculator": () => import("@/paises/au/calculadoras/car-expenses-calculator"),
  "gst-calculator": () => import("@/paises/au/calculadoras/gst-calculator"),
  "hecs-help-repayment-calculator": () => import("@/paises/au/calculadoras/hecs-help-repayment-calculator"),
  "income-tax-calculator": () => import("@/paises/au/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/au/calculadoras/inflation-calculator"),
  "medicare-levy-calculator": () => import("@/paises/au/calculadoras/medicare-levy-calculator"),
  "minimum-wage": () => import("@/paises/au/calculadoras/minimum-wage"),
  "notice-period-calculator": () => import("@/paises/au/calculadoras/notice-period-calculator"),
  "pay-calculator": () => import("@/paises/au/calculadoras/pay-calculator"),
  "redundancy-pay-calculator": () => import("@/paises/au/calculadoras/redundancy-pay-calculator"),
  "salary-sacrifice-calculator": () => import("@/paises/au/calculadoras/salary-sacrifice-calculator"),
  "sick-leave-calculator": () => import("@/paises/au/calculadoras/sick-leave-calculator"),
  "stamp-duty-calculator-nsw": () => import("@/paises/au/calculadoras/stamp-duty-calculator-nsw"),
  "stamp-duty-calculator-qld": () => import("@/paises/au/calculadoras/stamp-duty-calculator-qld"),
  "stamp-duty-calculator-vic": () => import("@/paises/au/calculadoras/stamp-duty-calculator-vic"),
  "super-guarantee-calculator": () => import("@/paises/au/calculadoras/super-guarantee-calculator"),
  "work-from-home-deduction": () => import("@/paises/au/calculadoras/work-from-home-deduction"),
};
