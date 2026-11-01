import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

const CPI = "https://nsb.gov.bt/wp-content/uploads/2026/10/CPI_New-series-2023-24100.xlsx" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Nu. 1,000 from September 2025",
    origen: { tipo: "recalculado", url: CPI, detalle: "111.0062 / 105.1348 = 1.05585. The NSB report of September 2026 gives 5.58 % over 12 months." },
    fecha: "2026-10-31",
    entrada: { importe: 1000, anio: 2025 },
    esperado: { actualizado: 1055.85, periodo: "September 2025 to September 2026", ultimaTasa: 5.5846 },
  },
  {
    nombre: "Nu. 1,000 from September 2013",
    origen: { tipo: "recalculado", url: CPI, detalle: "111.0062 / 62.3031 = 1.78171 (1,781.71)." },
    fecha: "2026-10-31",
    entrada: { importe: 1000, anio: 2013 },
    esperado: { actualizado: 1781.71 },
  },
  {
    nombre: "A year after the latest data is refused",
    origen: { tipo: "recalculado", detalle: "The latest point is September 2026." },
    fecha: "2026-10-31",
    entrada: { importe: 1000, anio: 2026 },
    esperaError: true,
  },
]);
