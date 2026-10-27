import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "€30,000 at single rates",
    origen: { tipo: "recalculado", detalle: "Article 56(1)(b)(i): 30,000 × 25% − 3,400 = 4,100. Marginal: 4,000 × 15% + 14,000 × 25% = 600 + 3,500 = 4,100." },
    fecha: "2026-10-26",
    entrada: { ingreso: 30000, estado: "single" },
    esperado: { impuesto: 4100, mensual: 341.67, despues: 25900, marginal: 25 },
  },
  {
    nombre: "€30,000 at married rates",
    origen: { tipo: "recalculado", detalle: "Article 56(1)(a)(i): 30,000 × 25% − 4,550 = 2,950." },
    fecha: "2026-10-26",
    entrada: { ingreso: 30000, estado: "married" },
    esperado: { impuesto: 2950 },
  },
  {
    nombre: "€30,000 married with two children",
    origen: { tipo: "recalculado", detalle: "Article 56(1)(a)(iii): 30,000 × 15% − 3,375 = 1,125." },
    fecha: "2026-10-26",
    entrada: { ingreso: 30000, estado: "married-two-children" },
    esperado: { impuesto: 1125, marginal: 15 },
  },
  {
    nombre: "€70,000 at single rates",
    origen: { tipo: "recalculado", detalle: "70,000 × 35% − 9,400 = 15,100." },
    fecha: "2026-10-26",
    entrada: { ingreso: 70000, estado: "single" },
    esperado: { impuesto: 15100, marginal: 35, efectiva: 21.57 },
  },
  {
    nombre: "€80,000 parent with one child",
    origen: { tipo: "oficial", url: "https://web.archive.org/web/20260415184943/https://mtca.gov.mt/docs/default-source/documents/2026-tax-rates.pdf?sfvrsn=37563fb2_11", detalle: "MTCA table 2.3: 80,000 × 35% − 10,275 = 17,725." },
    fecha: "2026-10-26",
    entrada: { ingreso: 80000, estado: "parent-one-child" },
    esperado: { impuesto: 17725 },
  },
  {
    nombre: "€20,000 parent rates and married with one child",
    origen: { tipo: "recalculado", detalle: "Parent: 20,000 × 25% − 3,700 = 1,300. Married with one child: 20,000 × 15% − 2,625 = 375." },
    fecha: "2026-10-26",
    entrada: { ingreso: 20000, estado: "parent" },
    esperado: { impuesto: 1300 },
  },
  {
    nombre: "€20,000 married with one child",
    origen: { tipo: "recalculado", detalle: "20,000 × 15% − 2,625 = 375." },
    fecha: "2026-10-26",
    entrada: { ingreso: 20000, estado: "married-one-child" },
    esperado: { impuesto: 375 },
  },
  {
    nombre: "€24,000 parent with two children",
    origen: { tipo: "recalculado", detalle: "24,000 × 15% − 2,775 = 825." },
    fecha: "2026-10-26",
    entrada: { ingreso: 24000, estado: "parent-two-children" },
    esperado: { impuesto: 825 },
  },
  {
    nombre: "Income under the tax-free band",
    origen: { tipo: "recalculado", detalle: "11,000 is under 12,000 at single rates, so no tax." },
    fecha: "2026-10-26",
    entrada: { ingreso: 11000, estado: "single" },
    esperado: { impuesto: 0, marginal: 0 },
  },
  { nombre: "Zero income", origen: { tipo: "recalculado", detalle: "No income to tax." }, fecha: "2026-10-26", entrada: { ingreso: 0, estado: "single" }, esperaError: true },
]);
