import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Six weeks off at K50,000 a week",
    origen: { tipo: "recalculado", detalle: "Employment Act s. 46: 4 weeks × 50,000 + 2 weeks × 25,000 = 250,000." },
    fecha: "2026-10-27",
    entrada: { meses: 24, semanas: 6, semanal: 50000 },
    esperado: { pago: 250000, completas: 4, medias: 2, sinPago: 0 },
  },
  {
    nombre: "Fourteen weeks off",
    origen: { tipo: "recalculado", detalle: "4 weeks full, 8 weeks half, 2 weeks beyond: 4 × 40,000 + 8 × 20,000 = 320,000." },
    fecha: "2026-10-27",
    entrada: { meses: 36, semanas: 14, semanal: 40000 },
    esperado: { pago: 320000, completas: 4, medias: 8, sinPago: 2 },
  },
  {
    nombre: "Less than twelve months of service",
    origen: { tipo: "recalculado", detalle: "s. 46(1) applies after twelve months of continuous service." },
    fecha: "2026-10-27",
    entrada: { meses: 8, semanas: 2, semanal: 40000 },
    esperado: { pago: 0, sinPago: 2 },
  },
  {
    nombre: "Zero weeks is rejected",
    origen: { tipo: "recalculado", detalle: "Enter at least some sick leave." },
    fecha: "2026-10-27",
    entrada: { meses: 24, semanas: 0, semanal: 40000 },
    esperaError: true,
  },
]);
