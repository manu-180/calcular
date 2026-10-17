import { definirCasos } from "@/motor/calculo";
import calculadora from "./scss-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹15 lakh at 8.2%",
    origen: { tipo: "recalculado", detalle: "15,00,000 × 8.2% / 4 = 30,750 a quarter; 1,23,000 a year; 6,15,000 over 5 years." },
    fecha: "2026-10-15",
    entrada: { monto: 1500000 },
    esperado: { trimestral: 30750, anual: 123000, mensual: 10250, total: 615000 },
  },
  {
    nombre: "₹30 lakh",
    origen: { tipo: "recalculado", detalle: "30,00,000 × 8.2% / 4 = 61,500 a quarter." },
    fecha: "2026-10-15",
    entrada: { monto: 3000000 },
    esperado: { trimestral: 61500, total: 1230000 },
  },
]);
