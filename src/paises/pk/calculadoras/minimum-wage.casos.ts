import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "Minimum wage 2026-27",
    origen: { tipo: "recalculado", detalle: "40,700 a month; 488,400 a year." },
    fecha: "2026-10-17",
    entrada: { sueldo: null },
    esperado: { mensual: 40700, anual: 488400, diferencia: null },
  },
  {
    nombre: "Salary of Rs. 38,000",
    origen: { tipo: "recalculado", detalle: "38,000 − 40,700 = −2,700." },
    fecha: "2026-10-17",
    entrada: { sueldo: 38000 },
    esperado: { diferencia: -2700 },
  },
]);
