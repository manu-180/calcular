import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "RWF 300,000 gross, no RAMA",
    origen: {
      tipo: "recalculado",
      detalle: "PAYE 54,000. Pension 6% = 18,000. Maternity 0.3% = 900. CBHI 0.5% × (300,000 − 54,000 − 18,000 − 900 = 227,100) = 1,135.5, rounded to 1,136. Net 300,000 − 54,000 − 18,000 − 900 − 1,136 = 225,964.",
    },
    fecha: "2026-10-26",
    entrada: { bruto: 300000, rama: false, basico: null },
    esperado: { neto: 225964, paye: 54000, pension: 18000, maternidad: 900, medico: 0, cbhi: 1136, totalDeducido: 74036 },
  },
  {
    nombre: "RWF 100,000 gross",
    origen: { tipo: "recalculado", detalle: "PAYE 4,000. Pension 6,000. Maternity 300. CBHI 0.5% × 89,700 = 448.5, rounded to 449. Net 89,251." },
    fecha: "2026-10-26",
    entrada: { bruto: 100000, rama: false, basico: null },
    esperado: { neto: 89251, paye: 4000, cbhi: 449 },
  },
  {
    nombre: "RWF 500,000 gross on RAMA with RWF 300,000 basic",
    origen: {
      tipo: "recalculado",
      detalle: "PAYE 4,000 + 20,000 + 300,000 × 30% = 114,000. Pension 30,000. Maternity 1,500. RAMA 7.5% × 300,000 = 22,500. CBHI 0.5% × 354,500 = 1,772.5, rounded to 1,773. Net 330,227.",
    },
    fecha: "2026-10-26",
    entrada: { bruto: 500000, rama: true, basico: 300000 },
    esperado: { neto: 330227, paye: 114000, medico: 22500, cbhi: 1773 },
  },
  {
    nombre: "Basic salary above gross",
    origen: { tipo: "recalculado", detalle: "Basic salary is part of gross salary, so it cannot be larger." },
    fecha: "2026-10-26",
    entrada: { bruto: 200000, rama: true, basico: 250000 },
    esperaError: true,
  },
]);
