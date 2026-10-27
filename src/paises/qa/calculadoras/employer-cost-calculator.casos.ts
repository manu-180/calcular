import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Expatriate with QAR 10,000 basic",
    origen: { tipo: "recalculado", detalle: "Gross 10,000 + 3,000 + 1,000 = 14,000. Provision 10,000 × 12 ÷ 52 × 3 ÷ 12 = 576.92. Monthly 14,576.92." },
    fecha: "2026-10-26",
    entrada: { basico: 10000, vivienda: 3000, otros: 1000, qatari: false, social: null },
    esperado: { bruto: 14000, provision: 576.92, grsia: 0, mensual: 14576.92 },
  },
  {
    nombre: "Qatari with QAR 20,000 basic and 5,000 housing",
    origen: { tipo: "recalculado", detalle: "Base 20,000 + 2,000 + 5,000 = 27,000. Employer 14% = 3,780. Gross 27,000 + 0 = 27,000. Monthly 30,780." },
    fecha: "2026-10-26",
    entrada: { basico: 20000, vivienda: 5000, otros: 0, qatari: true, social: 2000 },
    esperado: { grsia: 3780, bruto: 27000, mensual: 30780, anual: 369360 },
  },
]);
