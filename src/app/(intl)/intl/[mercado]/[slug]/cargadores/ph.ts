// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "13th-month-pay-tax": () => import("@/paises/ph/calculadoras/13th-month-pay-tax"),
  "donors-tax": () => import("@/paises/ph/calculadoras/donors-tax"),
  "eight-percent-tax": () => import("@/paises/ph/calculadoras/eight-percent-tax"),
  "employer-cost": () => import("@/paises/ph/calculadoras/employer-cost"),
  "estate-tax": () => import("@/paises/ph/calculadoras/estate-tax"),
  "holiday-pay": () => import("@/paises/ph/calculadoras/holiday-pay"),
  "income-tax-calculator": () => import("@/paises/ph/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/ph/calculadoras/inflation-calculator"),
  "kasambahay-minimum-wage": () => import("@/paises/ph/calculadoras/kasambahay-minimum-wage"),
  "minimum-wage": () => import("@/paises/ph/calculadoras/minimum-wage"),
  "mixed-income-tax": () => import("@/paises/ph/calculadoras/mixed-income-tax"),
  "night-differential": () => import("@/paises/ph/calculadoras/night-differential"),
  "overtime-pay": () => import("@/paises/ph/calculadoras/overtime-pay"),
  "pag-ibig-contribution": () => import("@/paises/ph/calculadoras/pag-ibig-contribution"),
  "percentage-tax": () => import("@/paises/ph/calculadoras/percentage-tax"),
  "philhealth-contribution": () => import("@/paises/ph/calculadoras/philhealth-contribution"),
  "retirement-pay": () => import("@/paises/ph/calculadoras/retirement-pay"),
  "separation-pay": () => import("@/paises/ph/calculadoras/separation-pay"),
  "service-incentive-leave": () => import("@/paises/ph/calculadoras/service-incentive-leave"),
  "sss-contribution": () => import("@/paises/ph/calculadoras/sss-contribution"),
  "take-home-pay": () => import("@/paises/ph/calculadoras/take-home-pay"),
  "vat-calculator": () => import("@/paises/ph/calculadoras/vat-calculator"),
  "withholding-tax-calculator": () => import("@/paises/ph/calculadoras/withholding-tax-calculator"),
};
