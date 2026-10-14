import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ATO example: Matthew, $75,000 taxable income, Medicare levy",
    origen: {
      tipo: "oficial",
      url: "https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/what-is-the-medicare-levy",
      detalle: "$75,000 × 0.02 = $1,500 Medicare levy. Tax 2025-26: 4,288 + 30,000 × 30% = 13,288; total 14,788.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 75000, anio: "2025-26", medicare: true },
    esperado: { bruto: 13288, offset: 0, medicareLevy: 1500, total: 14788, marginal: 30 },
  },
  {
    nombre: "ATO example: Angie, $29,000, reduced Medicare levy",
    origen: {
      tipo: "oficial",
      url: "https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-reduction/medicare-levy-reduction-for-low-income-earners",
      detalle: "The ATO says Angie's Medicare levy is reduced to $98.90 ((29,000 − 28,011) × 10%). Tax 2025-26: 10,800 × 16% = 1,728, less LITO 700 = 1,028; total 1,126.90.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 29000, anio: "2025-26", medicare: true },
    esperado: { bruto: 1728, offset: 700, impuesto: 1028, medicareLevy: 98.9, total: 1126.9 },
  },
  {
    nombre: "$85,000 in 2026-27",
    origen: { tipo: "recalculado", detalle: "4,020 + 40,000 × 30% = 16,020. No LITO above $66,667. Medicare 1,700. Total 17,720; after tax 67,280." },
    fecha: "2026-10-14",
    entrada: { ingreso: 85000, anio: "2026-27", medicare: true },
    esperado: { bruto: 16020, offset: 0, impuesto: 16020, medicareLevy: 1700, total: 17720, neto: 67280, marginal: 30 },
  },
  {
    nombre: "$40,000 in 2026-27, first LITO phase-out",
    origen: { tipo: "recalculado", detalle: "21,800 × 15% = 3,270. LITO 700 − 2,500 × 5% = 575. Tax 2,695. Medicare 2% = 800 (above 35,013). Total 3,495." },
    fecha: "2026-10-14",
    entrada: { ingreso: 40000, anio: "2026-27", medicare: true },
    esperado: { bruto: 3270, offset: 575, impuesto: 2695, medicareLevy: 800, total: 3495, marginal: 15 },
  },
  {
    nombre: "$50,000 in 2026-27, second LITO phase-out",
    origen: { tipo: "recalculado", detalle: "4,020 + 5,000 × 30% = 5,520. LITO 325 − 5,000 × 1.5% = 250. Tax 5,270. Medicare 1,000. Total 6,270." },
    fecha: "2026-10-14",
    entrada: { ingreso: 50000, anio: "2026-27", medicare: true },
    esperado: { offset: 250, impuesto: 5270, total: 6270 },
  },
  {
    nombre: "$20,000: the offset wipes out the tax",
    origen: { tipo: "recalculado", detalle: "1,800 × 15% = 270; LITO capped at 270, so tax is 0. Below the Medicare threshold. Total 0." },
    fecha: "2026-10-14",
    entrada: { ingreso: 20000, anio: "2026-27", medicare: true },
    esperado: { bruto: 270, offset: 270, impuesto: 0, medicareLevy: 0, total: 0 },
  },
  {
    nombre: "$200,000 without Medicare",
    origen: { tipo: "recalculado", detalle: "51,370 + 10,000 × 45% = 55,870. Medicare excluded." },
    fecha: "2026-10-14",
    entrada: { ingreso: 200000, anio: "2026-27", medicare: false },
    esperado: { total: 55870, medicareLevy: 0, marginal: 45 },
  },
  {
    nombre: "Negative income",
    origen: { tipo: "recalculado", detalle: "The function rejects incomes below zero." },
    fecha: "2026-10-14",
    entrada: { ingreso: -1, anio: "2026-27", medicare: true },
    esperaError: true,
  },
]);
