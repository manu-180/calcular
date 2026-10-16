import { definirCasos } from "@/motor/calculo";
import calculadora from "./retirement-pay";

export default definirCasos(calculadora, [
  {
    nombre: "20 years, daily rate ₱1,000, 13th month ₱26,000",
    origen: {
      tipo: "recalculado",
      detalle: "RA 7641: one-half month = 15 days (15,000) + 1/12 of 13th month (2,166.67) + 5 days SIL (5,000) = 22,166.67. Times 20 years = 443,333.40.",
    },
    fecha: "2026-10-16",
    entrada: { diario: 1000, trece: 26000, anios: 20, meses: 0, edad: 60, pequena: false },
    esperado: { mediaMes: 22166.67, total: 443333.4, anios: 20, elegible: "Yes" },
  },
  {
    nombre: "Six extra months count as a full year",
    origen: { tipo: "recalculado", detalle: "10 years and 6 months count as 11 years: 22,166.67 × 11 = 243,833.37." },
    fecha: "2026-10-16",
    entrada: { diario: 1000, trece: 26000, anios: 10, meses: 6, edad: 62, pequena: false },
    esperado: { anios: 11, total: 243833.37 },
  },
  {
    nombre: "Five extra months do not count",
    origen: { tipo: "recalculado", detalle: "10 years and 5 months count as 10 years." },
    fecha: "2026-10-16",
    entrada: { diario: 1000, trece: 26000, anios: 10, meses: 5, edad: 62, pequena: false },
    esperado: { anios: 10 },
  },
  {
    nombre: "Less than five years of service",
    origen: { tipo: "recalculado", detalle: "RA 7641 requires at least 5 years in the establishment." },
    fecha: "2026-10-16",
    entrada: { diario: 800, trece: 20800, anios: 4, meses: 0, edad: 61, pequena: false },
    esperado: { elegible: "No, you need 5 years in the company" },
  },
  {
    nombre: "Small retail employer is exempt",
    origen: { tipo: "recalculado", detalle: "Retail, service and agricultural establishments with 10 workers or fewer are exempt." },
    fecha: "2026-10-16",
    entrada: { diario: 800, trece: 20800, anios: 15, meses: 0, edad: 60, pequena: true },
    esperado: { elegible: "No, your employer is exempt" },
  },
  {
    nombre: "No daily rate",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { diario: 0, trece: 0, anios: 10, meses: 0, edad: 60, pequena: false },
    esperaError: true,
  },
]);
