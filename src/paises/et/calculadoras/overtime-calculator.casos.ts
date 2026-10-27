import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Every kind of overtime at ETB 50 an hour",
    origen: {
      tipo: "recalculado",
      detalle: "10,400 / 208 = 50 an hour. 4 × 50 × 1.5 = 300; 2 × 50 × 1.75 = 175; 8 × 50 × 2 = 800; 3 × 50 × 2.5 = 375. Total 1,650.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 10400, horasMes: 208, dia: 4, noche: 2, descanso: 8, feriado: 3 },
    esperado: { total: 1650, hora: 50, dia: 300, noche: 175, descanso: 800, feriado: 375, horas: 17 },
  },
  {
    nombre: "Daytime overtime only",
    origen: { tipo: "recalculado", detalle: "6,000 / 208 = 28.846 an hour. 10 × 28.846 × 1.5 = 432.69." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, horasMes: 208, dia: 10, noche: 0, descanso: 0, feriado: 0 },
    esperado: { total: 432.69, hora: 28.85 },
  },
]);
