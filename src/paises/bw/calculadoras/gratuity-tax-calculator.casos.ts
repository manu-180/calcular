import { definirCasos } from "@/motor/calculo";
import calculadora from "./gratuity-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "P36 000 severance spread over three years (BURS example 10)",
    origen: {
      tipo: "oficial",
      url: "https://www.burs.org.bw/images/Tax%20Table_2026.pdf",
      detalle:
        "Example 10: taxable half 18 000. All in one year: 9 675 − 6 300 = 3 375. Spread at 6 000 a year: 300 + 300 + 1 125 = 1 725, the lower. BURS sets it in 2023 to 2025; the incomes stay under P400 000, so the 2026/27 table gives the same tax.",
    },
    fecha: "2026-10-27",
    entrada: { monto: 36000, ingreso: 120000, plazo: "3", ingresoPrevio: 72000, ingresoPrevio2: 48000 },
    esperado: { exento: 18000, gravable: 18000, unaVez: 3375, repartido: 1725, impuesto: 1725, neto: 34275 },
  },
  {
    nombre: "One-year contract is taxed in the year received",
    origen: { tipo: "recalculado", detalle: "Taxable 25 000 on top of 150 000: tax(175 000) − tax(150 000) = 17 800 − 11 925 = 5 875." },
    fecha: "2026-10-27",
    entrada: { monto: 50000, ingreso: 150000, plazo: "1", ingresoPrevio: null, ingresoPrevio2: null },
    esperado: { gravable: 25000, unaVez: 5875, impuesto: 5875, repartido: null },
  },
  {
    nombre: "Spreading uses the old table for 2025/26",
    origen: {
      tipo: "recalculado",
      detalle:
        "Taxable 200 000 on top of 450 000. One year (2026/27): 27.5% × 200 000 = 55 000. Two years at 100 000: 2026/27 27.5% × 100 000 = 27 500; 2025/26 old table, 25% × 100 000 = 25 000. Total 52 500.",
    },
    fecha: "2026-10-27",
    entrada: { monto: 400000, ingreso: 450000, plazo: "2", ingresoPrevio: 450000, ingresoPrevio2: null },
    esperado: { unaVez: 55000, repartido: 52500, impuesto: 52500 },
  },
  {
    nombre: "Zero payment",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { monto: 0, ingreso: 0, plazo: "1", ingresoPrevio: null, ingresoPrevio2: null },
    esperaError: true,
  },
]);
