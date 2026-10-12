import { definirCasos } from "@/motor/calculo";
import pagoDiaDeAsueto from "./pago-dia-de-asueto";

export default definirCasos(pagoDiaDeAsueto, [
  {
    nombre: "Ocho horas en asueto, jornada diurna",
    origen: { tipo: "recalculado", detalle: "CT arts. 128 y 129: hora 4800 / 30 / 8 = 20; extra 30 (art. 121); 8 × 30 = 240." },
    fecha: "2026-10-12",
    entrada: { salario: 4800, jornada: "diurna", horas: 8 },
    esperado: { hora: 20, horaExtra: 30, pago: 240 },
  },
  {
    nombre: "Jornada mixta",
    origen: { tipo: "recalculado", detalle: "Hora 4200 / 30 / 7 = 20; extra 30; 7 horas = 210." },
    fecha: "2026-10-12",
    entrada: { salario: 4200, jornada: "mixta", horas: 7 },
    esperado: { pago: 210 },
  },
]);
