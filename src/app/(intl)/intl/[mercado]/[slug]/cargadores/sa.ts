// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => import("@/paises/sa/calculadoras/annual-leave-calculator"),
  "dependent-fee-calculator": () => import("@/paises/sa/calculadoras/dependent-fee-calculator"),
  "employee-cost-calculator": () => import("@/paises/sa/calculadoras/employee-cost-calculator"),
  "end-of-service-calculator": () => import("@/paises/sa/calculadoras/end-of-service-calculator"),
  "final-settlement": () => import("@/paises/sa/calculadoras/final-settlement"),
  "gosi-calculator": () => import("@/paises/sa/calculadoras/gosi-calculator"),
  "gosi-pension-calculator": () => import("@/paises/sa/calculadoras/gosi-pension-calculator"),
  "inflation-calculator": () => import("@/paises/sa/calculadoras/inflation-calculator"),
  "maternity-leave-calculator": () => import("@/paises/sa/calculadoras/maternity-leave-calculator"),
  "notice-period": () => import("@/paises/sa/calculadoras/notice-period"),
  "overtime-calculator": () => import("@/paises/sa/calculadoras/overtime-calculator"),
  "ramadan-working-hours": () => import("@/paises/sa/calculadoras/ramadan-working-hours"),
  "real-estate-transaction-tax": () => import("@/paises/sa/calculadoras/real-estate-transaction-tax"),
  "salary-calculator": () => import("@/paises/sa/calculadoras/salary-calculator"),
  "sar-usd-converter": () => import("@/paises/sa/calculadoras/sar-usd-converter"),
  "sick-leave-calculator": () => import("@/paises/sa/calculadoras/sick-leave-calculator"),
  "unfair-dismissal-compensation": () => import("@/paises/sa/calculadoras/unfair-dismissal-compensation"),
  "vat-calculator": () => import("@/paises/sa/calculadoras/vat-calculator"),
  "zakat-calculator": () => import("@/paises/sa/calculadoras/zakat-calculator"),
};
