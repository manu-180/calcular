// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import { traducida } from "@/motor/edicion";
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calculadora-401k": () => traducida(import("@/paises/us/calculadoras/401k-contribution"), import("@/paises/us-es/textos/401k-contribution")),
  "calculadora-cheque-de-pago": () => traducida(import("@/paises/us/calculadoras/take-home-pay"), import("@/paises/us-es/textos/take-home-pay")),
  "calculadora-credito-tributario-por-hijos": () => traducida(import("@/paises/us/calculadoras/child-tax-credit"), import("@/paises/us-es/textos/child-tax-credit")),
  "calculadora-de-inflacion": () => traducida(import("@/paises/us/calculadoras/inflation-calculator"), import("@/paises/us-es/textos/inflation-calculator")),
  "calculadora-distribucion-minima-requerida": () => traducida(import("@/paises/us/calculadoras/rmd-calculator"), import("@/paises/us-es/textos/rmd-calculator")),
  "calculadora-horas-extras": () => traducida(import("@/paises/us/calculadoras/overtime"), import("@/paises/us-es/textos/overtime")),
  "calculadora-hsa": () => traducida(import("@/paises/us/calculadoras/hsa-contribution"), import("@/paises/us-es/textos/hsa-contribution")),
  "calculadora-impuesto-fica": () => traducida(import("@/paises/us/calculadoras/fica-tax"), import("@/paises/us-es/textos/fica-tax")),
  "calculadora-impuesto-ganancias-de-capital": () => traducida(import("@/paises/us/calculadoras/capital-gains-tax"), import("@/paises/us-es/textos/capital-gains-tax")),
  "calculadora-impuesto-sobre-las-ventas": () => traducida(import("@/paises/us/calculadoras/sales-tax"), import("@/paises/us-es/textos/sales-tax")),
  "calculadora-impuesto-trabajo-por-cuenta-propia": () => traducida(import("@/paises/us/calculadoras/self-employment-tax"), import("@/paises/us-es/textos/self-employment-tax")),
  "calculadora-impuestos-de-nomina-empleador": () => traducida(import("@/paises/us/calculadoras/employer-payroll-tax"), import("@/paises/us-es/textos/employer-payroll-tax")),
  "calculadora-impuestos-estimados-trimestrales": () => traducida(import("@/paises/us/calculadoras/quarterly-estimated-taxes"), import("@/paises/us-es/textos/quarterly-estimated-taxes")),
  "calculadora-impuestos-federales": () => traducida(import("@/paises/us/calculadoras/federal-income-tax"), import("@/paises/us-es/textos/federal-income-tax")),
  "calculadora-impuestos-sobre-bono": () => traducida(import("@/paises/us/calculadoras/bonus-tax"), import("@/paises/us-es/textos/bonus-tax")),
  "calculadora-millaje-irs": () => traducida(import("@/paises/us/calculadoras/mileage-reimbursement"), import("@/paises/us-es/textos/mileage-reimbursement")),
  "calculadora-roth-ira": () => traducida(import("@/paises/us/calculadoras/roth-ira-contribution"), import("@/paises/us-es/textos/roth-ira-contribution")),
  "calculadora-seguro-social": () => traducida(import("@/paises/us/calculadoras/social-security-benefits"), import("@/paises/us-es/textos/social-security-benefits")),
  "deduccion-estandar": () => traducida(import("@/paises/us/calculadoras/standard-deduction"), import("@/paises/us-es/textos/standard-deduction")),
  "deduccion-para-mayores-de-65": () => traducida(import("@/paises/us/calculadoras/senior-deduction"), import("@/paises/us-es/textos/senior-deduction")),
  "horas-extras-sin-impuestos": () => traducida(import("@/paises/us/calculadoras/no-tax-on-overtime"), import("@/paises/us-es/textos/no-tax-on-overtime")),
  "propinas-sin-impuestos": () => traducida(import("@/paises/us/calculadoras/no-tax-on-tips"), import("@/paises/us-es/textos/no-tax-on-tips")),
  "salario-minimo-por-estado": () => traducida(import("@/paises/us/calculadoras/minimum-wage"), import("@/paises/us-es/textos/minimum-wage")),
};
