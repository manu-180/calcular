import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

const URL = "https://www.sbs.gov.ws/documents/economics/CPI/2026/09_CPI_Tables.xlsx";

export default definirCasos(calculadora, [
  {
    nombre: "WST 1,000 from September 2025 to September 2026",
    origen: { tipo: "recalculado", url: URL, detalle: "CPI 143.2781 / 138.5099 = 1.03442. The SBS reports 3.4% for the year. 1,000 × 1.03442 = 1,034.42." },
    fecha: "2026-10-29",
    entrada: { importe: 1000, desde: "2025-09-01" },
    esperado: { actualizado: 1034.42, diferencia: 34.42 },
  },
  {
    nombre: "WST 1,000 from January 2026",
    origen: { tipo: "recalculado", url: URL, detalle: "143.2781 / 134.2948 = 1.06689. 1,000 × 1.06689 = 1,066.89." },
    fecha: "2026-10-29",
    entrada: { importe: 1000, desde: "2026-01-01" },
    esperado: { actualizado: 1066.89 },
  },
]);
