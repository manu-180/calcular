// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/lb/calculadoras/annual-leave-calculator"),
  "dismissal-compensation": () => import("@/paises/lb/calculadoras/dismissal-compensation"),
  "employee-cost-calculator": () => import("@/paises/lb/calculadoras/employee-cost-calculator"),
  "end-of-service-calculator": () => import("@/paises/lb/calculadoras/end-of-service-calculator"),
  "family-allowance-calculator": () => import("@/paises/lb/calculadoras/family-allowance-calculator"),
  "inflation-calculator": () => import("@/paises/lb/calculadoras/inflation-calculator"),
  "lbp-usd-converter": () => import("@/paises/lb/calculadoras/lbp-usd-converter"),
  "minimum-wage": () => import("@/paises/lb/calculadoras/minimum-wage"),
  "notice-period": () => import("@/paises/lb/calculadoras/notice-period"),
  "nssf-contributions": () => import("@/paises/lb/calculadoras/nssf-contributions"),
  "overtime-calculator": () => import("@/paises/lb/calculadoras/overtime-calculator"),
  "salary-calculator": () => import("@/paises/lb/calculadoras/salary-calculator"),
  "salary-tax-calculator": () => import("@/paises/lb/calculadoras/salary-tax-calculator"),
  "sick-leave-calculator": () => import("@/paises/lb/calculadoras/sick-leave-calculator"),
  "vat-calculator": () => import("@/paises/lb/calculadoras/vat-calculator"),
};
