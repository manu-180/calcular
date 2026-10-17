// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "absd-calculator": () => import("@/paises/sg/calculadoras/absd-calculator"),
  "annual-leave": () => import("@/paises/sg/calculadoras/annual-leave"),
  "buyer-stamp-duty": () => import("@/paises/sg/calculadoras/buyer-stamp-duty"),
  "cpf-allocation": () => import("@/paises/sg/calculadoras/cpf-allocation"),
  "cpf-contribution-calculator": () => import("@/paises/sg/calculadoras/cpf-contribution-calculator"),
  "cpf-interest": () => import("@/paises/sg/calculadoras/cpf-interest"),
  "employer-cost-calculator": () => import("@/paises/sg/calculadoras/employer-cost-calculator"),
  "gst-calculator": () => import("@/paises/sg/calculadoras/gst-calculator"),
  "hdb-loan": () => import("@/paises/sg/calculadoras/hdb-loan"),
  "income-tax-calculator": () => import("@/paises/sg/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/sg/calculadoras/inflation-calculator"),
  "non-resident-tax": () => import("@/paises/sg/calculadoras/non-resident-tax"),
  "notice-period": () => import("@/paises/sg/calculadoras/notice-period"),
  "overtime-pay": () => import("@/paises/sg/calculadoras/overtime-pay"),
  "property-tax-calculator": () => import("@/paises/sg/calculadoras/property-tax-calculator"),
  "retrenchment-benefit": () => import("@/paises/sg/calculadoras/retrenchment-benefit"),
  "seller-stamp-duty": () => import("@/paises/sg/calculadoras/seller-stamp-duty"),
  "sick-leave": () => import("@/paises/sg/calculadoras/sick-leave"),
  "srs-tax-savings": () => import("@/paises/sg/calculadoras/srs-tax-savings"),
  "take-home-pay": () => import("@/paises/sg/calculadoras/take-home-pay"),
  "tdsr-calculator": () => import("@/paises/sg/calculadoras/tdsr-calculator"),
};
