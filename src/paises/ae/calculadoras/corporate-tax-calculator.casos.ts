import { definirCasos } from "@/motor/calculo";
import calculadora from "./corporate-tax-calculator";

const URL = "https://u.ae/en/information-and-services/finance-and-investment/taxation/corporate-tax";

export default definirCasos(calculadora, [
  {
    nombre: "AED 1 million of taxable income",
    origen: { tipo: "oficial", url: URL, detalle: "0% up to 375,000 and 9% above: (1,000,000 - 375,000) x 9% = 56,250." },
    fecha: "2026-10-18",
    entrada: { renta: 1000000 },
    esperado: { impuesto: 56250, exento: 375000, gravado: 625000 },
  },
  {
    nombre: "Below AED 375,000 pays nothing",
    origen: { tipo: "oficial", url: URL, detalle: "0 per cent for taxable income up to AED 375,000." },
    fecha: "2026-10-18",
    entrada: { renta: 300000 },
    esperado: { impuesto: 0, gravado: 0 },
  },
  {
    nombre: "No income is not valid",
    origen: { tipo: "recalculado", detalle: "Income 0." },
    fecha: "2026-10-18",
    entrada: { renta: 0 },
    esperaError: true,
  },
]);
