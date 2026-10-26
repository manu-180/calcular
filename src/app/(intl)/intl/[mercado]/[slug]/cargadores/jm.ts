// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "car-licence-fee-calculator": () => import("@/paises/jm/calculadoras/car-licence-fee-calculator"),
  "employer-cost-calculator": () => import("@/paises/jm/calculadoras/employer-cost-calculator"),
  "gct-calculator": () => import("@/paises/jm/calculadoras/gct-calculator"),
  "income-tax-calculator": () => import("@/paises/jm/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/jm/calculadoras/inflation-calculator"),
  "maternity-leave-calculator": () => import("@/paises/jm/calculadoras/maternity-leave-calculator"),
  "minimum-wage-calculator": () => import("@/paises/jm/calculadoras/minimum-wage-calculator"),
  "nht-mortgage-calculator": () => import("@/paises/jm/calculadoras/nht-mortgage-calculator"),
  "nis-nht-education-tax-calculator": () => import("@/paises/jm/calculadoras/nis-nht-education-tax-calculator"),
  "notice-period-calculator": () => import("@/paises/jm/calculadoras/notice-period-calculator"),
  "overtime-calculator": () => import("@/paises/jm/calculadoras/overtime-calculator"),
  "property-tax-calculator": () => import("@/paises/jm/calculadoras/property-tax-calculator"),
  "redundancy-calculator": () => import("@/paises/jm/calculadoras/redundancy-calculator"),
  "salary-calculator": () => import("@/paises/jm/calculadoras/salary-calculator"),
  "sick-leave-calculator": () => import("@/paises/jm/calculadoras/sick-leave-calculator"),
  "transfer-tax-calculator": () => import("@/paises/jm/calculadoras/transfer-tax-calculator"),
  "usd-to-jmd": () => import("@/paises/jm/calculadoras/usd-to-jmd"),
  "vacation-leave-calculator": () => import("@/paises/jm/calculadoras/vacation-leave-calculator"),
};
