// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => import("@/paises/bw/calculadoras/annual-leave"),
  "bonus-tax-calculator": () => import("@/paises/bw/calculadoras/bonus-tax-calculator"),
  "capital-gains-tax": () => import("@/paises/bw/calculadoras/capital-gains-tax"),
  "company-car-benefit": () => import("@/paises/bw/calculadoras/company-car-benefit"),
  "company-tax-calculator": () => import("@/paises/bw/calculadoras/company-tax-calculator"),
  "gratuity-tax-calculator": () => import("@/paises/bw/calculadoras/gratuity-tax-calculator"),
  "housing-benefit-calculator": () => import("@/paises/bw/calculadoras/housing-benefit-calculator"),
  "inflation-calculator": () => import("@/paises/bw/calculadoras/inflation-calculator"),
  "minimum-wage": () => import("@/paises/bw/calculadoras/minimum-wage"),
  "notice-period": () => import("@/paises/bw/calculadoras/notice-period"),
  "overtime-calculator": () => import("@/paises/bw/calculadoras/overtime-calculator"),
  "part-year-tax-calculator": () => import("@/paises/bw/calculadoras/part-year-tax-calculator"),
  "paye-calculator": () => import("@/paises/bw/calculadoras/paye-calculator"),
  "pension-lump-sum-tax": () => import("@/paises/bw/calculadoras/pension-lump-sum-tax"),
  "pension-tax-relief": () => import("@/paises/bw/calculadoras/pension-tax-relief"),
  "take-home-pay": () => import("@/paises/bw/calculadoras/take-home-pay"),
  "tax-free-salary-gross-up": () => import("@/paises/bw/calculadoras/tax-free-salary-gross-up"),
  "transfer-duty": () => import("@/paises/bw/calculadoras/transfer-duty"),
  "vat-calculator": () => import("@/paises/bw/calculadoras/vat-calculator"),
  "withholding-tax-calculator": () => import("@/paises/bw/calculadoras/withholding-tax-calculator"),
};
