// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => import("@/paises/eg/calculadoras/annual-leave"),
  "annual-raise": () => import("@/paises/eg/calculadoras/annual-raise"),
  "dollar-to-pound": () => import("@/paises/eg/calculadoras/dollar-to-pound"),
  "employer-cost": () => import("@/paises/eg/calculadoras/employer-cost"),
  "end-of-service": () => import("@/paises/eg/calculadoras/end-of-service"),
  "gross-from-net": () => import("@/paises/eg/calculadoras/gross-from-net"),
  "inflation-calculator": () => import("@/paises/eg/calculadoras/inflation-calculator"),
  "lump-sum": () => import("@/paises/eg/calculadoras/lump-sum"),
  "maternity-leave": () => import("@/paises/eg/calculadoras/maternity-leave"),
  "minimum-wage": () => import("@/paises/eg/calculadoras/minimum-wage"),
  "net-salary": () => import("@/paises/eg/calculadoras/net-salary"),
  "notice-period": () => import("@/paises/eg/calculadoras/notice-period"),
  "overtime": () => import("@/paises/eg/calculadoras/overtime"),
  "pension": () => import("@/paises/eg/calculadoras/pension"),
  "real-estate-tax": () => import("@/paises/eg/calculadoras/real-estate-tax"),
  "redundancy-pay": () => import("@/paises/eg/calculadoras/redundancy-pay"),
  "salary-tax": () => import("@/paises/eg/calculadoras/salary-tax"),
  "sick-pay": () => import("@/paises/eg/calculadoras/sick-pay"),
  "social-insurance": () => import("@/paises/eg/calculadoras/social-insurance"),
  "unemployment-benefit": () => import("@/paises/eg/calculadoras/unemployment-benefit"),
  "unfair-dismissal": () => import("@/paises/eg/calculadoras/unfair-dismissal"),
};
