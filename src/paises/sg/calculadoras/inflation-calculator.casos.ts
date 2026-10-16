import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

const SINGSTAT = "https://tablebuilder.singstat.gov.sg/table/TS/M213751";

export default definirCasos(calculadora, [
  {
    nombre: "$1,000 from August 2025 to August 2026",
    origen: { tipo: "recalculado", url: SINGSTAT, detalle: "SingStat CPI (2024 = 100): August 2025 = 100.963, August 2026 = 103.334. 1,000 × 103.334 / 100.963 = 1,023.48." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, desde: "2025-08-15", hasta: "2026-08-01" },
    esperado: { actualizado: 1023.48, diferencia: 23.48, acumulada: 2.3484, indiceInicial: 100.963, indiceFinal: 103.334 },
    tolerancia: 0.001,
  },
  {
    nombre: "January 2020 to today stops at the latest CPI",
    origen: { tipo: "recalculado", url: SINGSTAT, detalle: "January 2020 = 86.121. Latest published is August 2026 = 103.334. 1,000 × 103.334 / 86.121 = 1,199.87." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, desde: "2020-01-01", hasta: "2026-10-14" },
    esperado: { actualizado: 1199.87, mesFinal: "August 2026" },
  },
  {
    nombre: "Start month not published yet",
    origen: { tipo: "recalculado", detalle: "The CPI for October 2026 is not out on 14 October 2026." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, desde: "2026-10-01", hasta: "2026-10-14" },
    esperaError: true,
  },
]);
