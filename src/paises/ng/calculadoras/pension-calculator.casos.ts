import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₦450,000 of monthly emoluments",
    origen: { tipo: "recalculado", detalle: "8% × 450,000 = 36,000; 10% × 450,000 = 45,000; total 81,000 a month, 972,000 a year." },
    fecha: "2026-10-16",
    entrada: { basico: 250000, vivienda: 125000, transporte: 75000 },
    esperado: { tuyo: 36000, empleador: 45000, total: 81000, anual: 972000 },
  },
  {
    nombre: "Basic only",
    origen: { tipo: "recalculado", detalle: "100,000 basic: 8,000 + 10,000 = 18,000." },
    fecha: "2026-10-16",
    entrada: { basico: 100000, vivienda: 0, transporte: 0 },
    esperado: { total: 18000 },
  },
]);
