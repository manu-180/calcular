import { definirCasos } from "@/motor/calculo";
import calculadora from "./redundancy-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Five years on KSh 60,000 without notice",
    origen: {
      tipo: "recalculado",
      url: "https://new.kenyalaw.org/akn/ke/act/2007/11/eng@2024-04-26",
      detalle: "A day's pay 60,000 / 30 = 2,000. Severance 2,000 × 15 × 5 = 150,000. One month in lieu of notice 60,000. Total 210,000.",
    },
    fecha: "2026-10-17",
    entrada: { sueldo: 60000, anios: 5, diasLicencia: 0, divisor: "30", conPreaviso: false },
    esperado: { total: 210000, severance: 150000, preaviso: 60000, diario: 2000 },
  },
  {
    nombre: "Three years with notice and 10 leave days due",
    origen: { tipo: "recalculado", detalle: "52,000 / 26 = 2,000. Severance 2,000 × 15 × 3 = 90,000. Leave 10 × 2,000 = 20,000. Total 110,000." },
    fecha: "2026-10-17",
    entrada: { sueldo: 52000, anios: 3, diasLicencia: 10, divisor: "26", conPreaviso: true },
    esperado: { total: 110000, severance: 90000, licencia: 20000, preaviso: 0 },
  },
  {
    nombre: "Less than a year of service",
    origen: { tipo: "recalculado", detalle: "No completed year, so no severance. Only the month in lieu of notice." },
    fecha: "2026-10-17",
    entrada: { sueldo: 40000, anios: 0, diasLicencia: 0, divisor: "30", conPreaviso: false },
    esperado: { total: 40000, severance: 0 },
  },
]);
