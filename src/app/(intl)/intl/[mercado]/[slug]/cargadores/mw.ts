// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/mw/calculadoras/annual-leave-calculator"),
  "capital-gains-tax-calculator": () => import("@/paises/mw/calculadoras/capital-gains-tax-calculator"),
  "dollar-to-kwacha": () => import("@/paises/mw/calculadoras/dollar-to-kwacha"),
  "employer-cost-calculator": () => import("@/paises/mw/calculadoras/employer-cost-calculator"),
  "fringe-benefit-tax-calculator": () => import("@/paises/mw/calculadoras/fringe-benefit-tax-calculator"),
  "inflation-calculator": () => import("@/paises/mw/calculadoras/inflation-calculator"),
  "maternity-leave-calculator": () => import("@/paises/mw/calculadoras/maternity-leave-calculator"),
  "net-salary-calculator": () => import("@/paises/mw/calculadoras/net-salary-calculator"),
  "notice-period-calculator": () => import("@/paises/mw/calculadoras/notice-period-calculator"),
  "overtime-calculator": () => import("@/paises/mw/calculadoras/overtime-calculator"),
  "paye-calculator": () => import("@/paises/mw/calculadoras/paye-calculator"),
  "pension-calculator": () => import("@/paises/mw/calculadoras/pension-calculator"),
  "personal-income-tax-calculator": () => import("@/paises/mw/calculadoras/personal-income-tax-calculator"),
  "presumptive-tax-calculator": () => import("@/paises/mw/calculadoras/presumptive-tax-calculator"),
  "severance-pay-calculator": () => import("@/paises/mw/calculadoras/severance-pay-calculator"),
  "sick-leave-calculator": () => import("@/paises/mw/calculadoras/sick-leave-calculator"),
  "tevet-levy-calculator": () => import("@/paises/mw/calculadoras/tevet-levy-calculator"),
  "transfer-levy-calculator": () => import("@/paises/mw/calculadoras/transfer-levy-calculator"),
  "vat-calculator": () => import("@/paises/mw/calculadoras/vat-calculator"),
  "winnings-tax-calculator": () => import("@/paises/mw/calculadoras/winnings-tax-calculator"),
  "withholding-tax-calculator": () => import("@/paises/mw/calculadoras/withholding-tax-calculator"),
};
