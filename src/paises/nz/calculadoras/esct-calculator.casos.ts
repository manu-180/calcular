import { definirCasos } from "@/motor/calculo";
import calculadora from "./esct-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "$70,000 at the compulsory 3.5%",
    origen: { tipo: "recalculado", detalle: "Contribution 70,000 × 3.5% = 2,450. Base 72,450 falls in 64,201 to 93,720: 30%. ESCT 735, net 1,715." },
    fecha: "2026-10-14",
    entrada: { salario: 70000, aporte: 0 },
    esperado: { aporte: 2450, base: 72450, tasa: 30, esct: 735, neto: 1715 },
  },
  {
    nombre: "Boundary at $18,720",
    origen: { tipo: "recalculado", detalle: "18,000 + 720 = 18,720, still 10.5%. ESCT 75.60, net 644.40." },
    fecha: "2026-10-14",
    entrada: { salario: 18000, aporte: 720 },
    esperado: { tasa: 10.5, esct: 75.6, neto: 644.4 },
  },
  {
    nombre: "Over $216,000",
    origen: { tipo: "recalculado", detalle: "220,000 + 7,700 = 227,700: 39%. ESCT 3,003, net 4,697." },
    fecha: "2026-10-14",
    entrada: { salario: 220000, aporte: 0 },
    esperado: { tasa: 39, esct: 3003, neto: 4697 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "Salary of 0 is not valid." },
    fecha: "2026-10-14",
    entrada: { salario: 0, aporte: 0 },
    esperaError: true,
  },
]);
