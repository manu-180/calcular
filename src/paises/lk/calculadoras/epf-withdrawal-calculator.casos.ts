import { definirCasos } from "@/motor/calculo";
import calculadora from "./epf-withdrawal-calculator";

const CBSL = {
  tipo: "oficial",
  url: "https://www.cbsl.gov.lk/en/employees-provident-fund",
} as const;

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 3,000,000 balance after 12 years",
    origen: { ...CBSL, detalle: "More than 10 years and more than Rs. 300,000: up to 30% = 900,000." },
    fecha: "2026-10-26",
    entrada: { saldo: 3000000, anios: 12 },
    esperado: { retiro: 900000, queda: 2100000 },
  },
  {
    nombre: "Rs. 10,000,000 balance, capped",
    origen: { ...CBSL, detalle: "30% would be 3,000,000; the maximum is Rs. 2,000,000." },
    fecha: "2026-10-26",
    entrada: { saldo: 10000000, anios: 25 },
    esperado: { retiro: 2000000, parte: 3000000 },
  },
  {
    nombre: "Exactly 10 years of service",
    origen: { ...CBSL, detalle: "Service has to be more than 10 years: nothing yet." },
    fecha: "2026-10-26",
    entrada: { saldo: 3000000, anios: 10 },
    esperado: { retiro: 0 },
  },
  {
    nombre: "Balance of Rs. 250,000",
    origen: { ...CBSL, detalle: "The balance has to be more than Rs. 300,000: nothing." },
    fecha: "2026-10-26",
    entrada: { saldo: 250000, anios: 15 },
    esperado: { retiro: 0 },
  },
]);
