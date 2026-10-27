import { definirCasos } from "@/motor/calculo";
import calculadora from "./company-car-benefit";

export default definirCasos(calculadora, [
  {
    nombre: "P450 000 car on P30 000 a month",
    origen: {
      tipo: "recalculado",
      detalle: "Regulation 24: (450 000 × 10%) / 12 = 3 750 a month. Salary 360 000 + 45 000 = 405 000: 74 050 + 27.5% × 5 000 = 75 425; without 64 050. Extra 11 375 a year, 947.92 a month.",
    },
    fecha: "2026-10-27",
    entrada: { costo: 450000, salario: 30000 },
    esperado: { beneficio: 3750, beneficioAnual: 45000, payeExtraAnual: 11375, payeExtra: 947.92 },
  },
  {
    nombre: "P200 000 car on P10 000 a month",
    origen: { tipo: "recalculado", detalle: "Benefit 20 000 a year. 120 000 → 140 000, all at 18.75%: 3 750 a year, 312.50 a month." },
    fecha: "2026-10-27",
    entrada: { costo: 200000, salario: 10000 },
    esperado: { beneficio: 1666.67, payeExtra: 312.5 },
  },
  {
    nombre: "Zero cost",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { costo: 0, salario: 10000 },
    esperaError: true,
  },
]);
