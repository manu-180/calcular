// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "add-working-days": () => import("@/paises/bd/calculadoras/add-working-days"),
  "dollar-rate": () => import("@/paises/bd/calculadoras/dollar-rate"),
  "dps-calculator": () => import("@/paises/bd/calculadoras/dps-calculator"),
  "fdr-calculator": () => import("@/paises/bd/calculadoras/fdr-calculator"),
  "gratuity-calculator": () => import("@/paises/bd/calculadoras/gratuity-calculator"),
  "income-tax-calculator": () => import("@/paises/bd/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/bd/calculadoras/inflation-calculator"),
  "leave-calculator": () => import("@/paises/bd/calculadoras/leave-calculator"),
  "maternity-benefit-calculator": () => import("@/paises/bd/calculadoras/maternity-benefit-calculator"),
  "minimum-wage": () => import("@/paises/bd/calculadoras/minimum-wage"),
  "notice-period-calculator": () => import("@/paises/bd/calculadoras/notice-period-calculator"),
  "overtime-calculator": () => import("@/paises/bd/calculadoras/overtime-calculator"),
  "provident-fund-calculator": () => import("@/paises/bd/calculadoras/provident-fund-calculator"),
  "retrenchment-calculator": () => import("@/paises/bd/calculadoras/retrenchment-calculator"),
  "salary-tax-calculator": () => import("@/paises/bd/calculadoras/salary-tax-calculator"),
  "sanchayapatra-calculator": () => import("@/paises/bd/calculadoras/sanchayapatra-calculator"),
  "service-benefit-calculator": () => import("@/paises/bd/calculadoras/service-benefit-calculator"),
  "tax-rebate-calculator": () => import("@/paises/bd/calculadoras/tax-rebate-calculator"),
  "tds-calculator": () => import("@/paises/bd/calculadoras/tds-calculator"),
  "vat-calculator": () => import("@/paises/bd/calculadoras/vat-calculator"),
  "working-days-calculator": () => import("@/paises/bd/calculadoras/working-days-calculator"),
};
