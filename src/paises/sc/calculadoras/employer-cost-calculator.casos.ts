import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Seychellois worker on SCR 25,000",
    origen: { tipo: "recalculado", detalle: "Salary 300,000, employer SPF 5 % = 15,000, thirteenth month 25,000. Total 340,000, which is 28,333.33 a month." },
    fecha: "2026-10-29",
    entrada: { bruto: 25000, seychellois: true },
    esperado: { costoAnual: 340000, costoMensual: 28333.33, spfAnual: 15000, treceavo: 25000 },
  },
  {
    nombre: "Salary above the thirteenth month limit",
    origen: { tipo: "recalculado", detalle: "60,000 is above the SCR 45,450 limit: salary 720,000 plus SPF 36,000 = 756,000." },
    fecha: "2026-10-29",
    entrada: { bruto: 60000, seychellois: true },
    esperado: { costoAnual: 756000, treceavo: 0 },
  },
  {
    nombre: "Non-Seychellois worker",
    origen: { tipo: "recalculado", detalle: "Section 46C(8) excludes non-Seychellois workers: 20,000 × 12 = 240,000 plus SPF 12,000 = 252,000." },
    fecha: "2026-10-29",
    entrada: { bruto: 20000, seychellois: false },
    esperado: { costoAnual: 252000, treceavo: 0 },
  },
]);
