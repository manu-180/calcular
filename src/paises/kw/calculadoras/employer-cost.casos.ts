import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost";

export default definirCasos(calculadora, [
  {
    nombre: "KD 1,200 Kuwaiti employee",
    origen: { tipo: "recalculado", detalle: "Employer PIFSS: 10% basic 120 + 1% increase 12 = 132. Cost 1,332 a month." },
    fecha: "2026-10-18",
    entrada: { sueldo: 1200, kuwaiti: true, otros: 0 },
    esperado: { mensual: 1332, anual: 15984, pifss: 132 },
  },
  {
    nombre: "KD 3,000 Kuwaiti employee",
    origen: { tipo: "recalculado", detalle: "150 + 10% of 1,250 (125) + 1% of 2,750 (27.5) = 302.5." },
    fecha: "2026-10-18",
    entrada: { sueldo: 3000, kuwaiti: true, otros: 0 },
    esperado: { pifss: 302.5, mensual: 3302.5 },
  },
  {
    nombre: "Non-Kuwaiti with KD 50 of other costs",
    origen: { tipo: "recalculado", detalle: "No PIFSS. 600 + 50 = 650." },
    fecha: "2026-10-18",
    entrada: { sueldo: 600, kuwaiti: false, otros: 50 },
    esperado: { mensual: 650, pifss: 0 },
  },
]);
