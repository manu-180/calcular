import { definirCasos } from "@/motor/calculo";
import calculadora from "./fnpf-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "FJ$3,000 a month after 1 August 2026",
    origen: {
      tipo: "recalculado",
      url: "https://www.finance.gov.fj/wp-content/uploads/2026/06/2026-2027-Budget-Supplement.pdf",
      detalle: "Employee 8% × 3,000 = 240. Employer 8% × 3,000 = 240. Total 480, or 5,760 over 12 months.",
    },
    fecha: "2026-10-29",
    entrada: { bruto: 3000, periodo: "month" },
    esperado: { empleado: 240, empleador: 240, total: 480, totalAnual: 5760, tasaTotal: 16 },
  },
  {
    nombre: "First day of the 8% employer rate",
    origen: { tipo: "recalculado", detalle: "On 1 August 2026: employee 8% × 1,000 = 80, employer 8% × 1,000 = 80. Total 160." },
    fecha: "2026-08-01",
    entrada: { bruto: 1000, periodo: "month" },
    esperado: { empleado: 80, empleador: 80, total: 160 },
  },
  { nombre: "Zero pay is rejected", origen: { tipo: "recalculado", detalle: "Pay must be above zero." }, fecha: "2026-10-29", entrada: { bruto: 0, periodo: "month" }, esperaError: true },
]);
