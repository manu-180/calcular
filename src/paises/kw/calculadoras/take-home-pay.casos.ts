import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "KD 1,200, Kuwaiti, 5 years",
    origen: { tipo: "recalculado", detalle: "PIFSS: 5% basic 60 + 2.5% increase 30 + 2.5% remuneration 30 + 0.5% unemployment 6 = 126. Net 1,200 − 126 = 1,074." },
    fecha: "2026-10-18",
    entrada: { sueldo: 1200, kuwaiti: true, anios: 5 },
    esperado: { neto: 1074, pifss: 126, anual: 12888 },
  },
  {
    nombre: "KD 2,000, Kuwaiti, 20 years",
    origen: { tipo: "recalculado", detalle: "75 + 25 + 50 + 0 + 10 = 160. Net 1,840." },
    fecha: "2026-10-18",
    entrada: { sueldo: 2000, kuwaiti: true, anios: 20 },
    esperado: { neto: 1840, pifss: 160 },
  },
  {
    nombre: "Non-Kuwaiti employee",
    origen: { tipo: "recalculado", detalle: "No PIFSS contribution in this calculator." },
    fecha: "2026-10-18",
    entrada: { sueldo: 800, kuwaiti: false, anios: 0 },
    esperado: { neto: 800, pifss: 0 },
  },
]);
