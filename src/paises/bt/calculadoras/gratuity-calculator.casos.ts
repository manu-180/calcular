import { definirCasos } from "@/motor/calculo";
import calculadora from "./gratuity-calculator";

const RWC = "https://www.moice.gov.bt/wp-content/uploads/2022/06/Regulation-on-Working-Conditions-2022.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "12 years on Nu. 30,000",
    origen: { tipo: "recalculado", url: RWC, detalle: "Section 249: last basic pay × completed years. 30,000 × 12 = 360,000." },
    fecha: "2026-10-31",
    entrada: { basico: 30000, anios: 12, motivo: "normal" },
    esperado: { gratuity: 360000, dias: 15, minimo: 10 },
  },
  {
    nombre: "Nine years, below the minimum",
    origen: { tipo: "recalculado", url: RWC, detalle: "Section 243: at least 10 years." },
    fecha: "2026-10-31",
    entrada: { basico: 30000, anios: 9, motivo: "normal" },
    esperado: { gratuity: 0 },
  },
  {
    nombre: "Dismissal for serious misconduct",
    origen: { tipo: "recalculado", url: RWC, detalle: "Section 248: no gratuity." },
    fecha: "2026-10-31",
    entrada: { basico: 30000, anios: 12, motivo: "misconduct" },
    esperado: { gratuity: 0 },
  },
  {
    nombre: "Death after 15 years",
    origen: { tipo: "recalculado", url: RWC, detalle: "Section 247: paid to the nominee. 20,000 × 15 = 300,000." },
    fecha: "2026-10-31",
    entrada: { basico: 20000, anios: 15, motivo: "death" },
    esperado: { gratuity: 300000 },
  },
]);
