import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Full year with 5 days taken",
    origen: { tipo: "recalculado", url: "https://new.kenyalaw.org/akn/ke/act/2007/11/eng@2024-04-26", detalle: "21 − 5 = 16 days. 52,000 / 26 × 16 = 32,000." },
    fecha: "2026-10-17",
    entrada: { meses: 12, tomados: 5, sueldo: 52000, divisor: "26" },
    esperado: { pendientes: 16, ganados: 21, valor: 32000 },
  },
  {
    nombre: "Leaving after 8 months",
    origen: { tipo: "recalculado", detalle: "8 × 1.75 = 14 days." },
    fecha: "2026-10-17",
    entrada: { meses: 8, tomados: 0, sueldo: null, divisor: "26" },
    esperado: { pendientes: 14, valor: null },
  },
  {
    nombre: "One month of service",
    origen: { tipo: "recalculado", detalle: "Pro rata leave needs two completed months." },
    fecha: "2026-10-17",
    entrada: { meses: 1, tomados: 0, sueldo: null, divisor: "26" },
    esperado: { pendientes: 0 },
  },
]);
