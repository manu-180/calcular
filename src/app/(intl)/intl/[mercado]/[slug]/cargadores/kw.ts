// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "currency-converter": () => import("@/paises/kw/calculadoras/currency-converter"),
  "discount-rate-calculator": () => import("@/paises/kw/calculadoras/discount-rate-calculator"),
  "employer-cost": () => import("@/paises/kw/calculadoras/employer-cost"),
  "gold-zakat-calculator": () => import("@/paises/kw/calculadoras/gold-zakat-calculator"),
  "inflation-calculator": () => import("@/paises/kw/calculadoras/inflation-calculator"),
  "pifss-calculator": () => import("@/paises/kw/calculadoras/pifss-calculator"),
  "remittance-calculator": () => import("@/paises/kw/calculadoras/remittance-calculator"),
  "take-home-pay": () => import("@/paises/kw/calculadoras/take-home-pay"),
  "zakat-calculator": () => import("@/paises/kw/calculadoras/zakat-calculator"),
};
