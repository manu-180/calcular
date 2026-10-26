import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-allowance-calculator";

const WRA = "https://www.mra.mu/download/WorkersRightsAct2019.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "6 years and 3 months on Rs 30,000",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 70: 3 × 30,000 = 90,000 a year. 6 × 90,000 + 90,000 / 12 × 3 = 562,500." },
    fecha: "2026-10-24",
    entrada: { inicio: "2020-07-01", fin: "2026-10-01", ultimoMes: 30000, promedio: null, deducciones: 0 },
    esperado: { neto: 562500, anios: 6, resto: 3 },
  },
  {
    nombre: "Average pay higher than the last month, with PRGF deducted",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 70(3): the higher of 40,000 and 42,000. 3 × 42,000 × 2 = 252,000, less 20,000 = 232,000." },
    fecha: "2026-10-24",
    entrada: { inicio: "2024-09-01", fin: "2026-09-15", ultimoMes: 40000, promedio: 42000, deducciones: 20000 },
    esperado: { neto: 232000, bruto: 252000, mensual: 42000 },
  },
  {
    nombre: "Less than 12 months",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 69(1): at least 12 continuous months." },
    fecha: "2026-10-24",
    entrada: { inicio: "2026-01-10", fin: "2026-10-01", ultimoMes: 30000, promedio: null, deducciones: 0 },
    esperado: { neto: 0, bruto: 0 },
  },
]);
