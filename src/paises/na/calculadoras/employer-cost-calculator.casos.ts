import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "N$15,000 basic with the VET levy",
    origen: {
      tipo: "recalculado",
      detalle: "SSC 0.9% × 12,500 = 112.50. VET levy 1% × 15,000 = 150. Total 15,000 + 112.50 + 150 = 15,262.50.",
    },
    fecha: "2026-10-27",
    entrada: { basico: 15000, asignaciones: 0, pension: 0, vet: true },
    esperado: { total: 15262.5, ssc: 112.5, vet: 150 },
  },
  {
    nombre: "Small employer, N$8,000 basic, N$1,000 allowances and N$600 pension",
    origen: { tipo: "recalculado", detalle: "SSC 0.9% × 8,000 = 72. No VET levy. Total 9,000 + 72 + 600 = 9,672." },
    fecha: "2026-10-27",
    entrada: { basico: 8000, asignaciones: 1000, pension: 600, vet: false },
    esperado: { total: 9672, ssc: 72, vet: 0, anual: 116064 },
  },
]);
