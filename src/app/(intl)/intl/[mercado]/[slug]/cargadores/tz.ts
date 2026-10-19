// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/tz/calculadoras/annual-leave-calculator"),
  "capital-gains-tax-calculator": () => import("@/paises/tz/calculadoras/capital-gains-tax-calculator"),
  "dollar-to-shilling": () => import("@/paises/tz/calculadoras/dollar-to-shilling"),
  "employer-cost-calculator": () => import("@/paises/tz/calculadoras/employer-cost-calculator"),
  "heslb-loan-repayment": () => import("@/paises/tz/calculadoras/heslb-loan-repayment"),
  "inflation-calculator": () => import("@/paises/tz/calculadoras/inflation-calculator"),
  "maternity-leave-calculator": () => import("@/paises/tz/calculadoras/maternity-leave-calculator"),
  "minimum-wage": () => import("@/paises/tz/calculadoras/minimum-wage"),
  "net-salary-calculator": () => import("@/paises/tz/calculadoras/net-salary-calculator"),
  "notice-period-calculator": () => import("@/paises/tz/calculadoras/notice-period-calculator"),
  "nssf-contribution-calculator": () => import("@/paises/tz/calculadoras/nssf-contribution-calculator"),
  "nssf-maternity-benefit": () => import("@/paises/tz/calculadoras/nssf-maternity-benefit"),
  "nssf-pension-calculator": () => import("@/paises/tz/calculadoras/nssf-pension-calculator"),
  "overtime-calculator": () => import("@/paises/tz/calculadoras/overtime-calculator"),
  "paye-calculator": () => import("@/paises/tz/calculadoras/paye-calculator"),
  "presumptive-tax-calculator": () => import("@/paises/tz/calculadoras/presumptive-tax-calculator"),
  "sdl-calculator": () => import("@/paises/tz/calculadoras/sdl-calculator"),
  "severance-pay-calculator": () => import("@/paises/tz/calculadoras/severance-pay-calculator"),
  "sick-leave-calculator": () => import("@/paises/tz/calculadoras/sick-leave-calculator"),
  "stamp-duty-calculator": () => import("@/paises/tz/calculadoras/stamp-duty-calculator"),
  "tax-penalty-calculator": () => import("@/paises/tz/calculadoras/tax-penalty-calculator"),
  "transport-presumptive-tax": () => import("@/paises/tz/calculadoras/transport-presumptive-tax"),
  "vat-calculator": () => import("@/paises/tz/calculadoras/vat-calculator"),
  "vehicle-registration-calculator": () => import("@/paises/tz/calculadoras/vehicle-registration-calculator"),
  "wcf-contribution-calculator": () => import("@/paises/tz/calculadoras/wcf-contribution-calculator"),
  "withholding-tax-calculator": () => import("@/paises/tz/calculadoras/withholding-tax-calculator"),
};
