import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Horas de día",
    origen: { tipo: "recalculado", detalle: "Hora 480 / 30 / 8 = 2. Con 25 %: 2,5 × 10 = 25." },
    fecha: "2026-10-26",
    entrada: { basico: 480, tipo: "day", urgente: false, horas: 10, dias: null, horasDia: 8, diasMes: 30 },
    esperado: { hora: 2, porUnidad: 2.5, pago: 25, recargo: 25 },
  },
  {
    nombre: "Horas de noche",
    origen: { tipo: "recalculado", detalle: "2 × 1,5 = 3 × 10 = 30." },
    fecha: "2026-10-26",
    entrada: { basico: 480, tipo: "night", urgente: false, horas: 10, dias: null, horasDia: 8, diasMes: 30 },
    esperado: { porUnidad: 3, pago: 30 },
  },
  {
    nombre: "Día de descanso",
    origen: { tipo: "recalculado", detalle: "Diario 16 × 100 % = 16 por día, además del salario del día; 2 días = 32." },
    fecha: "2026-10-26",
    entrada: { basico: 480, tipo: "rest", urgente: false, horas: null, dias: 2, horasDia: 8, diasMes: 30 },
    esperado: { porUnidad: 16, pago: 32 },
  },
  {
    nombre: "Urgente de noche",
    origen: { tipo: "recalculado", detalle: "Art. 72: 2 × 1,75 = 3,5 × 4 = 14." },
    fecha: "2026-10-26",
    entrada: { basico: 480, tipo: "night", urgente: true, horas: 4, dias: null, horasDia: 8, diasMes: 30 },
    esperado: { porUnidad: 3.5, pago: 14, recargo: 75 },
  },
  {
    nombre: "Urgente en feriado",
    origen: { tipo: "recalculado", detalle: "Art. 72: 200 % del diario 16 = 32 por día." },
    fecha: "2026-10-26",
    entrada: { basico: 480, tipo: "rest", urgente: true, horas: null, dias: 1, horasDia: 8, diasMes: 30 },
    esperado: { pago: 32 },
  },
]);
