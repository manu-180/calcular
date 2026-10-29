import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

const ORIGEN = "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/employment-conditions-of-employment-regulations-1991-si-34-of-1991/download";

export default definirCasos(calculadora, [
  {
    nombre: "Full year, 5 days taken",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Regulation 9(1): 21 days of paid annual leave. 21 − 5 = 16 left." },
    fecha: "2026-10-29",
    entrada: { meses: 12, tomados: 5, acumulados: 0 },
    esperado: { derecho: 21, disponible: 16 },
  },
  {
    nombre: "Seven months of employment",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Regulation 9(1): 1.75 days a month, rounded up. 1.75 × 7 = 12.25, so 13 days." },
    fecha: "2026-10-29",
    entrada: { meses: 7, tomados: 0, acumulados: 0 },
    esperado: { derecho: 13, disponible: 13 },
  },
  {
    nombre: "Three months of employment",
    origen: { tipo: "recalculado", detalle: "1.75 × 3 = 5.25, rounded up to 6 days." },
    fecha: "2026-10-29",
    entrada: { meses: 3, tomados: 2, acumulados: 0 },
    esperado: { derecho: 6, disponible: 4 },
  },
  {
    nombre: "30 days carried over",
    origen: { tipo: "recalculado", detalle: "21 earned plus 30 carried over = 51 available. The part above 42 is 9 days." },
    fecha: "2026-10-29",
    entrada: { meses: 12, tomados: 0, acumulados: 30 },
    esperado: { derecho: 21, disponible: 51, exceso: 9 },
  },
  {
    nombre: "More days taken than earned",
    origen: { tipo: "recalculado", detalle: "21 earned, 30 taken: negative balance is rejected." },
    fecha: "2026-10-29",
    entrada: { meses: 12, tomados: 30, acumulados: 0 },
    esperaError: true,
  },
]);
