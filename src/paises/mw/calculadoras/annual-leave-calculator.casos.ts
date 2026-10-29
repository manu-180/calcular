import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Full year on a five-day week",
    origen: { tipo: "recalculado", detalle: "Employment Act s. 44(1)(b): 15 working days." },
    fecha: "2026-10-27",
    entrada: { semana: "5", meses: 12, diario: null },
    esperado: { dias: 15, completo: 15 },
  },
  {
    nombre: "Full year on a six-day week with K8,000 a day",
    origen: { tipo: "recalculado", detalle: "s. 44(1)(a): 18 working days × 8,000 = 144,000." },
    fecha: "2026-10-27",
    entrada: { semana: "6", meses: 12, diario: 8000 },
    esperado: { dias: 18, pago: 144000 },
  },
  {
    nombre: "Seven months on a five-day week",
    origen: { tipo: "recalculado", detalle: "s. 44(2), proportionate: 15 × 7 / 12 = 8.75 days; × 10,000 = 87,500." },
    fecha: "2026-10-27",
    entrada: { semana: "5", meses: 7, diario: 10000 },
    esperado: { dias: 8.75, pago: 87500 },
  },
  {
    nombre: "Thirteen months is rejected",
    origen: { tipo: "recalculado", detalle: "A leave year has 12 months." },
    fecha: "2026-10-27",
    entrada: { semana: "5", meses: 13, diario: null },
    esperaError: true,
  },
]);
