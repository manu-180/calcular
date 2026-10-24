import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

const CSB = "https://www.csb.gov.kw/Pages/Statistics?ID=34&ParentCatID=3";

export default definirCasos(calculadora, [
  {
    nombre: "KD 100 from July 2025 to July 2026",
    origen: { tipo: "oficial", url: CSB, detalle: "CSB CPI July 2026 release: July 2025 = 137.2, July 2026 = 140.2. 100 × 140.2 / 137.2 = 102.187." },
    fecha: "2026-10-18",
    entrada: { importe: 100, desde: "2025-07-10", hasta: "2026-07-20" },
    esperado: { actualizado: 102.187, indiceInicial: 137.2, indiceFinal: 140.2, periodo: "July 2025 to July 2026" },
  },
  {
    nombre: "KD 1,000 from July 2023 to today",
    origen: { tipo: "oficial", url: CSB, detalle: "July 2023 = 130.1, latest (July 2026) = 140.2. 1,000 × 140.2 / 130.1 = 1,077.633." },
    fecha: "2026-10-18",
    entrada: { importe: 1000, desde: "2023-07-01", hasta: "2026-10-18" },
    esperado: { actualizado: 1077.633 },
  },
  {
    nombre: "Dates in the wrong order",
    origen: { tipo: "recalculado", detalle: "The second date has to come after the first." },
    fecha: "2026-10-18",
    entrada: { importe: 100, desde: "2025-07-01", hasta: "2024-07-01" },
    esperaError: true,
  },
]);
