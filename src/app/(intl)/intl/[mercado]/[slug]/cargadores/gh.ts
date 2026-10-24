// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "bonus-tax": () => import("@/paises/gh/calculadoras/bonus-tax"),
  "capital-gains-tax": () => import("@/paises/gh/calculadoras/capital-gains-tax"),
  "casual-worker-tax": () => import("@/paises/gh/calculadoras/casual-worker-tax"),
  "employer-cost": () => import("@/paises/gh/calculadoras/employer-cost"),
  "exchange-rate": () => import("@/paises/gh/calculadoras/exchange-rate"),
  "gift-tax": () => import("@/paises/gh/calculadoras/gift-tax"),
  "minimum-wage": () => import("@/paises/gh/calculadoras/minimum-wage"),
  "modified-taxation-scheme": () => import("@/paises/gh/calculadoras/modified-taxation-scheme"),
  "overtime-tax": () => import("@/paises/gh/calculadoras/overtime-tax"),
  "paye-calculator": () => import("@/paises/gh/calculadoras/paye-calculator"),
  "rent-tax": () => import("@/paises/gh/calculadoras/rent-tax"),
  "ssnit-contribution": () => import("@/paises/gh/calculadoras/ssnit-contribution"),
  "ssnit-pension": () => import("@/paises/gh/calculadoras/ssnit-pension"),
  "take-home-pay": () => import("@/paises/gh/calculadoras/take-home-pay"),
  "vat-calculator": () => import("@/paises/gh/calculadoras/vat-calculator"),
};
