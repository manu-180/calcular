import { definirCasos } from "@/motor/calculo";
import calculadora from "./bank-profit-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 1 million at 10% for a year",
    origen: { tipo: "recalculado", detalle: "Profit 100,000; tax 20% = 20,000; net 80,000; 8% after tax." },
    fecha: "2026-10-17",
    entrada: { deposito: 1000000, tasa: 10, meses: 12 },
    esperado: { bruto: 100000, impuesto: 20000, neto: 80000, netaAnual: 8 },
  },
  {
    nombre: "Six months",
    origen: { tipo: "recalculado", detalle: "500,000 × 12% × 6/12 = 30,000; tax 6,000." },
    fecha: "2026-10-17",
    entrada: { deposito: 500000, tasa: 12, meses: 6 },
    esperado: { impuesto: 6000, neto: 24000 },
  },
]);
