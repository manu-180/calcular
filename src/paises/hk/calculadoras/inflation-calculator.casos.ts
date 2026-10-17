import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

const URL = "https://www.censtatd.gov.hk/api/get.php?id=510-60001&lang=en&full_series=1";

export default definirCasos(calculadora, [
  {
    nombre: "August 2025 to August 2026",
    origen: { tipo: "oficial", url: URL, detalle: "Composite CPI 109.0 (August 2025) and 110.8 (August 2026): 1,000 x 110.8 / 109.0 = 1,016.51." },
    fecha: "2026-10-16",
    entrada: { importe: 1000, desde: "2025-08-15", hasta: "2026-08-31" },
    esperado: { actualizado: 1016.51, diferencia: 16.51, indiceInicial: 109, indiceFinal: 110.8, mesFinal: "August 2026" },
  },
  {
    nombre: "January 2020 to today stops at the latest month",
    origen: { tipo: "oficial", url: URL, detalle: "Composite CPI 98.5 (January 2020) to 110.8 (August 2026, the latest): 5,000 x 110.8 / 98.5 = 5,624.37." },
    fecha: "2026-10-16",
    entrada: { importe: 5000, desde: "2020-01-01", hasta: "2026-10-16" },
    esperado: { actualizado: 5624.37, mesInicial: "January 2020", mesFinal: "August 2026" },
  },
  {
    nombre: "A month not yet published is not valid",
    origen: { tipo: "recalculado", detalle: "The start month is after the latest CPI." },
    fecha: "2026-10-16",
    entrada: { importe: 1000, desde: "2026-10-01", hasta: "2026-10-16" },
    esperaError: true,
  },
]);
