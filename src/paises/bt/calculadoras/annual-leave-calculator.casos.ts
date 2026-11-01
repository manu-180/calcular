import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

const RWC = "https://www.moice.gov.bt/wp-content/uploads/2022/06/Regulation-on-Working-Conditions-2022.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "A full year, 5 days taken",
    origen: { tipo: "recalculado", url: RWC, detalle: "Section 181: 1.5 days a month. 12 × 1.5 = 18; less 5 = 13; 13 × 1,000 = 13,000." },
    fecha: "2026-10-31",
    entrada: { meses: 12, usados: 5, pagoDiario: 1000 },
    esperado: { ganados: 18, restantes: 13, valor: 13000, anual: 18, enfermedad: 5, casual: 5, aviso: 14 },
  },
  {
    nombre: "Five months, none taken",
    origen: { tipo: "recalculado", url: RWC, detalle: "5 × 1.5 = 7.5." },
    fecha: "2026-10-31",
    entrada: { meses: 5, usados: 0, pagoDiario: null },
    esperado: { ganados: 7.5, restantes: 7.5, valor: null },
  },
  {
    nombre: "More days than earned is refused",
    origen: { tipo: "recalculado", detalle: "2 months earn 3 days." },
    fecha: "2026-10-31",
    entrada: { meses: 2, usados: 4, pagoDiario: null },
    esperaError: true,
  },
]);
