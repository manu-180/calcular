import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

const LMP = "https://www.mlss.gov.jm/wp-content/uploads/2024/07/Labour-Management-Procedures-LMP-JAMAICA-SPIRO-FINAL.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "After the first year, 5-day week",
    origen: { tipo: "recalculado", url: LMP, detalle: "Paragraph 8 of the Holidays with Pay Order: 2 normal working weeks = 10 days. Pay 2 × 40,000 = 80,000." },
    fecha: "2026-10-24",
    entrada: { meses: 18, dias: 0, diasSemana: 5, semanal: 40000 },
    esperado: { dias: 10, pago: 80000 },
  },
  {
    nombre: "First year, 132 days worked",
    origen: { tipo: "recalculado", url: LMP, detalle: "132 / 22 = 6 days. Pay 40,000 / 5 × 6 = 48,000." },
    fecha: "2026-10-24",
    entrada: { meses: 6, dias: 132, diasSemana: 5, semanal: 40000 },
    esperado: { dias: 6, pago: 48000 },
  },
  {
    nombre: "After the first year, 6-day week",
    origen: { tipo: "recalculado", detalle: "2 weeks × 6 days = 12 days. Pay 2 × 30,000 = 60,000." },
    fecha: "2026-10-24",
    entrada: { meses: 24, dias: 0, diasSemana: 6, semanal: 30000 },
    esperado: { dias: 12, pago: 60000 },
  },
]);
