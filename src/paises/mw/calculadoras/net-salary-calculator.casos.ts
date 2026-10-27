import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "K500,000 with a pension",
    origen: { tipo: "recalculado", detalle: "PAYE 330,000 × 30% = 99,000 (as the MRA calculator). Pension 5% = 25,000. Net 500,000 less 124,000 = 376,000." },
    fecha: "2026-10-27",
    entrada: { bruto: 500000, pension: true },
    esperado: { neto: 376000, paye: 99000, pension: 25000, deducciones: 124000, netoAnual: 4512000 },
  },
  {
    nombre: "K2,000,000 without a pension",
    origen: { tipo: "recalculado", detalle: "PAYE 420,000 + 150,500 = 570,500. Net 1,429,500." },
    fecha: "2026-10-27",
    entrada: { bruto: 2000000, pension: false },
    esperado: { neto: 1429500, paye: 570500, pension: 0 },
  },
  {
    nombre: "K150,000 with a pension pays no PAYE",
    origen: { tipo: "recalculado", detalle: "Below K170,000 there is no PAYE. Pension 5% = 7,500. Net 142,500." },
    fecha: "2026-10-27",
    entrada: { bruto: 150000, pension: true },
    esperado: { neto: 142500, paye: 0, pension: 7500 },
  },
  {
    nombre: "Zero pay is rejected",
    origen: { tipo: "recalculado", detalle: "Gross pay has to be above zero." },
    fecha: "2026-10-27",
    entrada: { bruto: 0, pension: true },
    esperaError: true,
  },
]);
