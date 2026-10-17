import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave";

export default definirCasos(calculadora, [
  {
    nombre: "First year of sick leave",
    origen: { tipo: "recalculado", detalle: "10 days, nothing carried over. 3 days at $200 = 600. 7 left." },
    fecha: "2026-10-14",
    entrada: { meses: 12, arrastre: 0, dias: 3, pagoDiario: 200 },
    esperado: { disponibles: 10, pagados: 3, sinPago: 0, pago: 600, restante: 7 },
  },
  {
    nombre: "Balance capped at 20 days",
    origen: { tipo: "recalculado", detalle: "15 carried over + 10 = 25, capped at 20. 22 days needed: 20 paid, 2 unpaid. 20 × 180 = 3,600." },
    fecha: "2026-10-14",
    entrada: { meses: 30, arrastre: 15, dias: 22, pagoDiario: 180 },
    esperado: { disponibles: 20, pagados: 20, sinPago: 2, pago: 3600, restante: 0 },
  },
  {
    nombre: "Less than 6 months",
    origen: { tipo: "recalculado", detalle: "4 months: not yet entitled to sick leave under the 6-month rule." },
    fecha: "2026-10-14",
    entrada: { meses: 4, arrastre: 0, dias: 2, pagoDiario: 200 },
    esperado: { disponibles: 0, pagados: 0, sinPago: 2, pago: 0 },
  },
  {
    nombre: "Balance over 20 days",
    origen: { tipo: "recalculado", detalle: "A carried-over balance of 25 days is not possible." },
    fecha: "2026-10-14",
    entrada: { meses: 30, arrastre: 25, dias: 1, pagoDiario: 200 },
    esperaError: true,
  },
]);
