// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "capital-gains-tax": () => import("@/paises/gb/calculadoras/capital-gains-tax"),
  "child-benefit": () => import("@/paises/gb/calculadoras/child-benefit"),
  "dividend-tax": () => import("@/paises/gb/calculadoras/dividend-tax"),
  "employer-ni-calculator": () => import("@/paises/gb/calculadoras/employer-ni-calculator"),
  "holiday-entitlement": () => import("@/paises/gb/calculadoras/holiday-entitlement"),
  "income-tax-calculator": () => import("@/paises/gb/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/gb/calculadoras/inflation-calculator"),
  "maternity-pay": () => import("@/paises/gb/calculadoras/maternity-pay"),
  "minimum-wage": () => import("@/paises/gb/calculadoras/minimum-wage"),
  "national-insurance-calculator": () => import("@/paises/gb/calculadoras/national-insurance-calculator"),
  "notice-period": () => import("@/paises/gb/calculadoras/notice-period"),
  "pension-tax-relief": () => import("@/paises/gb/calculadoras/pension-tax-relief"),
  "redundancy-pay": () => import("@/paises/gb/calculadoras/redundancy-pay"),
  "self-employed-tax": () => import("@/paises/gb/calculadoras/self-employed-tax"),
  "stamp-duty-calculator": () => import("@/paises/gb/calculadoras/stamp-duty-calculator"),
  "state-pension": () => import("@/paises/gb/calculadoras/state-pension"),
  "statutory-sick-pay": () => import("@/paises/gb/calculadoras/statutory-sick-pay"),
  "student-loan-repayment": () => import("@/paises/gb/calculadoras/student-loan-repayment"),
  "take-home-pay": () => import("@/paises/gb/calculadoras/take-home-pay"),
  "tracker-mortgage": () => import("@/paises/gb/calculadoras/tracker-mortgage"),
  "vat-calculator": () => import("@/paises/gb/calculadoras/vat-calculator"),
};
