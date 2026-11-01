// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/mu/calculadoras/annual-leave-calculator"),
  "csg-calculator": () => import("@/paises/mu/calculadoras/csg-calculator"),
  "csg-income-allowance-calculator": () => import("@/paises/mu/calculadoras/csg-income-allowance-calculator"),
  "employer-cost-calculator": () => import("@/paises/mu/calculadoras/employer-cost-calculator"),
  "end-of-year-bonus-calculator": () => import("@/paises/mu/calculadoras/end-of-year-bonus-calculator"),
  "income-tax-calculator": () => import("@/paises/mu/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/mu/calculadoras/inflation-calculator"),
  "maternity-leave-calculator": () => import("@/paises/mu/calculadoras/maternity-leave-calculator"),
  "minimum-wage": () => import("@/paises/mu/calculadoras/minimum-wage"),
  "notice-period-calculator": () => import("@/paises/mu/calculadoras/notice-period-calculator"),
  "overtime-calculator": () => import("@/paises/mu/calculadoras/overtime-calculator"),
  "paye-calculator": () => import("@/paises/mu/calculadoras/paye-calculator"),
  "pension-age-calculator": () => import("@/paises/mu/calculadoras/pension-age-calculator"),
  "registration-duty-calculator": () => import("@/paises/mu/calculadoras/registration-duty-calculator"),
  "retirement-gratuity-calculator": () => import("@/paises/mu/calculadoras/retirement-gratuity-calculator"),
  "rupee-exchange-rate": () => import("@/paises/mu/calculadoras/rupee-exchange-rate"),
  "salary-calculator": () => import("@/paises/mu/calculadoras/salary-calculator"),
  "salary-compensation-calculator": () => import("@/paises/mu/calculadoras/salary-compensation-calculator"),
  "severance-allowance-calculator": () => import("@/paises/mu/calculadoras/severance-allowance-calculator"),
  "sick-leave-calculator": () => import("@/paises/mu/calculadoras/sick-leave-calculator"),
  "vat-calculator": () => import("@/paises/mu/calculadoras/vat-calculator"),
};
