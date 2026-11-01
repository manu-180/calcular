// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "bnd-to-sgd": () => import("@/paises/bn/calculadoras/bnd-to-sgd"),
  "capital-allowance-calculator": () => import("@/paises/bn/calculadoras/capital-allowance-calculator"),
  "company-car-deduction-calculator": () => import("@/paises/bn/calculadoras/company-car-deduction-calculator"),
  "corporate-tax-calculator": () => import("@/paises/bn/calculadoras/corporate-tax-calculator"),
  "employer-cost-calculator": () => import("@/paises/bn/calculadoras/employer-cost-calculator"),
  "inflation-calculator": () => import("@/paises/bn/calculadoras/inflation-calculator"),
  "minimum-wage": () => import("@/paises/bn/calculadoras/minimum-wage"),
  "spk-calculator": () => import("@/paises/bn/calculadoras/spk-calculator"),
  "spk-self-employed-calculator": () => import("@/paises/bn/calculadoras/spk-self-employed-calculator"),
  "stamp-duty-penalty-calculator": () => import("@/paises/bn/calculadoras/stamp-duty-penalty-calculator"),
  "take-home-pay": () => import("@/paises/bn/calculadoras/take-home-pay"),
  "withholding-tax-calculator": () => import("@/paises/bn/calculadoras/withholding-tax-calculator"),
};
