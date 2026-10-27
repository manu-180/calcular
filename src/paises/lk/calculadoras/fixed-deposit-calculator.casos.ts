import { definirCasos } from "@/motor/calculo";
import calculadora from "./fixed-deposit-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 1,000,000 for 12 months at 8%",
    origen: { tipo: "recalculado", detalle: "Interest 80,000. Advance income tax 10% = 8,000. Net 72,000, paid back 1,072,000." },
    fecha: "2026-10-26",
    entrada: { deposito: 1000000, tasa: 8, meses: 12 },
    esperado: { interes: 80000, retencion: 8000, neto: 72000, alVencimiento: 1072000, netoMensual: 6000, tasaNeta: 7.2 },
  },
  {
    nombre: "Rs. 500,000 for 6 months at 7.5%",
    origen: { tipo: "recalculado", detalle: "500,000 × 7.5% × 6/12 = 18,750. Tax 1,875. Net 16,875." },
    fecha: "2026-10-26",
    entrada: { deposito: 500000, tasa: 7.5, meses: 6 },
    esperado: { interes: 18750, retencion: 1875, neto: 16875 },
  },
]);
