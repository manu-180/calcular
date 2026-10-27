import { definirCasos } from "@/motor/calculo";
import calculadora from "./gross-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "M8 668 take-home needs M10 000 gross",
    origen: {
      tipo: "oficial",
      url: "https://www.rsl.org.ls/sites/default/files/2026-09/Guide%20on%20Taxation%20of%20Employment%20Income%2026-27.pdf",
      detalle: "RSL example 3: M10 000 gross pays M1 332 PAYE, leaving M8 668.",
    },
    fecha: "2026-10-27",
    entrada: { neto: 8668 },
    esperado: { bruto: 10000, paye: 1332 },
  },
  {
    nombre: "Below the tax threshold gross equals net",
    origen: { tipo: "recalculado", detalle: "M5 000 × 20% = 1 000, under the 1 020 credit, so no PAYE." },
    fecha: "2026-10-27",
    entrada: { neto: 5000 },
    esperado: { bruto: 5000, paye: 0 },
  },
  {
    nombre: "M6 204 take-home needs M6 480 gross",
    origen: { tipo: "recalculado", detalle: "6 480 − (1 296 − 1 020) = 6 204." },
    fecha: "2026-10-27",
    entrada: { neto: 6204 },
    esperado: { bruto: 6480, paye: 276 },
  },
]);
