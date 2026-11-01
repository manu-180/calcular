import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "FJ$10,000 royalty to a non-resident",
    origen: { tipo: "recalculado", url: "https://frcs.org.fj/tax-rates-and-codes", detalle: "15% × 10,000 = 1,500. Paid out 8,500." },
    fecha: "2026-10-29",
    entrada: { monto: 10000, tipo: "nr-royalty-fees" },
    esperado: { retencion: 1500, neto: 8500, tasa: 15 },
  },
  {
    nombre: "FJ$2,000 of interest to a resident",
    origen: { tipo: "recalculado", detalle: "10% × 2,000 = 200." },
    fecha: "2026-10-29",
    entrada: { monto: 2000, tipo: "resident-interest" },
    esperado: { retencion: 200, neto: 1800 },
  },
  {
    nombre: "FJ$50,000 insurance premium to a non-resident",
    origen: { tipo: "recalculado", detalle: "3% × 50,000 = 1,500." },
    fecha: "2026-10-29",
    entrada: { monto: 50000, tipo: "nr-insurance" },
    esperado: { retencion: 1500, neto: 48500 },
  },
  {
    nombre: "FJ$7,500 of interest to a non-resident",
    origen: { tipo: "recalculado", detalle: "10% × 7,500 = 750." },
    fecha: "2026-10-29",
    entrada: { monto: 7500, tipo: "nr-interest" },
    esperado: { retencion: 750, neto: 6750 },
  },
  { nombre: "Zero payment is rejected", origen: { tipo: "recalculado", detalle: "Amount must be above zero." }, fecha: "2026-10-29", entrada: { monto: 0, tipo: "resident-interest" }, esperaError: true },
]);
