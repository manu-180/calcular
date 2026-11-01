// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "bonus-tax-calculator": () => import("@/paises/tt/calculadoras/bonus-tax-calculator"),
  "employer-cost-calculator": () => import("@/paises/tt/calculadoras/employer-cost-calculator"),
  "health-surcharge-calculator": () => import("@/paises/tt/calculadoras/health-surcharge-calculator"),
  "income-tax-calculator": () => import("@/paises/tt/calculadoras/income-tax-calculator"),
  "maternity-leave-calculator": () => import("@/paises/tt/calculadoras/maternity-leave-calculator"),
  "minimum-wage-calculator": () => import("@/paises/tt/calculadoras/minimum-wage-calculator"),
  "net-to-gross-calculator": () => import("@/paises/tt/calculadoras/net-to-gross-calculator"),
  "nis-calculator": () => import("@/paises/tt/calculadoras/nis-calculator"),
  "salary-calculator": () => import("@/paises/tt/calculadoras/salary-calculator"),
  "severance-tax-calculator": () => import("@/paises/tt/calculadoras/severance-tax-calculator"),
  "stamp-duty-calculator": () => import("@/paises/tt/calculadoras/stamp-duty-calculator"),
  "usd-to-ttd": () => import("@/paises/tt/calculadoras/usd-to-ttd"),
  "vat-calculator": () => import("@/paises/tt/calculadoras/vat-calculator"),
  "weekly-pay-calculator": () => import("@/paises/tt/calculadoras/weekly-pay-calculator"),
};
