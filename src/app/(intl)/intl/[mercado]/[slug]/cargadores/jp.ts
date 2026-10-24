// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "basic-pension": () => import("@/paises/jp/calculadoras/basic-pension"),
  "child-allowance": () => import("@/paises/jp/calculadoras/child-allowance"),
  "childcare-leave-benefit": () => import("@/paises/jp/calculadoras/childcare-leave-benefit"),
  "consumption-tax": () => import("@/paises/jp/calculadoras/consumption-tax"),
  "employment-insurance": () => import("@/paises/jp/calculadoras/employment-insurance"),
  "furusato-nozei": () => import("@/paises/jp/calculadoras/furusato-nozei"),
  "gift-tax": () => import("@/paises/jp/calculadoras/gift-tax"),
  "housing-loan-deduction": () => import("@/paises/jp/calculadoras/housing-loan-deduction"),
  "income-tax": () => import("@/paises/jp/calculadoras/income-tax"),
  "inheritance-tax": () => import("@/paises/jp/calculadoras/inheritance-tax"),
  "maternity-allowance": () => import("@/paises/jp/calculadoras/maternity-allowance"),
  "medical-expense-deduction": () => import("@/paises/jp/calculadoras/medical-expense-deduction"),
  "minimum-wage": () => import("@/paises/jp/calculadoras/minimum-wage"),
  "overtime-pay": () => import("@/paises/jp/calculadoras/overtime-pay"),
  "paid-leave": () => import("@/paises/jp/calculadoras/paid-leave"),
  "resident-tax": () => import("@/paises/jp/calculadoras/resident-tax"),
  "retirement-allowance-tax": () => import("@/paises/jp/calculadoras/retirement-allowance-tax"),
  "sickness-allowance": () => import("@/paises/jp/calculadoras/sickness-allowance"),
  "social-insurance": () => import("@/paises/jp/calculadoras/social-insurance"),
  "take-home-pay": () => import("@/paises/jp/calculadoras/take-home-pay"),
  "withholding-tax": () => import("@/paises/jp/calculadoras/withholding-tax"),
  "year-end-adjustment": () => import("@/paises/jp/calculadoras/year-end-adjustment"),
};
