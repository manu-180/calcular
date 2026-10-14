import { definirCasos } from "@/motor/calculo";
import calculadora from "./national-insurance-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "£30,000 salary",
    origen: { tipo: "recalculado", detalle: "(30,000 − 12,570) × 8% = 1,394.40. Employer (30,000 − 5,000) × 15% = 3,750." },
    fecha: "2026-10-14",
    entrada: { salario: 30000, jubilado: false },
    esperado: { empleado: 1394.4, mensual: 116.2, empleador: 3750 },
  },
  {
    nombre: "£60,000 salary, above the Upper Earnings Limit",
    origen: { tipo: "recalculado", detalle: "37,700 × 8% = 3,016 + (60,000 − 50,270) × 2% = 194.60. Total 3,210.60." },
    fecha: "2026-10-14",
    entrada: { salario: 60000, jubilado: false },
    esperado: { empleado: 3210.6, empleador: 8250 },
  },
  {
    nombre: "Below the Primary Threshold",
    origen: { tipo: "recalculado", detalle: "12,000 is under 12,570: no employee NI. Employer (12,000 − 5,000) × 15% = 1,050." },
    fecha: "2026-10-14",
    entrada: { salario: 12000, jubilado: false },
    esperado: { empleado: 0, empleador: 1050 },
  },
  {
    nombre: "Over State Pension age",
    origen: { tipo: "recalculado", detalle: "No employee NI after State Pension age. Employer (40,000 − 5,000) × 15% = 5,250." },
    fecha: "2026-10-14",
    entrada: { salario: 40000, jubilado: true },
    esperado: { empleado: 0, empleador: 5250 },
  },
]);
