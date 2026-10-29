import { definirCasos } from "@/motor/calculo";
import calculadora from "./final-pay";

export default definirCasos(calculadora, [
  {
    nombre: "40 months, notice paid, five leave days",
    origen: {
      tipo: "recalculado",
      detalle: "Notice s. 130: one month = 6 000. Severance s. 136: 1 384.62 × 2 × 3 = 8 307.72. Leave s. 188(4): 5 × 276.92 = 1 384.60. Total 15 692.32.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 6000, semana: "five-day", meses: 40, vacaciones: 5, preaviso: "lieu", conducta: false, pendiente: null },
    esperado: { preaviso: 6000, indemnizacion: 8307.72, vacaciones: 1384.6, total: 15692.32 },
  },
  {
    nombre: "8 months, notice worked, wages owed",
    origen: { tipo: "recalculado", detalle: "No notice pay, no severance. Leave 3 × 276.92 = 830.76. Plus 2 000 owed. Total 2 830.76." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, semana: "five-day", meses: 8, vacaciones: 3, preaviso: "worked", conducta: false, pendiente: 2000 },
    esperado: { preaviso: 0, indemnizacion: 0, vacaciones: 830.76, total: 2830.76 },
  },
  {
    nombre: "Dismissed for misconduct",
    origen: { tipo: "recalculado", detalle: "No severance (s. 136(2)). Notice 6 000 + leave 1 384.60 = 7 384.60." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, semana: "five-day", meses: 40, vacaciones: 5, preaviso: "lieu", conducta: true, pendiente: null },
    esperado: { indemnizacion: 0, total: 7384.6 },
  },
]);
