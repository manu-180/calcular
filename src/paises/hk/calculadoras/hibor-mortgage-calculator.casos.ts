import { definirCasos } from "@/motor/calculo";
import calculadora from "./hibor-mortgage-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "HIBOR plus margin above the cap: the cap applies",
    origen: {
      tipo: "recalculado",
      detalle: "HKMA one-month HIBOR fixing on 15 October 2026: 2.73792%. Plus 1.3% = 4.03792%, above the 3.5% cap. 4,000,000 over 360 months at 3.5%: 17,961.79 a month.",
    },
    fecha: "2026-10-16",
    entrada: { prestamo: 4000000, anios: 30, margen: 1.3, tope: 3.5 },
    esperado: { hibor: 2.73792, tasa: 3.5, mensual: 17961.79, total: 6466244.4 },
  },
  {
    nombre: "No cap: HIBOR plus margin",
    origen: { tipo: "recalculado", detalle: "2.73792 + 1.3 = 4.03792% over 360 months: 19,184.16 a month." },
    fecha: "2026-10-16",
    entrada: { prestamo: 4000000, anios: 30, margen: 1.3, tope: 0 },
    esperado: { tasa: 4.03792, mensual: 19184.16 },
  },
  {
    nombre: "Low HIBOR stays under the cap",
    origen: { tipo: "recalculado", detalle: "HIBOR 1% + 1.3% = 2.3%, under the 3.5% cap. 3,000,000 over 240 months: 15,606.41." },
    fecha: "2026-10-16",
    entrada: { prestamo: 3000000, anios: 20, margen: 1.3, tope: 3.5 },
    valores: { "hk.hibor-1m": { fecha: "2026-10-15", valor: 1 } },
    esperado: { tasa: 2.3, mensual: 15606.41, intereses: 745538.4 },
  },
  {
    nombre: "No loan is not valid",
    origen: { tipo: "recalculado", detalle: "Loan 0." },
    fecha: "2026-10-16",
    entrada: { prestamo: 0, anios: 30, margen: 1.3, tope: 3.5 },
    esperaError: true,
  },
]);
