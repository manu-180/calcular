import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Five years, dismissed, N$12,000 a month",
    origen: { tipo: "recalculado", detalle: "Section 35(3): one week per year. Week 12,000 / 4.333 = 2,769.44. 5 × 2,769.44 = 13,847.20." },
    fecha: "2026-10-27",
    entrada: { salario: 12000, anios: 5, motivo: "dismissed" },
    esperado: { semanal: 2769.44, semanas: 5, indemnizacion: 13847.2 },
  },
  {
    nombre: "Retired at 65 after 20 years",
    origen: { tipo: "recalculado", detalle: "Week 20,000 / 4.333 = 4,615.74. 20 × 4,615.74 = 92,314.80." },
    fecha: "2026-10-27",
    entrada: { salario: 20000, anios: 20, motivo: "retired" },
    esperado: { indemnizacion: 92314.8 },
  },
  {
    nombre: "Dismissed for misconduct",
    origen: { tipo: "recalculado", detalle: "Section 35(2)(a): no severance pay after a fair dismissal for misconduct." },
    fecha: "2026-10-27",
    entrada: { salario: 12000, anios: 5, motivo: "misconduct" },
    esperado: { indemnizacion: 0 },
  },
  {
    nombre: "Less than a year",
    origen: { tipo: "recalculado", detalle: "Section 35(1): only after 12 months of continuous service." },
    fecha: "2026-10-27",
    entrada: { salario: 12000, anios: 0, motivo: "dismissed" },
    esperado: { indemnizacion: 0 },
  },
]);
