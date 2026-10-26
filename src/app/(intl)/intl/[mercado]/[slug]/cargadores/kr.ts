// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "acquisition-tax": () => import("@/paises/kr/calculadoras/acquisition-tax"),
  "annual-leave": () => import("@/paises/kr/calculadoras/annual-leave"),
  "brokerage-fee": () => import("@/paises/kr/calculadoras/brokerage-fee"),
  "capital-gains-tax": () => import("@/paises/kr/calculadoras/capital-gains-tax"),
  "deposit-interest": () => import("@/paises/kr/calculadoras/deposit-interest"),
  "gift-tax": () => import("@/paises/kr/calculadoras/gift-tax"),
  "income-tax": () => import("@/paises/kr/calculadoras/income-tax"),
  "inflation-calculator": () => import("@/paises/kr/calculadoras/inflation-calculator"),
  "inheritance-tax": () => import("@/paises/kr/calculadoras/inheritance-tax"),
  "jeonwolse-conversion": () => import("@/paises/kr/calculadoras/jeonwolse-conversion"),
  "minimum-wage": () => import("@/paises/kr/calculadoras/minimum-wage"),
  "overtime-pay": () => import("@/paises/kr/calculadoras/overtime-pay"),
  "parental-leave-benefit": () => import("@/paises/kr/calculadoras/parental-leave-benefit"),
  "retirement-income-tax": () => import("@/paises/kr/calculadoras/retirement-income-tax"),
  "severance-pay": () => import("@/paises/kr/calculadoras/severance-pay"),
  "social-insurance": () => import("@/paises/kr/calculadoras/social-insurance"),
  "take-home-pay": () => import("@/paises/kr/calculadoras/take-home-pay"),
  "unemployment-benefit": () => import("@/paises/kr/calculadoras/unemployment-benefit"),
  "usd-to-krw": () => import("@/paises/kr/calculadoras/usd-to-krw"),
  "weekly-holiday-pay": () => import("@/paises/kr/calculadoras/weekly-holiday-pay"),
  "year-end-tax-settlement": () => import("@/paises/kr/calculadoras/year-end-tax-settlement"),
};
