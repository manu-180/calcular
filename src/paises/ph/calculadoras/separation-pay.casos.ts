import { definirCasos } from "@/motor/calculo";
import calculadora from "./separation-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Redundancy after 5 years",
    origen: { tipo: "recalculado", detalle: "One month per year: 25,000 × 5 = 125,000." },
    fecha: "2026-10-16",
    entrada: { mensual: 25000, causa: "redundancy", anios: 5, meses: 0 },
    esperado: { total: 125000, anios: 5 },
  },
  {
    nombre: "Retrenchment after 7 years and 8 months",
    origen: { tipo: "recalculado", detalle: "8 months count as a year: 8 years × half a month = 4 months, 25,000 × 4 = 100,000." },
    fecha: "2026-10-16",
    entrada: { mensual: 25000, causa: "retrenchment", anios: 7, meses: 8 },
    esperado: { total: 100000, anios: 8, mesesPorAnio: 0.5 },
  },
  {
    nombre: "Retrenchment after 1 year gets the one-month minimum",
    origen: { tipo: "recalculado", detalle: "Half a month × 1 year = 12,500, but the minimum is one month: 25,000." },
    fecha: "2026-10-16",
    entrada: { mensual: 25000, causa: "retrenchment", anios: 1, meses: 0 },
    esperado: { total: 25000, porServicio: 12500 },
  },
  {
    nombre: "Five extra months do not count",
    origen: { tipo: "recalculado", detalle: "3 years and 5 months count as 3 years: 3 × 20,000 = 60,000." },
    fecha: "2026-10-16",
    entrada: { mensual: 20000, causa: "redundancy", anios: 3, meses: 5 },
    esperado: { total: 60000, anios: 3 },
  },
  {
    nombre: "No pay entered",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { mensual: 0, causa: "redundancy", anios: 3, meses: 0 },
    esperaError: true,
  },
]);
