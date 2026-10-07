import { definirCasos } from "@/motor/calculo";
import horasExtras from "./horas-extras";

export default definirCasos(horasExtras, [
  {
    nombre: "Jornada diurna, 10 horas extras",
    origen: { tipo: "recalculado", detalle: "Código del Trabajo art. 51 y 62. 12000 / 30 / 8 = 50 la hora; con 100 % más, 100. 10 × 100 = 1000." },
    fecha: "2026-10-07",
    entrada: { salario: 12000, jornada: "diurna", horas: 10 },
    esperado: { valorHora: 50, valorHoraExtra: 100, total: 1000 },
  },
  {
    nombre: "Jornada nocturna de 7 horas",
    origen: { tipo: "recalculado", detalle: "10500 / 30 / 7 = 50; hora extra 100. 4 × 100 = 400." },
    fecha: "2026-10-07",
    entrada: { salario: 10500, jornada: "nocturna", horas: 4 },
    esperado: { valorHora: 50, valorHoraExtra: 100, total: 400 },
  },
  {
    nombre: "Jornada mixta de 7.5 horas",
    origen: { tipo: "recalculado", detalle: "9000 / 30 / 7.5 = 40; hora extra 80. 6 × 80 = 480." },
    fecha: "2026-10-07",
    entrada: { salario: 9000, jornada: "mixta", horas: 6 },
    esperado: { valorHora: 40, valorHoraExtra: 80, total: 480 },
  },
  {
    nombre: "Salario mínimo de la industria manufacturera",
    origen: { tipo: "recalculado", detalle: "8320.48 / 30 / 8 = 34.6687, redondeado 34.67; hora extra 69.34. 5 × 69.34 = 346.70." },
    fecha: "2026-10-07",
    entrada: { salario: 8320.48, jornada: "diurna", horas: 5 },
    esperado: { valorHora: 34.67, valorHoraExtra: 69.34, total: 346.7 },
  },
]);
