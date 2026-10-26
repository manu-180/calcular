import { definirCasos } from "@/motor/calculo";
import calculadora from "./dps-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "5,000 al mes por 5 años al 9 %",
    origen: { tipo: "recalculado", detalle: "r = 0.75 % mensual, 60 cuotas al inicio de mes: 5,000 × ((1.0075^60 − 1) / 0.0075) × 1.0075 = 3,79,949.09; interés 79,949.09." },
    fecha: "2026-10-24",
    entrada: { cuota: 5000, tasa: 9, anios: 5, retencion: false },
    esperado: { depositado: 300000, interes: 79949.09, impuesto: 0, total: 379949.09 },
  },
  {
    nombre: "Con retención del 10 %",
    origen: { tipo: "recalculado", detalle: "Interés 79,949.09 × 10 % = 7,994.91; total 3,71,954.18." },
    fecha: "2026-10-24",
    entrada: { cuota: 5000, tasa: 9, anios: 5, retencion: true },
    esperado: { impuesto: 7994.91, total: 371954.18 },
  },
  {
    nombre: "1,000 al mes por un año al 6 %",
    origen: { tipo: "recalculado", detalle: "1,000 × ((1.005^12 − 1) / 0.005) × 1.005 = 12,397.24." },
    fecha: "2026-10-24",
    entrada: { cuota: 1000, tasa: 6, anios: 1, retencion: false },
    esperado: { interes: 397.24, total: 12397.24 },
  },
]);
