import { definirCasos } from "@/motor/calculo";
import calculadora from "./mixed-income-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Salary ₱400,000 and receipts ₱600,000",
    origen: {
      tipo: "recalculado",
      detalle:
        "Tax on compensation: (400,000 − 250,000) × 15% = 22,500. 8% option: 600,000 × 8% = 48,000, total 70,500. Graduated: 400,000 + 450,000 = 850,000, tax 102,500 + 50,000 × 25% = 115,000, plus 3% of 600,000 = 18,000, total 133,000.",
    },
    fecha: "2026-10-16",
    entrada: { compensacion: 400000, ventas: 600000, gastos: 150000 },
    esperado: { mejor: "8% on business income", sobreSueldo: 22500, ochoNegocio: 48000, ocho: 70500, graduadoRenta: 115000, pt: 18000, graduado: 133000 },
  },
  {
    nombre: "Low salary and high expenses",
    origen: {
      tipo: "recalculado",
      detalle: "Compensation 100,000: no tax. 8%: 500,000 × 8% = 40,000. Graduated: 100,000 + 50,000 = 150,000, no income tax, percentage tax 15,000. Graduated wins.",
    },
    fecha: "2026-10-16",
    entrada: { compensacion: 100000, ventas: 500000, gastos: 450000 },
    esperado: { mejor: "Graduated rates on everything", ocho: 40000, graduado: 15000 },
  },
  {
    nombre: "Business receipts above the VAT threshold",
    origen: {
      tipo: "recalculado",
      detalle: "3,200,000 is above 3,000,000: no 8% option and no percentage tax in this comparison. Net 1,200,000: 102,500 + 400,000 × 25% = 202,500.",
    },
    fecha: "2026-10-16",
    entrada: { compensacion: 0, ventas: 3200000, gastos: 2000000 },
    esperado: { ocho: null, ochoNegocio: null, graduado: 202500 },
  },
  {
    nombre: "Expenses above sales",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { compensacion: 0, ventas: 1000, gastos: 2000 },
    esperaError: true,
  },
]);
