import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Diez horas en un mes con 3.000",
    origen: { tipo: "recalculado", detalle: "Art. 68 y 71: hora = 3.000 × 12 / 52 / 45 = 15,3846; × 150 % = 23,0769; × 10 = 230,77." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, horas: 10, semanas: 4 },
    esperado: { total: 230.77, hora: 15.38, horaExtra: 23.08, promedio: 2.5 },
  },
  {
    nombre: "Por encima del tope semanal",
    origen: { tipo: "recalculado", detalle: "Hora = 3.900 × 12 / 52 / 45 = 20; extra 30; 60 h en 4 semanas = 15 h por semana (tope 12); 1.800." },
    fecha: "2026-10-29",
    entrada: { salario: 3900, horas: 60, semanas: 4 },
    esperado: { total: 1800, hora: 20, horaExtra: 30, promedio: 15 },
  },
  {
    nombre: "Sin horas",
    origen: { tipo: "recalculado", detalle: "Cero horas extra." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, horas: 0, semanas: 4 },
    esperaError: true,
  },
]);
