import { definirCasos } from "@/motor/calculo";
import calculadora from "./bonus-tax-calculator";

const TABLA_2 = {
  tipo: "oficial",
  url: "https://www.ird.gov.lk/en/publications/APIT_Tax_Tables/2025-2026/Table%20-%202/03.%20APIT_2526_Table_02_Text.pdf",
} as const;

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 400,000 bonus on a Rs. 200,000 salary",
    origen: { ...TABLA_2, detalle: "EGAR 2,800,000: D × 6% − (108,000 + 12 × 3,000) = 168,000 − 144,000 = 24,000." },
    fecha: "2026-10-26",
    entrada: { sueldo: 200000, bono: 400000 },
    esperado: { impuesto: 24000, neto: 376000, egar: 2800000, apitMensual: 3000 },
  },
  {
    nombre: "Rs. 600,000 bonus on a Rs. 300,000 salary",
    origen: { ...TABLA_2, detalle: "EGAR 4,200,000: D × 30% − (870,000 + 12 × 18,500) = 1,260,000 − 1,092,000 = 168,000." },
    fecha: "2026-10-26",
    entrada: { sueldo: 300000, bono: 600000 },
    esperado: { impuesto: 168000, tasa: 28 },
  },
  {
    nombre: "Rs. 100,000 bonus on a Rs. 100,000 salary",
    origen: { ...TABLA_2, detalle: "EGAR 1,300,000 is not above 1,800,000: nil." },
    fecha: "2026-10-26",
    entrada: { sueldo: 100000, bono: 100000 },
    esperado: { impuesto: 0 },
  },
]);
