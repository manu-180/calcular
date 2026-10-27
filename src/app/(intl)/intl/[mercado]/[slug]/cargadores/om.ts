// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/om/calculadoras/annual-leave-calculator"),
  "employee-cost-calculator": () => import("@/paises/om/calculadoras/employee-cost-calculator"),
  "end-of-service-gratuity": () => import("@/paises/om/calculadoras/end-of-service-gratuity"),
  "final-settlement": () => import("@/paises/om/calculadoras/final-settlement"),
  "inflation-calculator": () => import("@/paises/om/calculadoras/inflation-calculator"),
  "job-security-benefit": () => import("@/paises/om/calculadoras/job-security-benefit"),
  "maternity-leave-calculator": () => import("@/paises/om/calculadoras/maternity-leave-calculator"),
  "minimum-wage": () => import("@/paises/om/calculadoras/minimum-wage"),
  "notice-period": () => import("@/paises/om/calculadoras/notice-period"),
  "overtime-calculator": () => import("@/paises/om/calculadoras/overtime-calculator"),
  "pension-calculator": () => import("@/paises/om/calculadoras/pension-calculator"),
  "salary-calculator": () => import("@/paises/om/calculadoras/salary-calculator"),
  "sick-leave-calculator": () => import("@/paises/om/calculadoras/sick-leave-calculator"),
  "spf-contribution-calculator": () => import("@/paises/om/calculadoras/spf-contribution-calculator"),
  "unfair-dismissal-compensation": () => import("@/paises/om/calculadoras/unfair-dismissal-compensation"),
  "vat-calculator": () => import("@/paises/om/calculadoras/vat-calculator"),
  "working-hours-calculator": () => import("@/paises/om/calculadoras/working-hours-calculator"),
};
