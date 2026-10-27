import { definirCasos } from "@/motor/calculo";
import calculadora from "./skills-development-levy-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ZRA example: XY Limited",
    origen: {
      tipo: "oficial",
      url: "https://www.zra.org.zm/wp-content/uploads/2023/06/Skills-Development-Levy.pdf",
      detalle: "Total payments 1,010,000 less gratuity 100,000 and redundancy packages 300,000 = 610,000. Levy 0.5% × 610,000 = 3,050.",
    },
    fecha: "2026-10-26",
    entrada: { total: 1010000, excluido: 400000 },
    esperado: { levy: 3050, base: 610000 },
  },
  {
    nombre: "More excluded than paid",
    origen: { tipo: "recalculado", detalle: "The excluded amount cannot exceed the payroll." },
    fecha: "2026-10-26",
    entrada: { total: 1000, excluido: 2000 },
    esperaError: true,
  },
]);
