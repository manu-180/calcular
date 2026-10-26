// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/jo/calculadoras/annual-leave-calculator"),
  "early-retirement-calculator": () => import("@/paises/jo/calculadoras/early-retirement-calculator"),
  "employee-cost-calculator": () => import("@/paises/jo/calculadoras/employee-cost-calculator"),
  "end-of-service-calculator": () => import("@/paises/jo/calculadoras/end-of-service-calculator"),
  "final-settlement": () => import("@/paises/jo/calculadoras/final-settlement"),
  "income-tax-calculator": () => import("@/paises/jo/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/jo/calculadoras/inflation-calculator"),
  "jod-usd-converter": () => import("@/paises/jo/calculadoras/jod-usd-converter"),
  "land-registration-fees": () => import("@/paises/jo/calculadoras/land-registration-fees"),
  "minimum-wage": () => import("@/paises/jo/calculadoras/minimum-wage"),
  "notice-period": () => import("@/paises/jo/calculadoras/notice-period"),
  "overtime-calculator": () => import("@/paises/jo/calculadoras/overtime-calculator"),
  "retirement-pension-calculator": () => import("@/paises/jo/calculadoras/retirement-pension-calculator"),
  "salary-calculator": () => import("@/paises/jo/calculadoras/salary-calculator"),
  "sales-tax-calculator": () => import("@/paises/jo/calculadoras/sales-tax-calculator"),
  "sick-leave-calculator": () => import("@/paises/jo/calculadoras/sick-leave-calculator"),
  "social-security-calculator": () => import("@/paises/jo/calculadoras/social-security-calculator"),
  "unemployment-benefit-calculator": () => import("@/paises/jo/calculadoras/unemployment-benefit-calculator"),
  "unfair-dismissal-compensation": () => import("@/paises/jo/calculadoras/unfair-dismissal-compensation"),
};
