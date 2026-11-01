import { definirCasos } from "@/motor/calculo";
import calculadora from "./turnover-tax-calculator";

const IRD = "https://ird.gov.np/content/13609/tax-rate-for-natural-persons-for-the/" as const;

export default definirCasos(calculadora, [
  {
    nombre: "NPR 40 lakh of goods in a metropolitan city",
    origen: { tipo: "recalculado", url: IRD, detalle: "Fixed 7,500. 1% × (4,000,000 − 3,000,000) = 10,000. Total 17,500." },
    fecha: "2026-10-29",
    entrada: { ventas: 4000000, zona: "metro", actividad: "goods" },
    esperado: { total: 17500, fijo: 7500, tramo1: 10000, tramo2: 0 },
  },
  {
    nombre: "NPR 70 lakh of services outside the cities",
    origen: { tipo: "recalculado", url: IRD, detalle: "Fixed 2,500. 2% × 2,000,000 = 40,000. 2% × 2,000,000 = 40,000. Total 82,500." },
    fecha: "2026-10-29",
    entrada: { ventas: 7000000, zona: "other", actividad: "services" },
    esperado: { total: 82500, tramo1: 40000, tramo2: 40000 },
  },
  {
    nombre: "NPR 70 lakh of gas and cigarettes in a municipality",
    origen: { tipo: "recalculado", url: IRD, detalle: "Fixed 4,000. 0.25% × 2,000,000 = 5,000. 0.3% × 2,000,000 = 6,000. Total 15,000." },
    fecha: "2026-10-29",
    entrada: { ventas: 7000000, zona: "municipality", actividad: "fuel" },
    esperado: { total: 15000 },
  },
  {
    nombre: "NPR 20 lakh pays the fixed amount",
    origen: { tipo: "recalculado", url: IRD, detalle: "Up to 30 lakh only the fixed amount applies: 4,000 in a municipality." },
    fecha: "2026-10-29",
    entrada: { ventas: 2000000, zona: "municipality", actividad: "goods" },
    esperado: { total: 4000, tramo1: 0 },
  },
  {
    nombre: "More than NPR 1 crore",
    origen: { tipo: "recalculado", detalle: "Above the limit the turnover tax does not apply." },
    fecha: "2026-10-29",
    entrada: { ventas: 12000000, zona: "metro", actividad: "goods" },
    esperaError: true,
  },
]);
