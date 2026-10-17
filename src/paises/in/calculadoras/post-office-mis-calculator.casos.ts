import { definirCasos } from "@/motor/calculo";
import calculadora from "./post-office-mis-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹9 lakh at 7.4%",
    origen: { tipo: "recalculado", detalle: "9,00,000 × 7.4% / 12 = 5,550 a month; 66,600 a year." },
    fecha: "2026-10-15",
    entrada: { monto: 900000 },
    esperado: { mensual: 5550, anual: 66600, tasa: 7.4 },
  },
  {
    nombre: "₹15 lakh",
    origen: { tipo: "recalculado", detalle: "15,00,000 × 7.4% / 12 = 9,250 a month." },
    fecha: "2026-10-15",
    entrada: { monto: 1500000 },
    esperado: { mensual: 9250 },
  },
]);
