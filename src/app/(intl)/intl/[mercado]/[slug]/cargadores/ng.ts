// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "company-income-tax-calculator": () => import("@/paises/ng/calculadoras/company-income-tax-calculator"),
  "compensation-for-loss-of-office": () => import("@/paises/ng/calculadoras/compensation-for-loss-of-office"),
  "dollar-to-naira": () => import("@/paises/ng/calculadoras/dollar-to-naira"),
  "employer-cost-calculator": () => import("@/paises/ng/calculadoras/employer-cost-calculator"),
  "fixed-deposit-calculator": () => import("@/paises/ng/calculadoras/fixed-deposit-calculator"),
  "minimum-wage": () => import("@/paises/ng/calculadoras/minimum-wage"),
  "net-salary-calculator": () => import("@/paises/ng/calculadoras/net-salary-calculator"),
  "nhf-calculator": () => import("@/paises/ng/calculadoras/nhf-calculator"),
  "paye-calculator": () => import("@/paises/ng/calculadoras/paye-calculator"),
  "pension-calculator": () => import("@/paises/ng/calculadoras/pension-calculator"),
  "rent-relief-calculator": () => import("@/paises/ng/calculadoras/rent-relief-calculator"),
  "retirement-savings-account-calculator": () => import("@/paises/ng/calculadoras/retirement-savings-account-calculator"),
  "stamp-duty-on-transfers": () => import("@/paises/ng/calculadoras/stamp-duty-on-transfers"),
  "treasury-bill-calculator": () => import("@/paises/ng/calculadoras/treasury-bill-calculator"),
  "vat-calculator": () => import("@/paises/ng/calculadoras/vat-calculator"),
};
