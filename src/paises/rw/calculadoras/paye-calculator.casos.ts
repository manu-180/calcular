import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "RWF 300,000 from the main employer",
    origen: { tipo: "recalculado", detalle: "60,000 at 0% + 40,000 × 10% + 100,000 × 20% + 100,000 × 30% = 4,000 + 20,000 + 30,000 = 54,000." },
    fecha: "2026-10-26",
    entrada: { bruto: 300000, empleo: "primary" },
    esperado: { paye: 54000, despuesImpuesto: 246000, marginal: 30, anual: 648000 },
  },
  {
    nombre: "RWF 150,000 from the main employer",
    origen: { tipo: "recalculado", detalle: "40,000 × 10% + 50,000 × 20% = 4,000 + 10,000 = 14,000." },
    fecha: "2026-10-26",
    entrada: { bruto: 150000, empleo: "primary" },
    esperado: { paye: 14000, marginal: 20 },
  },
  {
    nombre: "RWF 60,000 pays no PAYE",
    origen: { tipo: "recalculado", detalle: "The first band runs to 60,000 at 0%." },
    fecha: "2026-10-26",
    entrada: { bruto: 60000, empleo: "primary" },
    esperado: { paye: 0, marginal: 0 },
  },
  {
    nombre: "RWF 100,000 from a second employer",
    origen: { tipo: "recalculado", detalle: "Flat 30% with no band: 100,000 × 30% = 30,000." },
    fecha: "2026-10-26",
    entrada: { bruto: 100000, empleo: "secondary" },
    esperado: { paye: 30000 },
  },
  {
    nombre: "Casual labourer paid RWF 100,000 in the month",
    origen: { tipo: "recalculado", detalle: "First 60,000 at 0%, then (100,000 − 60,000) × 15% = 6,000." },
    fecha: "2026-10-26",
    entrada: { bruto: 100000, empleo: "casual" },
    esperado: { paye: 6000, marginal: 15 },
  },
  {
    nombre: "Gross pay of zero",
    origen: { tipo: "recalculado", detalle: "Nothing to tax: the calculator asks for an amount." },
    fecha: "2026-10-26",
    entrada: { bruto: 0, empleo: "primary" },
    esperaError: true,
  },
]);
