import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Terminated after five years on D10,000 basic",
    origen: { tipo: "recalculado", detalle: "Labour Act 2023, s. 104(6)(d): two months' basic pay for each year. 10,000 × 2 × 5 = 100,000." },
    fecha: "2026-10-27",
    entrada: { caso: "terminacion", basico: 10000, anios: 5, ganado: null },
    esperado: { indemnizacion: 100000, mesesPorAnio: 2 },
  },
  {
    nombre: "Insolvency after twelve years",
    origen: { tipo: "recalculado", detalle: "s. 104(6)(f): 7,500 × 2 × 12 = 180,000." },
    fecha: "2026-10-27",
    entrada: { caso: "insolvencia", basico: 7500, anios: 12, ganado: null },
    esperado: { indemnizacion: 180000 },
  },
  {
    nombre: "Fixed-term contract gratuity",
    origen: { tipo: "recalculado", detalle: "s. 104(6)(b): at least 25% of basic pay earned. 25% × 240,000 = 60,000." },
    fecha: "2026-10-27",
    entrada: { caso: "plazo", basico: null, anios: null, ganado: 240000 },
    esperado: { indemnizacion: 60000 },
  },
  {
    nombre: "No pay entered",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { caso: "terminacion", basico: 0, anios: 5, ganado: null },
    esperaError: true,
  },
]);
