import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "$1,000 from mid-2015 to today",
    origen: {
      tipo: "recalculado",
      detalle: "ABS CPI June quarter 2015 = 74.69 and June quarter 2026 = 102.31 (the latest). 1,000 × 102.31 / 74.69 = 1,369.80. Annual: 102.31 / 98.43 − 1 = 3.94%.",
    },
    fecha: "2026-10-14",
    entrada: { monto: 1000, desde: "2015-06-30", hasta: "2026-10-14" },
    esperado: { actualizado: 1369.8, diferencia: 369.8, indiceInicial: 74.69, indiceFinal: 102.31, trimestreFinal: "June quarter 2026" },
    tolerancia: 0.01,
  },
  {
    nombre: "$500 from the June quarter 2025 to the March quarter 2026",
    origen: { tipo: "recalculado", detalle: "500 × 101.7 / 98.43 = 516.61." },
    fecha: "2026-10-14",
    entrada: { monto: 500, desde: "2025-05-15", hasta: "2026-02-10" },
    esperado: { actualizado: 516.61, trimestreInicial: "June quarter 2025", trimestreFinal: "March quarter 2026" },
  },
  {
    nombre: "Before the start of the series",
    origen: { tipo: "recalculado", detalle: "The CPI here starts in the March quarter 2000." },
    fecha: "2026-10-14",
    entrada: { monto: 100, desde: "1999-12-31", hasta: "2026-10-14" },
    esperaError: true,
  },
]);
