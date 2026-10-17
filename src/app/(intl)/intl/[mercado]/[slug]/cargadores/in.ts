// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "advance-tax-calculator": () => import("@/paises/in/calculadoras/advance-tax-calculator"),
  "capital-gains-tax-calculator": () => import("@/paises/in/calculadoras/capital-gains-tax-calculator"),
  "emi-calculator": () => import("@/paises/in/calculadoras/emi-calculator"),
  "epf-calculator": () => import("@/paises/in/calculadoras/epf-calculator"),
  "fd-calculator": () => import("@/paises/in/calculadoras/fd-calculator"),
  "gratuity-calculator": () => import("@/paises/in/calculadoras/gratuity-calculator"),
  "gst-calculator": () => import("@/paises/in/calculadoras/gst-calculator"),
  "hra-calculator": () => import("@/paises/in/calculadoras/hra-calculator"),
  "in-hand-salary-calculator": () => import("@/paises/in/calculadoras/in-hand-salary-calculator"),
  "income-tax-calculator": () => import("@/paises/in/calculadoras/income-tax-calculator"),
  "kvp-calculator": () => import("@/paises/in/calculadoras/kvp-calculator"),
  "nsc-calculator": () => import("@/paises/in/calculadoras/nsc-calculator"),
  "post-office-mis-calculator": () => import("@/paises/in/calculadoras/post-office-mis-calculator"),
  "post-office-rd-calculator": () => import("@/paises/in/calculadoras/post-office-rd-calculator"),
  "ppf-calculator": () => import("@/paises/in/calculadoras/ppf-calculator"),
  "scss-calculator": () => import("@/paises/in/calculadoras/scss-calculator"),
  "sip-calculator": () => import("@/paises/in/calculadoras/sip-calculator"),
  "sukanya-samriddhi-calculator": () => import("@/paises/in/calculadoras/sukanya-samriddhi-calculator"),
};
