import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "€500 a week, 8 hours of overtime",
    origen: { tipo: "recalculado", detalle: "DIER: one and a half times the normal rate above 40 hours. 500 / 40 = 12.50; × 1.5 = 18.75; × 8 = 150." },
    fecha: "2026-10-26",
    entrada: { modo: "semanal", semanal: 500, tarifa: null, horas: 8 },
    esperado: { pago: 150, tarifaExtra: 18.75, tarifaNormal: 12.5, adicional: 50 },
  },
  {
    nombre: "Minimum wage, 5 hours of overtime",
    origen: { tipo: "recalculado", detalle: "229.44 / 40 = 5.736; × 1.5 = 8.604 → 8.60; × 5 = 43.00." },
    fecha: "2026-10-26",
    entrada: { modo: "semanal", semanal: 229.44, tarifa: null, horas: 5 },
    esperado: { tarifaExtra: 8.6, pago: 43 },
  },
  {
    nombre: "€10 an hour, 3.5 hours",
    origen: { tipo: "recalculado", detalle: "10 × 1.5 = 15; × 3.5 = 52.50." },
    fecha: "2026-10-26",
    entrada: { modo: "hora", semanal: null, tarifa: 10, horas: 3.5 },
    esperado: { pago: 52.5 },
  },
  { nombre: "No hours", origen: { tipo: "recalculado", detalle: "Hours must be above zero." }, fecha: "2026-10-26", entrada: { modo: "hora", semanal: null, tarifa: 10, horas: 0 }, esperaError: true },
]);
