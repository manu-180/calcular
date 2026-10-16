import { definirCasos } from "@/motor/calculo";
import calculadora from "./sukanya-samriddhi-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹1.5 lakh a year at 8.2%",
    origen: {
      tipo: "recalculado",
      detalle: "Deposits for 15 years, interest at 8.2% credited each year and rounded to the rupee, no deposits from year 16 to 21. Maturity 71,82,127.",
    },
    fecha: "2026-10-15",
    entrada: { aporte: 150000, edad: 1 },
    esperado: { madurez: 7182127, invertido: 2250000, interes: 4932127, edadMadurez: 22 },
  },
  {
    nombre: "₹1,000 a month (₹12,000 a year)",
    origen: { tipo: "recalculado", detalle: "Same rule with 12,000 a year: 5,74,568." },
    fecha: "2026-10-15",
    entrada: { aporte: 12000, edad: 5 },
    esperado: { madurez: 574568 },
  },
  {
    nombre: "Minimum deposit of ₹250",
    origen: { tipo: "recalculado", detalle: "250 a year for 15 years grows to 11,977 after 21 years." },
    fecha: "2026-10-15",
    entrada: { aporte: 250, edad: 0 },
    esperado: { madurez: 11977 },
  },
  {
    nombre: "Below the minimum",
    origen: { tipo: "recalculado", detalle: "200 is less than the 250 minimum." },
    fecha: "2026-10-15",
    entrada: { aporte: 200, edad: 0 },
    esperaError: true,
  },
]);
