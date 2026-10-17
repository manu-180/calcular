import { definirCasos } from "@/motor/calculo";
import calculadora from "./paternity-leave-pay";

const PROMEDIO = { diasPeriodo: 365, diasExcluidos: 0, salariosExcluidos: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "Five days at $600 average daily wages",
    origen: { tipo: "recalculado", detalle: "219,000 / 365 = 600 x 4/5 = 480 x 5 = 2,400." },
    fecha: "2026-10-16",
    entrada: { dias: 5, salarios12: 219000, ...PROMEDIO, cuarentaSemanas: true },
    esperado: { porDia: 480, total: 2400, maximo: 5 },
  },
  {
    nombre: "Two days with unpaid days left out of the average",
    origen: { tipo: "recalculado", detalle: "(200,000 - 0) / (365 - 15) = 571.43 x 4/5 = 457.14 x 2 = 914.29." },
    fecha: "2026-10-16",
    entrada: { dias: 2, salarios12: 200000, diasPeriodo: 365, diasExcluidos: 15, salariosExcluidos: 0, cuarentaSemanas: true },
    esperado: { total: 914.29 },
  },
  {
    nombre: "Less than 40 weeks: no pay",
    origen: { tipo: "recalculado", detalle: "Paternity leave pay needs 40 weeks on a continuous contract." },
    fecha: "2026-10-16",
    entrada: { dias: 5, salarios12: 100000, diasPeriodo: 200, diasExcluidos: 0, salariosExcluidos: 0, cuarentaSemanas: false },
    esperado: { total: 0 },
  },
  {
    nombre: "More than 5 days is not valid",
    origen: { tipo: "recalculado", detalle: "Paternity leave is 5 days per confinement." },
    fecha: "2026-10-16",
    entrada: { dias: 6, salarios12: 219000, ...PROMEDIO, cuarentaSemanas: true },
    esperaError: true,
  },
]);
