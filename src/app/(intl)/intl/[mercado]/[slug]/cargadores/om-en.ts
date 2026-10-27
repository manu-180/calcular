// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import { traducida } from "@/motor/edicion";
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => traducida(import("@/paises/om/calculadoras/annual-leave-calculator"), import("@/paises/om-en/textos/annual-leave-calculator")),
  "employee-cost-calculator": () => traducida(import("@/paises/om/calculadoras/employee-cost-calculator"), import("@/paises/om-en/textos/employee-cost-calculator")),
  "end-of-service-gratuity": () => traducida(import("@/paises/om/calculadoras/end-of-service-gratuity"), import("@/paises/om-en/textos/end-of-service-gratuity")),
  "final-settlement": () => traducida(import("@/paises/om/calculadoras/final-settlement"), import("@/paises/om-en/textos/final-settlement")),
  "inflation-calculator": () => traducida(import("@/paises/om/calculadoras/inflation-calculator"), import("@/paises/om-en/textos/inflation-calculator")),
  "job-security-benefit": () => traducida(import("@/paises/om/calculadoras/job-security-benefit"), import("@/paises/om-en/textos/job-security-benefit")),
  "maternity-leave-calculator": () => traducida(import("@/paises/om/calculadoras/maternity-leave-calculator"), import("@/paises/om-en/textos/maternity-leave-calculator")),
  "notice-period": () => traducida(import("@/paises/om/calculadoras/notice-period"), import("@/paises/om-en/textos/notice-period")),
  "overtime-calculator": () => traducida(import("@/paises/om/calculadoras/overtime-calculator"), import("@/paises/om-en/textos/overtime-calculator")),
  "pension-calculator": () => traducida(import("@/paises/om/calculadoras/pension-calculator"), import("@/paises/om-en/textos/pension-calculator")),
  "salary-calculator": () => traducida(import("@/paises/om/calculadoras/salary-calculator"), import("@/paises/om-en/textos/salary-calculator")),
  "sick-leave-calculator": () => traducida(import("@/paises/om/calculadoras/sick-leave-calculator"), import("@/paises/om-en/textos/sick-leave-calculator")),
  "spf-contribution-calculator": () => traducida(import("@/paises/om/calculadoras/spf-contribution-calculator"), import("@/paises/om-en/textos/spf-contribution-calculator")),
  "unfair-dismissal-compensation": () => traducida(import("@/paises/om/calculadoras/unfair-dismissal-compensation"), import("@/paises/om-en/textos/unfair-dismissal-compensation")),
  "vat-calculator": () => traducida(import("@/paises/om/calculadoras/vat-calculator"), import("@/paises/om-en/textos/vat-calculator")),
  "working-hours-calculator": () => traducida(import("@/paises/om/calculadoras/working-hours-calculator"), import("@/paises/om-en/textos/working-hours-calculator")),
};
