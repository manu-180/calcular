// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "employer-cost-calculator": () => import("@/paises/bb/calculadoras/employer-cost-calculator"),
  "holiday-pay-calculator": () => import("@/paises/bb/calculadoras/holiday-pay-calculator"),
  "income-tax-calculator": () => import("@/paises/bb/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/bb/calculadoras/inflation-calculator"),
  "land-tax-calculator": () => import("@/paises/bb/calculadoras/land-tax-calculator"),
  "maternity-benefit-calculator": () => import("@/paises/bb/calculadoras/maternity-benefit-calculator"),
  "minimum-wage-calculator": () => import("@/paises/bb/calculadoras/minimum-wage-calculator"),
  "nis-calculator": () => import("@/paises/bb/calculadoras/nis-calculator"),
  "nis-pension-calculator": () => import("@/paises/bb/calculadoras/nis-pension-calculator"),
  "notice-period-calculator": () => import("@/paises/bb/calculadoras/notice-period-calculator"),
  "overtime-calculator": () => import("@/paises/bb/calculadoras/overtime-calculator"),
  "paternity-benefit-calculator": () => import("@/paises/bb/calculadoras/paternity-benefit-calculator"),
  "property-transfer-tax-calculator": () => import("@/paises/bb/calculadoras/property-transfer-tax-calculator"),
  "salary-calculator": () => import("@/paises/bb/calculadoras/salary-calculator"),
  "severance-pay-calculator": () => import("@/paises/bb/calculadoras/severance-pay-calculator"),
  "sickness-benefit-calculator": () => import("@/paises/bb/calculadoras/sickness-benefit-calculator"),
  "unemployment-benefit-calculator": () => import("@/paises/bb/calculadoras/unemployment-benefit-calculator"),
  "usd-to-bbd": () => import("@/paises/bb/calculadoras/usd-to-bbd"),
  "vat-calculator": () => import("@/paises/bb/calculadoras/vat-calculator"),
};
