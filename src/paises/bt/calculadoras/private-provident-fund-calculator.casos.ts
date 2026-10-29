import { definirCasos } from "@/motor/calculo";
import calculadora from "./private-provident-fund-calculator";

const PF = "https://www.nppf.org.bt/wp-content/uploads/2024/08/PrivatePFSchemeGuidelines.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Employee at the 5% minimum",
    origen: { tipo: "recalculado", url: PF, detalle: "Clause 9(A)(i): at least 5% of basic salary, matched by the employer. 25,000 × 5% = 1,250 each. 2,500 a month, 30,000 over 12 months." },
    fecha: "2026-10-29",
    entrada: { perfil: "employee", base: 25000, tasa: 5, meses: 12 },
    esperado: { propio: 1250, empleador: 1250, mensual: 2500, total: 30000, minimo: 5, dia: 10 },
  },
  {
    nombre: "Employee at 8%",
    origen: { tipo: "recalculado", url: PF, detalle: "40,000 × 8% = 3,200 each. 6,400 a month." },
    fecha: "2026-10-29",
    entrada: { perfil: "employee", base: 40000, tasa: 8, meses: 1 },
    esperado: { propio: 3200, empleador: 3200, mensual: 6400 },
  },
  {
    nombre: "Self-employed at the 10% minimum",
    origen: { tipo: "recalculado", url: PF, detalle: "Clause 9(C)(i): at least 10% of total income. 60,000 × 10% = 6,000, no employer share." },
    fecha: "2026-10-29",
    entrada: { perfil: "self", base: 60000, tasa: 10, meses: 3 },
    esperado: { propio: 6000, empleador: 0, mensual: 6000, total: 18000, minimo: 10 },
  },
  {
    nombre: "Rate below the minimum is refused",
    origen: { tipo: "recalculado", url: PF, detalle: "A self-employed member at 5% is below 10%." },
    fecha: "2026-10-29",
    entrada: { perfil: "self", base: 60000, tasa: 5, meses: 3 },
    esperaError: true,
  },
]);
