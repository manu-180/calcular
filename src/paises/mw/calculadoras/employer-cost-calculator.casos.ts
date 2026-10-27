import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "K500,000 basic, no allowances",
    origen: { tipo: "recalculado", detalle: "Pension 10% = 50,000; TEVET 1% of basic = 5,000. Cost 555,000." },
    fecha: "2026-10-27",
    entrada: { basico: 500000, otros: 0 },
    esperado: { costo: 555000, pension: 50000, tevet: 5000, costoAnual: 6660000, recargo: 11 },
  },
  {
    nombre: "K400,000 basic and K100,000 allowances",
    origen: { tipo: "recalculado", detalle: "Gross 500,000. Pension 10% of 500,000 = 50,000; TEVET 1% of 400,000 = 4,000. Cost 554,000." },
    fecha: "2026-10-27",
    entrada: { basico: 400000, otros: 100000 },
    esperado: { costo: 554000, bruto: 500000, pension: 50000, tevet: 4000 },
  },
  {
    nombre: "Zero basic pay is rejected",
    origen: { tipo: "recalculado", detalle: "Basic pay has to be above zero." },
    fecha: "2026-10-27",
    entrada: { basico: 0, otros: 0 },
    esperaError: true,
  },
]);
