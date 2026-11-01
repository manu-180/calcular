// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => import("@/paises/lr/calculadoras/annual-leave"),
  "contractor-tax": () => import("@/paises/lr/calculadoras/contractor-tax"),
  "corporate-income-tax": () => import("@/paises/lr/calculadoras/corporate-income-tax"),
  "employer-cost": () => import("@/paises/lr/calculadoras/employer-cost"),
  "exchange-rate": () => import("@/paises/lr/calculadoras/exchange-rate"),
  "excise-tax": () => import("@/paises/lr/calculadoras/excise-tax"),
  "gross-salary": () => import("@/paises/lr/calculadoras/gross-salary"),
  "gst-calculator": () => import("@/paises/lr/calculadoras/gst-calculator"),
  "income-tax-calculator": () => import("@/paises/lr/calculadoras/income-tax-calculator"),
  "minimum-wage": () => import("@/paises/lr/calculadoras/minimum-wage"),
  "nasscorp-contribution": () => import("@/paises/lr/calculadoras/nasscorp-contribution"),
  "nasscorp-pension": () => import("@/paises/lr/calculadoras/nasscorp-pension"),
  "non-cash-benefits-tax": () => import("@/paises/lr/calculadoras/non-cash-benefits-tax"),
  "non-resident-tax": () => import("@/paises/lr/calculadoras/non-resident-tax"),
  "notice-period": () => import("@/paises/lr/calculadoras/notice-period"),
  "overtime-pay": () => import("@/paises/lr/calculadoras/overtime-pay"),
  "presumptive-tax": () => import("@/paises/lr/calculadoras/presumptive-tax"),
  "property-tax-penalty": () => import("@/paises/lr/calculadoras/property-tax-penalty"),
  "real-property-tax": () => import("@/paises/lr/calculadoras/real-property-tax"),
  "rental-income-tax": () => import("@/paises/lr/calculadoras/rental-income-tax"),
  "severance-pay": () => import("@/paises/lr/calculadoras/severance-pay"),
  "take-home-pay": () => import("@/paises/lr/calculadoras/take-home-pay"),
  "withholding-tax": () => import("@/paises/lr/calculadoras/withholding-tax"),
};
