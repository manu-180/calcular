import { definirCasos } from "@/motor/calculo";
import calculadora from "./vet-levy-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Payroll of N$2,400,000",
    origen: { tipo: "recalculado", detalle: "NTA: 1% of payroll. 24,000 a year, 2,000 a month." },
    fecha: "2026-10-27",
    entrada: { nomina: 2400000 },
    esperado: { anual: 24000, mensual: 2000 },
  },
  {
    nombre: "Payroll exactly at the threshold",
    origen: { tipo: "recalculado", detalle: "N$1,000,000 or more pays: 10,000 a year." },
    fecha: "2026-10-27",
    entrada: { nomina: 1000000 },
    esperado: { anual: 10000 },
  },
  {
    nombre: "Payroll below the threshold",
    origen: { tipo: "recalculado", detalle: "Below N$1,000,000: no levy." },
    fecha: "2026-10-27",
    entrada: { nomina: 900000 },
    esperado: { anual: 0, mensual: 0 },
  },
]);
