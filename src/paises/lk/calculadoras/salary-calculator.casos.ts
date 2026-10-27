import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 250,000 gross",
    origen: { tipo: "recalculado", detalle: "APIT Table 1, band 3: 18% × 250,000 − 37,000 = 8,000. EPF 8% = 20,000. Net 250,000 − 28,000 = 222,000." },
    fecha: "2026-10-26",
    entrada: { bruto: 250000, otrasDeducciones: 0 },
    esperado: { neto: 222000, apit: 8000, epf: 20000, totalDeducido: 28000 },
  },
  {
    nombre: "Rs. 200,000 gross",
    origen: { tipo: "recalculado", detalle: "6% × 200,000 − 9,000 = 3,000. EPF 16,000. Net 181,000." },
    fecha: "2026-10-26",
    entrada: { bruto: 200000, otrasDeducciones: 0 },
    esperado: { neto: 181000, apit: 3000, epf: 16000 },
  },
  {
    nombre: "Rs. 100,000 gross, below the tax free amount",
    origen: { tipo: "recalculado", detalle: "Up to Rs. 150,000 a month no APIT. EPF 8,000. Net 92,000." },
    fecha: "2026-10-26",
    entrada: { bruto: 100000, otrasDeducciones: 0 },
    esperado: { neto: 92000, apit: 0 },
  },
  {
    nombre: "Rs. 500,000 gross with Rs. 10,000 loan instalment",
    origen: { tipo: "recalculado", detalle: "36% × 500,000 − 94,000 = 86,000. EPF 40,000. Net 500,000 − 86,000 − 40,000 − 10,000 = 364,000." },
    fecha: "2026-10-26",
    entrada: { bruto: 500000, otrasDeducciones: 10000 },
    esperado: { neto: 364000, apit: 86000, epf: 40000, totalDeducido: 136000 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "A gross salary of zero is rejected." },
    fecha: "2026-10-26",
    entrada: { bruto: 0, otrasDeducciones: 0 },
    esperaError: true,
  },
]);
