// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/bt/calculadoras/annual-leave-calculator"),
  "corporate-tax-calculator": () => import("@/paises/bt/calculadoras/corporate-tax-calculator"),
  "dollar-to-ngultrum": () => import("@/paises/bt/calculadoras/dollar-to-ngultrum"),
  "final-pay-deadline-calculator": () => import("@/paises/bt/calculadoras/final-pay-deadline-calculator"),
  "gratuity-calculator": () => import("@/paises/bt/calculadoras/gratuity-calculator"),
  "gst-calculator": () => import("@/paises/bt/calculadoras/gst-calculator"),
  "gst-registration-calculator": () => import("@/paises/bt/calculadoras/gst-registration-calculator"),
  "income-tax-calculator": () => import("@/paises/bt/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/bt/calculadoras/inflation-calculator"),
  "maternity-leave-calculator": () => import("@/paises/bt/calculadoras/maternity-leave-calculator"),
  "minimum-wage-calculator": () => import("@/paises/bt/calculadoras/minimum-wage-calculator"),
  "ngultrum-to-rupee": () => import("@/paises/bt/calculadoras/ngultrum-to-rupee"),
  "night-duty-pay-calculator": () => import("@/paises/bt/calculadoras/night-duty-pay-calculator"),
  "notice-period-calculator": () => import("@/paises/bt/calculadoras/notice-period-calculator"),
  "overtime-pay-calculator": () => import("@/paises/bt/calculadoras/overtime-pay-calculator"),
  "presumptive-tax-calculator": () => import("@/paises/bt/calculadoras/presumptive-tax-calculator"),
  "private-provident-fund-calculator": () => import("@/paises/bt/calculadoras/private-provident-fund-calculator"),
  "probation-period-calculator": () => import("@/paises/bt/calculadoras/probation-period-calculator"),
  "public-holiday-pay-calculator": () => import("@/paises/bt/calculadoras/public-holiday-pay-calculator"),
  "rental-income-tax-calculator": () => import("@/paises/bt/calculadoras/rental-income-tax-calculator"),
  "salary-deduction-limit-calculator": () => import("@/paises/bt/calculadoras/salary-deduction-limit-calculator"),
  "take-home-pay-calculator": () => import("@/paises/bt/calculadoras/take-home-pay-calculator"),
  "withholding-tax-calculator": () => import("@/paises/bt/calculadoras/withholding-tax-calculator"),
  "wrongful-dismissal-compensation-calculator": () => import("@/paises/bt/calculadoras/wrongful-dismissal-compensation-calculator"),
};
