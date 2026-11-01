import { definirCasos } from "@/motor/calculo";
import calculadora from "./ramadan-working-hours";

export default definirCasos(calculadora, [
  {
    nombre: "Ocho horas diarias en Ramadán, criterio diario",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 98: tope 6 h. 2 h x 5 días = 10 h. Hora: 8.000/30/6 = 44,44 + 50 % de 6.000/30/6 = 16,67 -> 61,11 x 10 = 611,11.",
    },
    fecha: "2026-10-24",
    entrada: { horasDia: 8, diasSemana: 5, criterio: "daily", basico: 6000, total: 8000 },
    esperado: { extraSemana: 10, pagoSemana: 611.11, semana: 40, maxDia: 6, maxSemana: 36 },
  },
  {
    nombre: "Mismo horario con criterio semanal",
    origen: { tipo: "recalculado", detalle: "40 h - 36 h = 4 h x 61,11 = 244,44." },
    fecha: "2026-10-24",
    entrada: { horasDia: 8, diasSemana: 5, criterio: "weekly", basico: 6000, total: 8000 },
    esperado: { extraSemana: 4, pagoSemana: 244.44 },
  },
  {
    nombre: "Seis horas: sin extra",
    origen: { tipo: "recalculado", detalle: "6 h no pasa el tope." },
    fecha: "2026-10-24",
    entrada: { horasDia: 6, diasSemana: 5, criterio: "daily", basico: 6000, total: 8000 },
    esperado: { extraSemana: 0, pagoSemana: 0 },
  },
  {
    nombre: "Sin horas",
    origen: { tipo: "recalculado", detalle: "0 horas." },
    fecha: "2026-10-24",
    entrada: { horasDia: 0, diasSemana: 5, criterio: "daily", basico: 6000, total: 8000 },
    esperaError: true,
  },
]);
