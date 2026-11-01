// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "capital-gains-tax-calculator": () => import("@/paises/np/calculadoras/capital-gains-tax-calculator"),
  "dashain-bonus-calculator": () => import("@/paises/np/calculadoras/dashain-bonus-calculator"),
  "dollar-rate-in-nepal": () => import("@/paises/np/calculadoras/dollar-rate-in-nepal"),
  "employer-cost-calculator": () => import("@/paises/np/calculadoras/employer-cost-calculator"),
  "gratuity-calculator": () => import("@/paises/np/calculadoras/gratuity-calculator"),
  "home-leave-calculator": () => import("@/paises/np/calculadoras/home-leave-calculator"),
  "income-tax-calculator": () => import("@/paises/np/calculadoras/income-tax-calculator"),
  "indian-rupee-to-npr": () => import("@/paises/np/calculadoras/indian-rupee-to-npr"),
  "maternity-leave-calculator": () => import("@/paises/np/calculadoras/maternity-leave-calculator"),
  "minimum-wage-in-nepal": () => import("@/paises/np/calculadoras/minimum-wage-in-nepal"),
  "notice-period-calculator": () => import("@/paises/np/calculadoras/notice-period-calculator"),
  "overtime-calculator": () => import("@/paises/np/calculadoras/overtime-calculator"),
  "salary-calculator": () => import("@/paises/np/calculadoras/salary-calculator"),
  "severance-pay-calculator": () => import("@/paises/np/calculadoras/severance-pay-calculator"),
  "ssf-calculator": () => import("@/paises/np/calculadoras/ssf-calculator"),
  "turnover-tax-calculator": () => import("@/paises/np/calculadoras/turnover-tax-calculator"),
  "vat-calculator": () => import("@/paises/np/calculadoras/vat-calculator"),
};
