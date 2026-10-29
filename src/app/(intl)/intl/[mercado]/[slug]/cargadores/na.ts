// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/na/calculadoras/annual-leave-calculator"),
  "corporate-tax-calculator": () => import("@/paises/na/calculadoras/corporate-tax-calculator"),
  "employer-cost-calculator": () => import("@/paises/na/calculadoras/employer-cost-calculator"),
  "final-pay-calculator": () => import("@/paises/na/calculadoras/final-pay-calculator"),
  "maternity-leave-calculator": () => import("@/paises/na/calculadoras/maternity-leave-calculator"),
  "minimum-wage": () => import("@/paises/na/calculadoras/minimum-wage"),
  "net-salary-calculator": () => import("@/paises/na/calculadoras/net-salary-calculator"),
  "notice-period-calculator": () => import("@/paises/na/calculadoras/notice-period-calculator"),
  "overtime-calculator": () => import("@/paises/na/calculadoras/overtime-calculator"),
  "paye-calculator": () => import("@/paises/na/calculadoras/paye-calculator"),
  "pension-tax-deduction-calculator": () => import("@/paises/na/calculadoras/pension-tax-deduction-calculator"),
  "public-holiday-pay-calculator": () => import("@/paises/na/calculadoras/public-holiday-pay-calculator"),
  "severance-pay-calculator": () => import("@/paises/na/calculadoras/severance-pay-calculator"),
  "sick-leave-calculator": () => import("@/paises/na/calculadoras/sick-leave-calculator"),
  "social-security-calculator": () => import("@/paises/na/calculadoras/social-security-calculator"),
  "transfer-duty-calculator": () => import("@/paises/na/calculadoras/transfer-duty-calculator"),
  "usd-to-nad": () => import("@/paises/na/calculadoras/usd-to-nad"),
  "vet-levy-calculator": () => import("@/paises/na/calculadoras/vet-levy-calculator"),
  "withholding-tax-calculator": () => import("@/paises/na/calculadoras/withholding-tax-calculator"),
};
