import { definirCasos } from "@/motor/calculo";
import calculadora from "./nhf-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₦250,000 basic for 5 years",
    origen: { tipo: "recalculado", detalle: "2.5% × 250,000 = 6,250 a month; 75,000 a year; 375,000 in 5 years." },
    fecha: "2026-10-16",
    entrada: { basico: 250000, anios: 5 },
    esperado: { mensual: 6250, anual: 75000, total: 375000 },
  },
  {
    nombre: "Minimum wage as basic",
    origen: { tipo: "recalculado", detalle: "2.5% × 70,000 = 1,750 a month." },
    fecha: "2026-10-16",
    entrada: { basico: 70000, anios: 1 },
    esperado: { mensual: 1750, anual: 21000 },
  },
]);
