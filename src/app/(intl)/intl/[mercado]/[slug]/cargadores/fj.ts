// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/fj/calculadoras/annual-leave-calculator"),
  "capital-gains-tax-calculator": () => import("@/paises/fj/calculadoras/capital-gains-tax-calculator"),
  "contract-payment-tax-calculator": () => import("@/paises/fj/calculadoras/contract-payment-tax-calculator"),
  "employer-cost-calculator": () => import("@/paises/fj/calculadoras/employer-cost-calculator"),
  "fnpf-calculator": () => import("@/paises/fj/calculadoras/fnpf-calculator"),
  "fringe-benefits-tax-calculator": () => import("@/paises/fj/calculadoras/fringe-benefits-tax-calculator"),
  "maternity-leave-calculator": () => import("@/paises/fj/calculadoras/maternity-leave-calculator"),
  "minimum-wage": () => import("@/paises/fj/calculadoras/minimum-wage"),
  "net-pay-calculator": () => import("@/paises/fj/calculadoras/net-pay-calculator"),
  "overtime-calculator": () => import("@/paises/fj/calculadoras/overtime-calculator"),
  "paye-calculator": () => import("@/paises/fj/calculadoras/paye-calculator"),
  "paye-penalty-calculator": () => import("@/paises/fj/calculadoras/paye-penalty-calculator"),
  "redundancy-pay-calculator": () => import("@/paises/fj/calculadoras/redundancy-pay-calculator"),
  "redundancy-tax-calculator": () => import("@/paises/fj/calculadoras/redundancy-tax-calculator"),
  "secondary-employment-tax-calculator": () => import("@/paises/fj/calculadoras/secondary-employment-tax-calculator"),
  "vat-calculator": () => import("@/paises/fj/calculadoras/vat-calculator"),
  "withholding-tax-calculator": () => import("@/paises/fj/calculadoras/withholding-tax-calculator"),
};
