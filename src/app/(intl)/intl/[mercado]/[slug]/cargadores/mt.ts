// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => import("@/paises/mt/calculadoras/annual-leave"),
  "cola-increase": () => import("@/paises/mt/calculadoras/cola-increase"),
  "employer-cost": () => import("@/paises/mt/calculadoras/employer-cost"),
  "fixed-term-contract": () => import("@/paises/mt/calculadoras/fixed-term-contract"),
  "income-tax-calculator": () => import("@/paises/mt/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/mt/calculadoras/inflation-calculator"),
  "maternity-leave": () => import("@/paises/mt/calculadoras/maternity-leave"),
  "minimum-wage": () => import("@/paises/mt/calculadoras/minimum-wage"),
  "notice-period": () => import("@/paises/mt/calculadoras/notice-period"),
  "overtime-calculator": () => import("@/paises/mt/calculadoras/overtime-calculator"),
  "overtime-tax": () => import("@/paises/mt/calculadoras/overtime-tax"),
  "part-time-tax": () => import("@/paises/mt/calculadoras/part-time-tax"),
  "pension-age": () => import("@/paises/mt/calculadoras/pension-age"),
  "probation-period": () => import("@/paises/mt/calculadoras/probation-period"),
  "property-transfer-tax": () => import("@/paises/mt/calculadoras/property-transfer-tax"),
  "public-holidays": () => import("@/paises/mt/calculadoras/public-holidays"),
  "rental-income-tax": () => import("@/paises/mt/calculadoras/rental-income-tax"),
  "ssc-calculator": () => import("@/paises/mt/calculadoras/ssc-calculator"),
  "stamp-duty-calculator": () => import("@/paises/mt/calculadoras/stamp-duty-calculator"),
  "statutory-bonus": () => import("@/paises/mt/calculadoras/statutory-bonus"),
  "take-home-pay": () => import("@/paises/mt/calculadoras/take-home-pay"),
  "vat-calculator": () => import("@/paises/mt/calculadoras/vat-calculator"),
};
