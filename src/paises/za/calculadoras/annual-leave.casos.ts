import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Five-day week, R15 000 a month",
    origen: { tipo: "recalculado", detalle: "21 consecutive days = 3 weeks = 15 working days. Daily pay 15 000 / (4.333 × 5) = 692.36. A year's leave 15 × 692.36 = 10 385.40." },
    fecha: "2026-10-14",
    entrada: { salario: 15000, diasSemana: 5, trabajados: null },
    esperado: { diasAnuales: 15, diario: 692.36, pagoAnual: 10385.4 },
  },
  {
    nombre: "Six-day week, 170 days worked",
    origen: { tipo: "recalculado", detalle: "3 weeks × 6 = 18 days. Daily pay 12 000 / (4.333 × 6) = 461.57. Built up 170 / 17 = 10 days, worth 4 615.70." },
    fecha: "2026-10-14",
    entrada: { salario: 12000, diasSemana: 6, trabajados: 170 },
    esperado: { diasAnuales: 18, diario: 461.57, acumulados: 10, pagoAcumulado: 4615.7 },
  },
]);
