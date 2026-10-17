import { definirCasos } from "@/motor/calculo";
import calculadora from "./kvp-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹1 lakh doubles in 115 months",
    origen: { tipo: "recalculado", detalle: "KVP doubles in 115 months: 2,00,000. 2^(12 / 115) − 1 = 7.50% a year." },
    fecha: "2026-10-15",
    entrada: { monto: 100000 },
    esperado: { madurez: 200000, interes: 100000, meses: 115, anios: 9, mesesExtra: 7, equivalente: 7.5008 },
    tolerancia: 0.001,
  },
  {
    nombre: "₹50,000",
    origen: { tipo: "recalculado", detalle: "50,000 × 2 = 1,00,000." },
    fecha: "2026-10-15",
    entrada: { monto: 50000 },
    esperado: { madurez: 100000 },
  },
]);
