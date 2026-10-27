import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

export default definirCasos(calculadora, [
  {
    nombre: "Three years of service, no notice given",
    origen: { tipo: "recalculado", detalle: "Labour Law art. 49: after the second year, two months. Compensation 9,000 ÷ 30 × 60 = 18,000." },
    fecha: "2026-10-26",
    entrada: { anios: 3, basico: 9000, trabajados: 0 },
    esperado: { meses: 2, faltan: 60, compensacion: 18000 },
  },
  {
    nombre: "Exactly two years counts as the first two years",
    origen: { tipo: "recalculado", detalle: "During the first and second year: one month. 10 days worked: 20 missing × 6,000 ÷ 30 = 4,000." },
    fecha: "2026-10-26",
    entrada: { anios: 2, basico: 6000, trabajados: 10 },
    esperado: { meses: 1, faltan: 20, compensacion: 4000 },
  },
  {
    nombre: "Full notice worked",
    origen: { tipo: "recalculado", detalle: "One year, 30 days worked: nothing owed." },
    fecha: "2026-10-26",
    entrada: { anios: 1, basico: 6000, trabajados: 30 },
    esperado: { compensacion: 0 },
  },
]);
