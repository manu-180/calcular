import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

const SM = "https://statsmauritius.govmu.org/Pages/Statistics/Monthly/Monthly-CPI.aspx";

export default definirCasos(calculadora, [
  {
    nombre: "Rs 10,000 from September 2025 to September 2026",
    origen: { tipo: "oficial", url: SM, detalle: "CPI 107.9 to 114.1: 10,000 × 114.1 / 107.9 = 10,574.61. Year-on-year 5.7%, as in the September 2026 release." },
    fecha: "2026-10-24",
    entrada: { importe: 10000, desde: "2025-09-01", hasta: "2026-09-30" },
    esperado: { actualizado: 10574.61, indiceInicial: 107.9, indiceFinal: 114.1, mesFinal: "September 2026" },
    tolerancia: 0.01,
  },
  {
    nombre: "From April 2024 to today",
    origen: { tipo: "recalculado", url: SM, detalle: "103.2 to 114.1 (latest, September 2026): 1,000 × 114.1 / 103.2 = 1,105.62." },
    fecha: "2026-10-24",
    entrada: { importe: 1000, desde: "2024-04-01", hasta: "2026-10-24" },
    esperado: { actualizado: 1105.62, mesInicial: "April 2024" },
    tolerancia: 0.01,
  },
  {
    nombre: "Before the series starts",
    origen: { tipo: "recalculado", detalle: "The 2023 = 100 series starts in April 2024." },
    fecha: "2026-10-24",
    entrada: { importe: 1000, desde: "2023-01-01", hasta: "2026-09-01" },
    esperaError: true,
  },
]);
