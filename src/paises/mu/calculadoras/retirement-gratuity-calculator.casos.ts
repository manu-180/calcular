import { definirCasos } from "@/motor/calculo";
import calculadora from "./retirement-gratuity-calculator";

const WRA = "https://www.mra.mu/download/WorkersRightsAct2019.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "26 years and 9 months on Rs 39,000",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 109(3) and (6): 39,000 / 26 = 1,500 a day; 15 days = 22,500 a year. 26 × 22,500 + 22,500 / 12 × 9 = 601,875." },
    fecha: "2026-10-24",
    entrada: { inicio: "2000-01-03", fin: "2026-10-03", sueldo: 39000, deducciones: 0 },
    esperado: { neto: 601875, diario: 1500, porAnio: 22500, anios: 26, resto: 9 },
  },
  {
    nombre: "Less than a year",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 109(1): 12 months or more." },
    fecha: "2026-10-24",
    entrada: { inicio: "2026-01-05", fin: "2026-10-01", sueldo: 39000, deducciones: 0 },
    esperado: { neto: 0, bruto: 0 },
  },
]);
