// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => import("@/paises/ie/calculadoras/annual-leave"),
  "capital-acquisitions-tax": () => import("@/paises/ie/calculadoras/capital-acquisitions-tax"),
  "capital-gains-tax": () => import("@/paises/ie/calculadoras/capital-gains-tax"),
  "child-benefit": () => import("@/paises/ie/calculadoras/child-benefit"),
  "employer-prsi-calculator": () => import("@/paises/ie/calculadoras/employer-prsi-calculator"),
  "help-to-buy": () => import("@/paises/ie/calculadoras/help-to-buy"),
  "illness-benefit": () => import("@/paises/ie/calculadoras/illness-benefit"),
  "income-tax-calculator": () => import("@/paises/ie/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/ie/calculadoras/inflation-calculator"),
  "jobseekers-benefit": () => import("@/paises/ie/calculadoras/jobseekers-benefit"),
  "local-property-tax": () => import("@/paises/ie/calculadoras/local-property-tax"),
  "maternity-benefit": () => import("@/paises/ie/calculadoras/maternity-benefit"),
  "minimum-wage": () => import("@/paises/ie/calculadoras/minimum-wage"),
  "prsi-calculator": () => import("@/paises/ie/calculadoras/prsi-calculator"),
  "public-holiday-pay": () => import("@/paises/ie/calculadoras/public-holiday-pay"),
  "redundancy-pay": () => import("@/paises/ie/calculadoras/redundancy-pay"),
  "rent-tax-credit": () => import("@/paises/ie/calculadoras/rent-tax-credit"),
  "stamp-duty-calculator": () => import("@/paises/ie/calculadoras/stamp-duty-calculator"),
  "take-home-pay": () => import("@/paises/ie/calculadoras/take-home-pay"),
  "usc-calculator": () => import("@/paises/ie/calculadoras/usc-calculator"),
  "vat-calculator": () => import("@/paises/ie/calculadoras/vat-calculator"),
};
