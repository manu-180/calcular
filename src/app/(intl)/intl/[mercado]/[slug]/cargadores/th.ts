// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => import("@/paises/th/calculadoras/annual-leave"),
  "bonus-tax": () => import("@/paises/th/calculadoras/bonus-tax"),
  "corporate-income-tax": () => import("@/paises/th/calculadoras/corporate-income-tax"),
  "deposit-interest": () => import("@/paises/th/calculadoras/deposit-interest"),
  "employer-cost": () => import("@/paises/th/calculadoras/employer-cost"),
  "freelance-tax": () => import("@/paises/th/calculadoras/freelance-tax"),
  "gift-tax": () => import("@/paises/th/calculadoras/gift-tax"),
  "income-tax": () => import("@/paises/th/calculadoras/income-tax"),
  "inheritance-tax": () => import("@/paises/th/calculadoras/inheritance-tax"),
  "net-to-gross": () => import("@/paises/th/calculadoras/net-to-gross"),
  "notice-pay": () => import("@/paises/th/calculadoras/notice-pay"),
  "overtime-pay": () => import("@/paises/th/calculadoras/overtime-pay"),
  "severance-pay": () => import("@/paises/th/calculadoras/severance-pay"),
  "social-security": () => import("@/paises/th/calculadoras/social-security"),
  "specific-business-tax": () => import("@/paises/th/calculadoras/specific-business-tax"),
  "stamp-duty": () => import("@/paises/th/calculadoras/stamp-duty"),
  "take-home-pay": () => import("@/paises/th/calculadoras/take-home-pay"),
  "tax-deduction": () => import("@/paises/th/calculadoras/tax-deduction"),
  "tax-surcharge": () => import("@/paises/th/calculadoras/tax-surcharge"),
  "withholding-tax": () => import("@/paises/th/calculadoras/withholding-tax"),
};
