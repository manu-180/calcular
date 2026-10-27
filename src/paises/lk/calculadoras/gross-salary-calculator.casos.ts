import { definirCasos } from "@/motor/calculo";
import calculadora from "./gross-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 222,000 take-home",
    origen: { tipo: "recalculado", detalle: "Gross 250,000 − EPF 20,000 − APIT 8,000 = 222,000." },
    fecha: "2026-10-26",
    entrada: { neto: 222000 },
    esperado: { bruto: 250000, epf: 20000, apit: 8000, neto: 222000 },
  },
  {
    nombre: "Rs. 92,000 take-home",
    origen: { tipo: "recalculado", detalle: "No APIT below Rs. 150,000: 92,000 / 0.92 = 100,000." },
    fecha: "2026-10-26",
    entrada: { neto: 92000 },
    esperado: { bruto: 100000, apit: 0 },
  },
  {
    nombre: "Rs. 374,000 take-home",
    origen: { tipo: "recalculado", detalle: "Gross 500,000 − EPF 40,000 − APIT 86,000 = 374,000." },
    fecha: "2026-10-26",
    entrada: { neto: 374000 },
    esperado: { bruto: 500000, apit: 86000 },
  },
]);
