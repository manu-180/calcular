import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Leave from 2 November 2026 on K300,000 a month",
    origen: { tipo: "recalculado", detalle: "Employment Act s. 47(1): eight weeks (56 days), last day 27 December 2026. Pay 300,000 × 12 × 8 / 52 = 553,846.15." },
    fecha: "2026-10-27",
    entrada: { inicio: "2026-11-02", mensual: 300000, reciente: false },
    esperado: { semanas: 8, ultimo: "2026-12-27", regreso: "2026-12-28", pago: 553846.15 },
  },
  {
    nombre: "Without pay entered",
    origen: { tipo: "recalculado", detalle: "Dates only: 56 days from 1 March 2027." },
    fecha: "2026-10-27",
    entrada: { inicio: "2027-03-01", mensual: null, reciente: true },
    esperado: { ultimo: "2027-04-25", regreso: "2027-04-26" },
  },
]);
