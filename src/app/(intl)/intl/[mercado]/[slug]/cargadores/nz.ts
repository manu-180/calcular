// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "acc-levy-calculator": () => import("@/paises/nz/calculadoras/acc-levy-calculator"),
  "acc-weekly-compensation": () => import("@/paises/nz/calculadoras/acc-weekly-compensation"),
  "bright-line-test": () => import("@/paises/nz/calculadoras/bright-line-test"),
  "esct-calculator": () => import("@/paises/nz/calculadoras/esct-calculator"),
  "gst-calculator": () => import("@/paises/nz/calculadoras/gst-calculator"),
  "holiday-pay": () => import("@/paises/nz/calculadoras/holiday-pay"),
  "ietc-calculator": () => import("@/paises/nz/calculadoras/ietc-calculator"),
  "income-tax-calculator": () => import("@/paises/nz/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/nz/calculadoras/inflation-calculator"),
  "kiwisaver-calculator": () => import("@/paises/nz/calculadoras/kiwisaver-calculator"),
  "kiwisaver-government-contribution": () => import("@/paises/nz/calculadoras/kiwisaver-government-contribution"),
  "minimum-wage": () => import("@/paises/nz/calculadoras/minimum-wage"),
  "nz-super-calculator": () => import("@/paises/nz/calculadoras/nz-super-calculator"),
  "ocr-mortgage-calculator": () => import("@/paises/nz/calculadoras/ocr-mortgage-calculator"),
  "parental-leave-pay": () => import("@/paises/nz/calculadoras/parental-leave-pay"),
  "public-holiday-pay": () => import("@/paises/nz/calculadoras/public-holiday-pay"),
  "redundancy-pay": () => import("@/paises/nz/calculadoras/redundancy-pay"),
  "secondary-tax-code": () => import("@/paises/nz/calculadoras/secondary-tax-code"),
  "sick-leave": () => import("@/paises/nz/calculadoras/sick-leave"),
  "student-loan-repayment": () => import("@/paises/nz/calculadoras/student-loan-repayment"),
  "take-home-pay": () => import("@/paises/nz/calculadoras/take-home-pay"),
};
