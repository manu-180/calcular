import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "300 al mes en 2026",
    origen: { tipo: "recalculado", detalle: "Mínimo 290. Diferencia 10. Diario 290 / 30 = 9,667. Hora 290 × 12 / (48 × 52) = 1,394. Anual 3.480." },
    fecha: "2026-10-24",
    entrada: { salario: 300 },
    esperado: { minimo: 290, diferencia: 10, diario: 9.667, horario: 1.394, anual: 3480, cumple: "نعم، راتبك لا يقل عن الحد الأدنى" },
  },
  {
    nombre: "Por debajo del mínimo",
    origen: { tipo: "recalculado", detalle: "250 − 290 = −40." },
    fecha: "2025-01-01",
    entrada: { salario: 250 },
    esperado: { diferencia: -40, cumple: "لا، راتبك أقل من الحد الأدنى" },
  },
]);
