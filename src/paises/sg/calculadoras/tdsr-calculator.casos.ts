import { definirCasos } from "@/motor/calculo";
import calculadora from "./tdsr-calculator";

const MAS = "https://www.mas.gov.sg/regulation/explainers/tdsr-for-property-loans/calculating-tdsr";

export default definirCasos(calculadora, [
  {
    nombre: "Private home, $8,000 income, 30 years",
    origen: { tipo: "recalculado", url: MAS, detalle: "55% × 8,000 = 4,400 a month. Tested at the 4% floor over 360 months: 4,400 × (1 − 1.003333^−360) / 0.003333 = 921,629.46." },
    fecha: "2026-10-15",
    entrada: { fijo: 8000, variable: 0, alquiler: 0, deudasPropiedad: 0, deudasOtras: 0, tipo: "privado", tasa: 3, plazo: 30 },
    esperado: { cuota: 4400, prestamo: 921629.46, tasaUsada: 4 },
    tolerancia: 0.01,
  },
  {
    nombre: "HDB flat: the 30% MSR applies",
    origen: { tipo: "recalculado", url: MAS, detalle: "MSR 30% × 8,000 = 2,400, lower than TDSR 4,400. At 4% over 300 months: 454,685.96." },
    fecha: "2026-10-15",
    entrada: { fijo: 8000, variable: 0, alquiler: 0, deudasPropiedad: 0, deudasOtras: 0, tipo: "hdb", tasa: 2.6, plazo: 25 },
    esperado: { cuota: 2400, prestamo: 454685.96 },
    tolerancia: 0.01,
  },
  {
    nombre: "Non-residential with variable income",
    origen: { tipo: "recalculado", url: MAS, detalle: "Income 8,000 + 70% × 2,000 = 9,400. 55% = 5,170. Tested at the 5% floor over 300 months: 884,380.44." },
    fecha: "2026-10-15",
    entrada: { fijo: 8000, variable: 2000, alquiler: 0, deudasPropiedad: 0, deudasOtras: 0, tipo: "no-residencial", tasa: 4, plazo: 25 },
    esperado: { ingreso: 9400, cuota: 5170, prestamo: 884380.44, tasaUsada: 5 },
    tolerancia: 0.01,
  },
  {
    nombre: "Offer rate above the floor and a car loan",
    origen: { tipo: "recalculado", url: MAS, detalle: "4,400 − 500 = 3,900. Tested at 4.5% (higher than the 4% floor) over 300 months: 701,650.26." },
    fecha: "2026-10-15",
    entrada: { fijo: 8000, variable: 0, alquiler: 0, deudasPropiedad: 0, deudasOtras: 500, tipo: "privado", tasa: 4.5, plazo: 25 },
    esperado: { cuota: 3900, prestamo: 701650.26, tasaUsada: 4.5 },
    tolerancia: 0.01,
  },
  {
    nombre: "HDB tenure above 30 years",
    origen: { tipo: "oficial", url: "https://www.mas.gov.sg/regulation/explainers/new-housing-loans", detalle: "Loan tenure: 30 years for HDB flats." },
    fecha: "2026-10-15",
    entrada: { fijo: 8000, variable: 0, alquiler: 0, deudasPropiedad: 0, deudasOtras: 0, tipo: "hdb", tasa: 3, plazo: 32 },
    esperaError: true,
  },
]);
