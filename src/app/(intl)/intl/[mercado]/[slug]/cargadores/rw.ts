// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/rw/calculadoras/annual-leave-calculator"),
  "business-income-tax-calculator": () => import("@/paises/rw/calculadoras/business-income-tax-calculator"),
  "capital-gains-tax-calculator": () => import("@/paises/rw/calculadoras/capital-gains-tax-calculator"),
  "employer-cost-calculator": () => import("@/paises/rw/calculadoras/employer-cost-calculator"),
  "inflation-calculator": () => import("@/paises/rw/calculadoras/inflation-calculator"),
  "maternity-leave-calculator": () => import("@/paises/rw/calculadoras/maternity-leave-calculator"),
  "net-salary-calculator": () => import("@/paises/rw/calculadoras/net-salary-calculator"),
  "notice-period-calculator": () => import("@/paises/rw/calculadoras/notice-period-calculator"),
  "paye-calculator": () => import("@/paises/rw/calculadoras/paye-calculator"),
  "property-sale-tax-calculator": () => import("@/paises/rw/calculadoras/property-sale-tax-calculator"),
  "property-tax-calculator": () => import("@/paises/rw/calculadoras/property-tax-calculator"),
  "rental-income-tax-calculator": () => import("@/paises/rw/calculadoras/rental-income-tax-calculator"),
  "road-maintenance-levy-calculator": () => import("@/paises/rw/calculadoras/road-maintenance-levy-calculator"),
  "rssb-contribution-calculator": () => import("@/paises/rw/calculadoras/rssb-contribution-calculator"),
  "sick-leave-calculator": () => import("@/paises/rw/calculadoras/sick-leave-calculator"),
  "small-business-tax-calculator": () => import("@/paises/rw/calculadoras/small-business-tax-calculator"),
  "tax-penalty-calculator": () => import("@/paises/rw/calculadoras/tax-penalty-calculator"),
  "terminal-benefits-calculator": () => import("@/paises/rw/calculadoras/terminal-benefits-calculator"),
  "tourism-tax-calculator": () => import("@/paises/rw/calculadoras/tourism-tax-calculator"),
  "trading-licence-calculator": () => import("@/paises/rw/calculadoras/trading-licence-calculator"),
  "unfair-dismissal-calculator": () => import("@/paises/rw/calculadoras/unfair-dismissal-calculator"),
  "usd-to-rwf": () => import("@/paises/rw/calculadoras/usd-to-rwf"),
  "vat-calculator": () => import("@/paises/rw/calculadoras/vat-calculator"),
  "withholding-tax-calculator": () => import("@/paises/rw/calculadoras/withholding-tax-calculator"),
};
