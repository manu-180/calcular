import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-deduction-limit-calculator";

const ACT = "https://www.moice.gov.bt/wp-content/uploads/2022/08/labouract.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Deductions over the limit",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 132: at least half is left. 30,000 × 50% = 15,000 each way. 18,000 planned, 15,000 fit, 3,000 over." },
    fecha: "2026-10-29",
    entrada: { salario: 30000, descuentos: 18000 },
    esperado: { maximo: 15000, minimo: 15000, permitido: 15000, exceso: 3000, neto: 15000, meses: 3 },
  },
  {
    nombre: "Deductions within the limit",
    origen: { tipo: "recalculado", url: ACT, detalle: "5,000 is below 15,000, so all of it fits. 30,000 − 5,000 = 25,000." },
    fecha: "2026-10-29",
    entrada: { salario: 30000, descuentos: 5000 },
    esperado: { permitido: 5000, exceso: 0, neto: 25000 },
  },
]);
