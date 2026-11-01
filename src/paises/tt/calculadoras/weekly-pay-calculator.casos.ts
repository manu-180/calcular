import { definirCasos } from "@/motor/calculo";
import calculadora from "./weekly-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "TT$1,500 a week",
    origen: { tipo: "recalculado", detalle: "Weekly class IX (1,490 to 1,709.99): NIS 86.40. Health Surcharge 8.25. 78,000 a year is below the allowance, no PAYE. Net 1,405.35." },
    fecha: "2026-10-27",
    entrada: { bruto: 1500, mayor60: false },
    esperado: { neto: 1405.35, nis: 86.4, surcharge: 8.25, paye: 0, clase: 9 },
  },
  {
    nombre: "TT$3,000 a week",
    origen: {
      tipo: "recalculado",
      detalle: "Class XV: NIS 163.60. Chargeable income 156,000 − 90,000 − 70% × 8,507.20 = 60,044.96. Tax 15,011.24, or 288.68 a week. Net 3,000 − 460.53 = 2,539.47.",
    },
    fecha: "2026-10-27",
    entrada: { bruto: 3000, mayor60: false },
    esperado: { neto: 2539.47, paye: 288.68, nis: 163.6, clase: 15 },
  },
  {
    nombre: "TT$100 a week, below the first class",
    origen: { tipo: "recalculado", detalle: "Below TT$200 a week there is no NIS class. Health Surcharge 4.80 at TT$109 or less. Net 95.20." },
    fecha: "2026-10-27",
    entrada: { bruto: 100, mayor60: false },
    esperado: { neto: 95.2, nis: 0, surcharge: 4.8, clase: 0 },
  },
]);
