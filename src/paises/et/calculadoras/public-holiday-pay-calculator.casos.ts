import { definirCasos } from "@/motor/calculo";
import calculadora from "./public-holiday-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "One full public holiday at ETB 50 an hour",
    origen: { tipo: "recalculado", detalle: "10,400 / 208 = 50. 8 hours × 50 × 2 = 800." },
    fecha: "2026-10-27",
    entrada: { salario: 10400, horasMes: 208, horas: 8 },
    esperado: { pago: 800, hora: 50, factor: 2 },
  },
  {
    nombre: "No hours entered",
    origen: { tipo: "recalculado", detalle: "Zero hours is not a valid input." },
    fecha: "2026-10-27",
    entrada: { salario: 10400, horasMes: 208, horas: 0 },
    esperaError: true,
  },
]);
