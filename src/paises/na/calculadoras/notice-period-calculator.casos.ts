import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "More than a year, N$10,000 a month",
    origen: { tipo: "recalculado", detalle: "Section 30(1)(c): one month. Pay instead of notice: 10,000." },
    fecha: "2026-10-27",
    entrada: { antiguedad: "over-1-year", salario: 10000, dias: 5 },
    esperado: { preaviso: "1 month", pago: 10000 },
  },
  {
    nombre: "Six months in the job",
    origen: { tipo: "recalculado", detalle: "Section 30(1)(b): one week. 10,000 / 4.333 = 2,307.87." },
    fecha: "2026-10-27",
    entrada: { antiguedad: "up-to-1-year", salario: 10000, dias: 5 },
    esperado: { preaviso: "1 week", pago: 2307.87 },
  },
  {
    nombre: "Three weeks in the job",
    origen: { tipo: "recalculado", detalle: "Section 30(1)(a): one day. 10,000 / (4.333 × 5) = 461.57." },
    fecha: "2026-10-27",
    entrada: { antiguedad: "up-to-4-weeks", salario: 10000, dias: 5 },
    esperado: { preaviso: "1 day", pago: 461.57 },
  },
]);
