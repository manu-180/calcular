import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₦500,000 gross, ₦450,000 pensionable",
    origen: { tipo: "recalculado", detalle: "Pension 10% × 450,000 = 45,000; NSITF 1% × 500,000 = 5,000. Cost 550,000 a month, 6,600,000 a year." },
    fecha: "2026-10-16",
    entrada: { bruto: 500000, pensionable: 450000, empleados: 1 },
    esperado: { costo: 550000, pension: 45000, nsitf: 5000, anual: 6600000, porcentajeExtra: 10 },
  },
  {
    nombre: "Ten employees on the minimum wage",
    origen: { tipo: "recalculado", detalle: "70,000 + 7,000 + 700 = 77,700 each; × 12 × 10 = 9,324,000." },
    fecha: "2026-10-16",
    entrada: { bruto: 70000, pensionable: 70000, empleados: 10 },
    esperado: { costo: 77700, anual: 9324000 },
  },
]);
