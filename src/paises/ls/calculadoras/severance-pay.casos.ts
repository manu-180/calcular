import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Five years on M6 000 a month",
    origen: { tipo: "recalculado", detalle: "Labour Act s. 136: two weeks per completed year. Week's wage 6 000 / 195 × 45 = 1 384.62. 1 384.62 × 2 × 5 = 13 846.20." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, anios: 5, conducta: false },
    esperado: { semanal: 1384.62, semanas: 10, indemnizacion: 13846.2 },
  },
  {
    nombre: "Fair dismissal for misconduct",
    origen: { tipo: "recalculado", detalle: "s. 136(2): no severance." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, anios: 5, conducta: true },
    esperado: { indemnizacion: 0, semanas: 0 },
  },
  {
    nombre: "Less than a year",
    origen: { tipo: "recalculado", detalle: "s. 136(1): needs more than one year of continuous service." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, anios: 0, conducta: false },
    esperado: { indemnizacion: 0 },
  },
]);
