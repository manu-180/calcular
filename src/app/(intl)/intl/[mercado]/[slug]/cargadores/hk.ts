// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => import("@/paises/hk/calculadoras/annual-leave"),
  "employer-cost-calculator": () => import("@/paises/hk/calculadoras/employer-cost-calculator"),
  "end-of-year-payment": () => import("@/paises/hk/calculadoras/end-of-year-payment"),
  "hibor-mortgage-calculator": () => import("@/paises/hk/calculadoras/hibor-mortgage-calculator"),
  "holiday-pay": () => import("@/paises/hk/calculadoras/holiday-pay"),
  "inflation-calculator": () => import("@/paises/hk/calculadoras/inflation-calculator"),
  "long-service-payment": () => import("@/paises/hk/calculadoras/long-service-payment"),
  "maternity-leave-pay": () => import("@/paises/hk/calculadoras/maternity-leave-pay"),
  "minimum-wage": () => import("@/paises/hk/calculadoras/minimum-wage"),
  "mpf-calculator": () => import("@/paises/hk/calculadoras/mpf-calculator"),
  "paternity-leave-pay": () => import("@/paises/hk/calculadoras/paternity-leave-pay"),
  "payment-in-lieu-of-notice": () => import("@/paises/hk/calculadoras/payment-in-lieu-of-notice"),
  "profits-tax-calculator": () => import("@/paises/hk/calculadoras/profits-tax-calculator"),
  "property-tax-calculator": () => import("@/paises/hk/calculadoras/property-tax-calculator"),
  "provisional-salaries-tax": () => import("@/paises/hk/calculadoras/provisional-salaries-tax"),
  "salaries-tax-calculator": () => import("@/paises/hk/calculadoras/salaries-tax-calculator"),
  "severance-payment": () => import("@/paises/hk/calculadoras/severance-payment"),
  "sick-leave-pay": () => import("@/paises/hk/calculadoras/sick-leave-pay"),
  "stamp-duty-calculator": () => import("@/paises/hk/calculadoras/stamp-duty-calculator"),
  "take-home-pay": () => import("@/paises/hk/calculadoras/take-home-pay"),
};
