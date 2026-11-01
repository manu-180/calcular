// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import { traducida } from "@/motor/edicion";
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => traducida(import("@/paises/qa/calculadoras/annual-leave"), import("@/paises/qa-ar/textos/annual-leave")),
  "corporate-tax-calculator": () => traducida(import("@/paises/qa/calculadoras/corporate-tax-calculator"), import("@/paises/qa-ar/textos/corporate-tax-calculator")),
  "domestic-worker-gratuity": () => traducida(import("@/paises/qa/calculadoras/domestic-worker-gratuity"), import("@/paises/qa-ar/textos/domestic-worker-gratuity")),
  "employer-cost-calculator": () => traducida(import("@/paises/qa/calculadoras/employer-cost-calculator"), import("@/paises/qa-ar/textos/employer-cost-calculator")),
  "excise-tax-calculator": () => traducida(import("@/paises/qa/calculadoras/excise-tax-calculator"), import("@/paises/qa-ar/textos/excise-tax-calculator")),
  "final-settlement": () => traducida(import("@/paises/qa/calculadoras/final-settlement"), import("@/paises/qa-ar/textos/final-settlement")),
  "gratuity-calculator": () => traducida(import("@/paises/qa/calculadoras/gratuity-calculator"), import("@/paises/qa-ar/textos/gratuity-calculator")),
  "grsia-contribution-calculator": () => traducida(import("@/paises/qa/calculadoras/grsia-contribution-calculator"), import("@/paises/qa-ar/textos/grsia-contribution-calculator")),
  "maternity-leave-pay": () => traducida(import("@/paises/qa/calculadoras/maternity-leave-pay"), import("@/paises/qa-ar/textos/maternity-leave-pay")),
  "minimum-wage": () => traducida(import("@/paises/qa/calculadoras/minimum-wage"), import("@/paises/qa-ar/textos/minimum-wage")),
  "notice-period": () => traducida(import("@/paises/qa/calculadoras/notice-period"), import("@/paises/qa-ar/textos/notice-period")),
  "overtime-calculator": () => traducida(import("@/paises/qa/calculadoras/overtime-calculator"), import("@/paises/qa-ar/textos/overtime-calculator")),
  "pension-calculator": () => traducida(import("@/paises/qa/calculadoras/pension-calculator"), import("@/paises/qa-ar/textos/pension-calculator")),
  "property-registration-fee": () => traducida(import("@/paises/qa/calculadoras/property-registration-fee"), import("@/paises/qa-ar/textos/property-registration-fee")),
  "qar-usd-converter": () => traducida(import("@/paises/qa/calculadoras/qar-usd-converter"), import("@/paises/qa-ar/textos/qar-usd-converter")),
  "ramadan-working-hours": () => traducida(import("@/paises/qa/calculadoras/ramadan-working-hours"), import("@/paises/qa-ar/textos/ramadan-working-hours")),
  "sick-leave-pay": () => traducida(import("@/paises/qa/calculadoras/sick-leave-pay"), import("@/paises/qa-ar/textos/sick-leave-pay")),
  "sugar-tax-calculator": () => traducida(import("@/paises/qa/calculadoras/sugar-tax-calculator"), import("@/paises/qa-ar/textos/sugar-tax-calculator")),
  "take-home-pay": () => traducida(import("@/paises/qa/calculadoras/take-home-pay"), import("@/paises/qa-ar/textos/take-home-pay")),
  "withholding-tax-calculator": () => traducida(import("@/paises/qa/calculadoras/withholding-tax-calculator"), import("@/paises/qa-ar/textos/withholding-tax-calculator")),
};
