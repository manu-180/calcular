// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-pay": () => import("@/paises/gm/calculadoras/annual-leave-pay"),
  "capital-gains-tax": () => import("@/paises/gm/calculadoras/capital-gains-tax"),
  "corporate-income-tax": () => import("@/paises/gm/calculadoras/corporate-income-tax"),
  "dividend-tax": () => import("@/paises/gm/calculadoras/dividend-tax"),
  "employer-cost": () => import("@/paises/gm/calculadoras/employer-cost"),
  "exchange-rate": () => import("@/paises/gm/calculadoras/exchange-rate"),
  "expatriate-payroll-tax": () => import("@/paises/gm/calculadoras/expatriate-payroll-tax"),
  "fringe-benefits-tax": () => import("@/paises/gm/calculadoras/fringe-benefits-tax"),
  "informal-sector-tax": () => import("@/paises/gm/calculadoras/informal-sector-tax"),
  "maternity-leave": () => import("@/paises/gm/calculadoras/maternity-leave"),
  "net-to-gross": () => import("@/paises/gm/calculadoras/net-to-gross"),
  "notice-period": () => import("@/paises/gm/calculadoras/notice-period"),
  "paye-calculator": () => import("@/paises/gm/calculadoras/paye-calculator"),
  "rental-income-tax": () => import("@/paises/gm/calculadoras/rental-income-tax"),
  "retirement-age": () => import("@/paises/gm/calculadoras/retirement-age"),
  "severance-pay": () => import("@/paises/gm/calculadoras/severance-pay"),
  "small-business-tax": () => import("@/paises/gm/calculadoras/small-business-tax"),
  "sshfc-contribution": () => import("@/paises/gm/calculadoras/sshfc-contribution"),
  "sshfc-late-penalty": () => import("@/paises/gm/calculadoras/sshfc-late-penalty"),
  "take-home-pay": () => import("@/paises/gm/calculadoras/take-home-pay"),
  "vat-calculator": () => import("@/paises/gm/calculadoras/vat-calculator"),
  "vat-registration": () => import("@/paises/gm/calculadoras/vat-registration"),
};
