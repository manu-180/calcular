import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "10 horas en días de trabajo y 8 en descanso",
    origen: { tipo: "recalculado", detalle: "Hora 480 / 30 / 8 = 2. 10 × 2 × 125 % = 25. 8 × 2 × 150 % = 24. Total 49." },
    fecha: "2026-10-24",
    entrada: { salario: 480, horas: 10, horasDescanso: 8 },
    esperado: { hora: 2, normal: 25, descanso: 24, total: 49, horaExtra: 2.5, horaDescanso: 3 },
  },
  {
    nombre: "Salario mínimo con 5 horas",
    origen: { tipo: "recalculado", detalle: "Hora 290 / 240 = 1,20833. 5 × 1,20833 × 1,25 = 7,552." },
    fecha: "2026-10-24",
    entrada: { salario: 290, horas: 5, horasDescanso: 0 },
    esperado: { normal: 7.552, total: 7.552 },
  },
  {
    nombre: "Sin horas",
    origen: { tipo: "recalculado", detalle: "Cero horas." },
    fecha: "2026-10-24",
    entrada: { salario: 480, horas: 0, horasDescanso: 0 },
    esperaError: true,
  },
]);
