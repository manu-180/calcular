import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

const PUA = "https://gajiminimum.mohr.gov.my/wp-content/uploads/PUA%20376.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "RM1,500 a month is below the minimum",
    origen: { tipo: "oficial", url: PUA, detalle: "Minimum Wages Order 2024, paragraph 5: RM1,700 a month from 1 August 2025. Shortfall 1,700 − 1,500 = 200." },
    fecha: "2026-10-16",
    entrada: { base: "monthly", dias: "5", pago: 1500 },
    esperado: { minimo: 1700, falta: 200, diario: 78.46, hora: 8.72, cumple: "Below the minimum wage" },
  },
  {
    nombre: "RM70 a day, 6 days a week",
    origen: { tipo: "oficial", url: PUA, detalle: "Daily rate for 6 working days a week: RM65.38." },
    fecha: "2026-10-16",
    entrada: { base: "daily", dias: "6", pago: 70 },
    esperado: { minimo: 65.38, falta: 0, cumple: "At or above the minimum wage" },
  },
  {
    nombre: "RM8 an hour",
    origen: { tipo: "oficial", url: PUA, detalle: "Hourly rate RM8.72. Shortfall 0.72." },
    fecha: "2026-10-16",
    entrada: { base: "hourly", dias: "4", pago: 8 },
    esperado: { minimo: 8.72, falta: 0.72, diario: 98.08 },
  },
  {
    nombre: "Zero pay",
    origen: { tipo: "recalculado", detalle: "A pay of 0 is not a valid input." },
    fecha: "2026-10-16",
    entrada: { base: "monthly", dias: "5", pago: 0 },
    esperaError: true,
  },
]);
