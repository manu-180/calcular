import { definirCasos } from "@/motor/calculo";
import calculadora from "./eight-percent-tax";

export default definirCasos(calculadora, [
  {
    nombre: "₱1.2 million of receipts and ₱300,000 of expenses",
    origen: {
      tipo: "recalculado",
      detalle:
        "8%: (1,200,000 − 250,000) × 8% = 76,000. Graduated: net 900,000, tax 102,500 + 100,000 × 25% = 127,500, plus 3% percentage tax 36,000 = 163,500. The 8% option saves 87,500.",
    },
    fecha: "2026-10-16",
    entrada: { ventas: 1200000, gastos: 300000 },
    esperado: { mejor: "8% income tax", ocho: 76000, renta: 127500, pt: 36000, graduado: 163500, ahorro: 87500 },
  },
  {
    nombre: "High expenses make graduated rates cheaper",
    origen: {
      tipo: "recalculado",
      detalle: "8%: (2,000,000 − 250,000) × 8% = 140,000. Graduated: net 300,000, tax 7,500, plus 3% of 2,000,000 = 60,000, total 67,500.",
    },
    fecha: "2026-10-16",
    entrada: { ventas: 2000000, gastos: 1700000 },
    esperado: { mejor: "Graduated rates", ocho: 140000, graduado: 67500, ahorro: 72500 },
  },
  {
    nombre: "Above the VAT threshold",
    origen: {
      tipo: "recalculado",
      detalle: "Receipts of 3,500,000 exceed the 3,000,000 threshold: only graduated rates. Net 2,500,000, tax 402,500 + 500,000 × 30% = 552,500.",
    },
    fecha: "2026-10-16",
    entrada: { ventas: 3500000, gastos: 1000000 },
    esperado: { ocho: null, pt: null, renta: 552500, graduado: 552500 },
  },
  {
    nombre: "First half of 2023 used the 1% percentage tax",
    origen: { tipo: "recalculado", detalle: "Percentage tax 1% of 1,200,000 = 12,000 (RMC 69-2023)." },
    fecha: "2023-03-31",
    entrada: { ventas: 1200000, gastos: 300000 },
    esperado: { pt: 12000 },
  },
  {
    nombre: "Expenses above sales",
    origen: { tipo: "recalculado", detalle: "Not a valid input." },
    fecha: "2026-10-16",
    entrada: { ventas: 100000, gastos: 200000 },
    esperaError: true,
  },
]);
