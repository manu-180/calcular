import { definirCasos } from "@/motor/calculo";
import calculadora from "./job-security-benefit";

export default definirCasos(calculadora, [
  {
    nombre: "Promedio 700 por 6 meses",
    origen: { tipo: "recalculado", detalle: "60 % de 700 = 420 × 6 = 2.520." },
    fecha: "2026-10-26",
    entrada: { promedio: 700, meses: 6 },
    esperado: { mensual: 420, meses: 6, total: 2520 },
  },
  {
    nombre: "Mínimo de 115",
    origen: { tipo: "recalculado", detalle: "60 % de 150 = 90 < 115: se paga 115 × 3 = 345." },
    fecha: "2026-10-26",
    entrada: { promedio: 150, meses: 3 },
    esperado: { mensual: 115, total: 345 },
  },
  {
    nombre: "Más de seis meses",
    origen: { tipo: "recalculado", detalle: "Tope de 6 meses: 420 × 6 = 2.520." },
    fecha: "2026-10-26",
    entrada: { promedio: 700, meses: 9 },
    esperado: { meses: 6, total: 2520 },
  },
]);
