// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/ps/calculadoras/annual-leave-calculator"),
  "end-of-service-calculator": () => import("@/paises/ps/calculadoras/end-of-service-calculator"),
  "final-settlement": () => import("@/paises/ps/calculadoras/final-settlement"),
  "maternity-leave-calculator": () => import("@/paises/ps/calculadoras/maternity-leave-calculator"),
  "minimum-wage": () => import("@/paises/ps/calculadoras/minimum-wage"),
  "notice-period": () => import("@/paises/ps/calculadoras/notice-period"),
  "overtime-calculator": () => import("@/paises/ps/calculadoras/overtime-calculator"),
  "salary-deduction-calculator": () => import("@/paises/ps/calculadoras/salary-deduction-calculator"),
  "sick-leave-calculator": () => import("@/paises/ps/calculadoras/sick-leave-calculator"),
  "unfair-dismissal-compensation": () => import("@/paises/ps/calculadoras/unfair-dismissal-compensation"),
};
