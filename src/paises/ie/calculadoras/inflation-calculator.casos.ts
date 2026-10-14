import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

const CSO = "https://data.cso.ie/table/CPM20";

export default definirCasos(calculadora, [
  {
    nombre: "€1,000 from January 2020 to today",
    origen: { tipo: "recalculado", url: CSO, detalle: "CSO CPI (Dec 2023 = 100): January 2020 = 84.0, latest September 2026 = 107.6. 1,000 × 107.6 / 84.0 = 1,280.95." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, desde: "2020-01-01", hasta: "2026-10-14" },
    esperado: { actualizado: 1280.95, mesFinal: "September 2026", indiceInicial: 84, indiceFinal: 107.6 },
  },
  {
    nombre: "12 months to September 2026",
    origen: { tipo: "recalculado", url: CSO, detalle: "September 2025 = 103.4, September 2026 = 107.6. 107.6 / 103.4 − 1 = 4.06%, which the CSO publishes as 4.1%." },
    fecha: "2026-10-14",
    entrada: { importe: 500, desde: "2025-09-01", hasta: "2026-09-30" },
    esperado: { actualizado: 520.31, acumulada: 4.0619, interanual: 4.0619 },
    tolerancia: 0.001,
  },
  {
    nombre: "Start month not published yet",
    origen: { tipo: "recalculado", detalle: "The CPI for October 2026 is not out on 14 October 2026." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, desde: "2026-10-01", hasta: "2026-10-14" },
    esperaError: true,
  },
]);
