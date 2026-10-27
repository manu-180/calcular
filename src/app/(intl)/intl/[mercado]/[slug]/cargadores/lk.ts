// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "apit-calculator": () => import("@/paises/lk/calculadoras/apit-calculator"),
  "bonus-tax-calculator": () => import("@/paises/lk/calculadoras/bonus-tax-calculator"),
  "capital-gains-tax-calculator": () => import("@/paises/lk/calculadoras/capital-gains-tax-calculator"),
  "dollar-rate": () => import("@/paises/lk/calculadoras/dollar-rate"),
  "employer-cost-calculator": () => import("@/paises/lk/calculadoras/employer-cost-calculator"),
  "epf-etf-calculator": () => import("@/paises/lk/calculadoras/epf-etf-calculator"),
  "epf-withdrawal-calculator": () => import("@/paises/lk/calculadoras/epf-withdrawal-calculator"),
  "fixed-deposit-calculator": () => import("@/paises/lk/calculadoras/fixed-deposit-calculator"),
  "freelancer-tax-calculator": () => import("@/paises/lk/calculadoras/freelancer-tax-calculator"),
  "gratuity-calculator": () => import("@/paises/lk/calculadoras/gratuity-calculator"),
  "gratuity-tax-calculator": () => import("@/paises/lk/calculadoras/gratuity-tax-calculator"),
  "gross-salary-calculator": () => import("@/paises/lk/calculadoras/gross-salary-calculator"),
  "income-tax-calculator": () => import("@/paises/lk/calculadoras/income-tax-calculator"),
  "minimum-wage": () => import("@/paises/lk/calculadoras/minimum-wage"),
  "overtime-calculator": () => import("@/paises/lk/calculadoras/overtime-calculator"),
  "salary-calculator": () => import("@/paises/lk/calculadoras/salary-calculator"),
  "sscl-calculator": () => import("@/paises/lk/calculadoras/sscl-calculator"),
  "stamp-duty-calculator": () => import("@/paises/lk/calculadoras/stamp-duty-calculator"),
  "vat-calculator": () => import("@/paises/lk/calculadoras/vat-calculator"),
  "withholding-tax-calculator": () => import("@/paises/lk/calculadoras/withholding-tax-calculator"),
};
