import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost";

export default definirCasos(calculadora, [
  {
    nombre: "One employee on L$40,000",
    origen: { tipo: "recalculado", detalle: "Employer pension 4% = 1,600 and injury 2% = 800. Monthly 42,400, yearly 508,800." },
    fecha: "2026-10-27",
    entrada: { salario: 40000, empleados: 1 },
    esperado: { pension: 1600, riesgo: 800, mensual: 42400, anual: 508800 },
  },
  {
    nombre: "Five employees on L$60,000",
    origen: { tipo: "recalculado", detalle: "60,000 × 1.06 = 63,600 each. Five: 318,000 a month, 3,816,000 a year." },
    fecha: "2026-10-27",
    entrada: { salario: 60000, empleados: 5 },
    esperado: { mensual: 63600, total: 318000, totalAnual: 3816000 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { salario: 0, empleados: 1 },
    esperaError: true,
  },
]);
