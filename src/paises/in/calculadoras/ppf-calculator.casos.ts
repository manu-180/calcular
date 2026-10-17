import { definirCasos } from "@/motor/calculo";
import calculadora from "./ppf-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹1.5 lakh a year for 15 years at 7.1%",
    origen: { tipo: "recalculado", detalle: "Each year (balance + 1,50,000) × 1.071. After 15 years: 40,68,209.22, of which 18,18,209.22 is interest." },
    fecha: "2026-10-15",
    entrada: { aporte: 150000, anios: "15" },
    esperado: { madurez: 4068209.22, invertido: 2250000, interes: 1818209.22, tasa: 7.1 },
  },
  {
    nombre: "₹12,000 a year for 15 years",
    origen: { tipo: "recalculado", detalle: "Same rule with 12,000 a year: 3,25,456.74." },
    fecha: "2026-10-15",
    entrada: { aporte: 12000, anios: "15" },
    esperado: { madurez: 325456.74 },
  },
  {
    nombre: "One extension to 20 years",
    origen: { tipo: "recalculado", detalle: "20 years of 1,50,000 at 7.1%: 66,58,288.17." },
    fecha: "2026-10-15",
    entrada: { aporte: 150000, anios: "20" },
    esperado: { madurez: 6658288.17 },
  },
  {
    nombre: "Deposit above the limit",
    origen: { tipo: "recalculado", detalle: "2,00,000 is more than 1,50,000 a year." },
    fecha: "2026-10-15",
    entrada: { aporte: 200000, anios: "15" },
    esperaError: true,
  },
]);
