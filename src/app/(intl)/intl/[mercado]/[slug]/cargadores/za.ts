// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => import("@/paises/za/calculadoras/annual-leave"),
  "bond-calculator": () => import("@/paises/za/calculadoras/bond-calculator"),
  "capital-gains-tax": () => import("@/paises/za/calculadoras/capital-gains-tax"),
  "cost-to-company": () => import("@/paises/za/calculadoras/cost-to-company"),
  "donations-tax": () => import("@/paises/za/calculadoras/donations-tax"),
  "estate-duty": () => import("@/paises/za/calculadoras/estate-duty"),
  "income-tax-calculator": () => import("@/paises/za/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/za/calculadoras/inflation-calculator"),
  "minimum-wage": () => import("@/paises/za/calculadoras/minimum-wage"),
  "notice-period": () => import("@/paises/za/calculadoras/notice-period"),
  "overtime-calculator": () => import("@/paises/za/calculadoras/overtime-calculator"),
  "retirement-annuity-tax": () => import("@/paises/za/calculadoras/retirement-annuity-tax"),
  "retirement-lump-sum-tax": () => import("@/paises/za/calculadoras/retirement-lump-sum-tax"),
  "severance-pay": () => import("@/paises/za/calculadoras/severance-pay"),
  "sick-leave": () => import("@/paises/za/calculadoras/sick-leave"),
  "small-business-corporation-tax": () => import("@/paises/za/calculadoras/small-business-corporation-tax"),
  "take-home-pay": () => import("@/paises/za/calculadoras/take-home-pay"),
  "transfer-duty-calculator": () => import("@/paises/za/calculadoras/transfer-duty-calculator"),
  "turnover-tax": () => import("@/paises/za/calculadoras/turnover-tax"),
  "uif-calculator": () => import("@/paises/za/calculadoras/uif-calculator"),
};
