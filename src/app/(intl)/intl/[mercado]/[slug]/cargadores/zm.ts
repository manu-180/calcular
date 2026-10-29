// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "dollar-to-kwacha": () => import("@/paises/zm/calculadoras/dollar-to-kwacha"),
  "employer-cost-calculator": () => import("@/paises/zm/calculadoras/employer-cost-calculator"),
  "gratuity-calculator": () => import("@/paises/zm/calculadoras/gratuity-calculator"),
  "inflation-calculator": () => import("@/paises/zm/calculadoras/inflation-calculator"),
  "leave-days-calculator": () => import("@/paises/zm/calculadoras/leave-days-calculator"),
  "maternity-leave-calculator": () => import("@/paises/zm/calculadoras/maternity-leave-calculator"),
  "minimum-wage": () => import("@/paises/zm/calculadoras/minimum-wage"),
  "mobile-money-levy-calculator": () => import("@/paises/zm/calculadoras/mobile-money-levy-calculator"),
  "napsa-calculator": () => import("@/paises/zm/calculadoras/napsa-calculator"),
  "net-salary-calculator": () => import("@/paises/zm/calculadoras/net-salary-calculator"),
  "nhima-calculator": () => import("@/paises/zm/calculadoras/nhima-calculator"),
  "notice-period-calculator": () => import("@/paises/zm/calculadoras/notice-period-calculator"),
  "overtime-calculator": () => import("@/paises/zm/calculadoras/overtime-calculator"),
  "paye-calculator": () => import("@/paises/zm/calculadoras/paye-calculator"),
  "presumptive-tax-calculator": () => import("@/paises/zm/calculadoras/presumptive-tax-calculator"),
  "property-transfer-tax-calculator": () => import("@/paises/zm/calculadoras/property-transfer-tax-calculator"),
  "redundancy-pay-calculator": () => import("@/paises/zm/calculadoras/redundancy-pay-calculator"),
  "rental-income-tax-calculator": () => import("@/paises/zm/calculadoras/rental-income-tax-calculator"),
  "skills-development-levy-calculator": () => import("@/paises/zm/calculadoras/skills-development-levy-calculator"),
  "turnover-tax-calculator": () => import("@/paises/zm/calculadoras/turnover-tax-calculator"),
  "vat-calculator": () => import("@/paises/zm/calculadoras/vat-calculator"),
};
