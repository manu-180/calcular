// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "accommodation-tax": () => import("@/paises/kh/calculadoras/accommodation-tax"),
  "annual-leave": () => import("@/paises/kh/calculadoras/annual-leave"),
  "bonus-tax": () => import("@/paises/kh/calculadoras/bonus-tax"),
  "employer-cost": () => import("@/paises/kh/calculadoras/employer-cost"),
  "exchange-rate": () => import("@/paises/kh/calculadoras/exchange-rate"),
  "fringe-benefit-tax": () => import("@/paises/kh/calculadoras/fringe-benefit-tax"),
  "inflation": () => import("@/paises/kh/calculadoras/inflation"),
  "minimum-wage": () => import("@/paises/kh/calculadoras/minimum-wage"),
  "net-salary": () => import("@/paises/kh/calculadoras/net-salary"),
  "notice-period": () => import("@/paises/kh/calculadoras/notice-period"),
  "nssf-contribution": () => import("@/paises/kh/calculadoras/nssf-contribution"),
  "overtime-pay": () => import("@/paises/kh/calculadoras/overtime-pay"),
  "patent-tax": () => import("@/paises/kh/calculadoras/patent-tax"),
  "prepayment-tax": () => import("@/paises/kh/calculadoras/prepayment-tax"),
  "property-tax": () => import("@/paises/kh/calculadoras/property-tax"),
  "rental-tax": () => import("@/paises/kh/calculadoras/rental-tax"),
  "salary-tax": () => import("@/paises/kh/calculadoras/salary-tax"),
  "seniority-pay": () => import("@/paises/kh/calculadoras/seniority-pay"),
  "severance-pay": () => import("@/paises/kh/calculadoras/severance-pay"),
  "specific-tax": () => import("@/paises/kh/calculadoras/specific-tax"),
  "tax-on-income": () => import("@/paises/kh/calculadoras/tax-on-income"),
  "transfer-tax": () => import("@/paises/kh/calculadoras/transfer-tax"),
  "unused-land-tax": () => import("@/paises/kh/calculadoras/unused-land-tax"),
  "vat-calculator": () => import("@/paises/kh/calculadoras/vat-calculator"),
  "withholding-tax": () => import("@/paises/kh/calculadoras/withholding-tax"),
};
