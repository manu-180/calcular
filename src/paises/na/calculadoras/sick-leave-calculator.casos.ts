import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Five-day week after the first year",
    origen: { tipo: "recalculado", detalle: "Section 24(1)(a): 30 working days per 36-month cycle." },
    fecha: "2026-10-27",
    entrada: { dias: 5, primerAnio: false, trabajados: null, salario: null },
    esperado: { disponibles: 30, ciclo: 30 },
  },
  {
    nombre: "Six-day week, N$6,500 a month",
    origen: { tipo: "recalculado", detalle: "Section 24(1)(b): 36 days. Daily pay 6,500 / (4.333 × 6) = 250.02." },
    fecha: "2026-10-27",
    entrada: { dias: 6, primerAnio: false, trabajados: null, salario: 6500 },
    esperado: { disponibles: 36, diaria: 250.02 },
  },
  {
    nombre: "Three-day week, pro rata",
    origen: { tipo: "recalculado", detalle: "Section 24(1)(c): 30 × 3 / 5 = 18 days." },
    fecha: "2026-10-27",
    entrada: { dias: 3, primerAnio: false, trabajados: null, salario: null },
    esperado: { ciclo: 18 },
  },
  {
    nombre: "First year, 120 days worked",
    origen: { tipo: "recalculado", detalle: "One day for every 26 days worked: 120 / 26 = 4 full days." },
    fecha: "2026-10-27",
    entrada: { dias: 5, primerAnio: true, trabajados: 120, salario: null },
    esperado: { disponibles: 4, primerAnio: 4, ciclo: 30 },
  },
]);
