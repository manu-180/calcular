import { definirCasos } from "@/motor/calculo";
import calculadora from "./nssf-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Ushs 1,500,000 a month",
    origen: { tipo: "recalculado", detalle: "5% = 75,000; 10% = 150,000; total 225,000 a month, 2,700,000 a year." },
    fecha: "2026-10-24",
    entrada: { bruto: 1500000, anios: 1 },
    esperado: { tuyo: 75000, empleador: 150000, total: 225000, anual: 2700000 },
  },
  {
    nombre: "Ten years on Ushs 800,000",
    origen: { tipo: "recalculado", detalle: "15% of 800,000 = 120,000 a month; × 12 × 10 = 14,400,000." },
    fecha: "2026-10-24",
    entrada: { bruto: 800000, anios: 10 },
    esperado: { acumulado: 14400000 },
  },
]);
