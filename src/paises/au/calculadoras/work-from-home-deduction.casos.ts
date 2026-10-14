import { definirCasos } from "@/motor/calculo";
import calculadora from "./work-from-home-deduction";

const URL = "https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/working-from-home-expenses/fixed-rate-method";

export default definirCasos(calculadora, [
  {
    nombre: "ATO example: Yang, 567 hours plus a desk and chair",
    origen: { tipo: "oficial", url: URL, detalle: "567 hours × 70c = $396.90; + $299 + $250 = $945.90; Yang claims $945 (cents disregarded)." },
    fecha: "2026-10-14",
    entrada: { horas: 567, anio: "2025-26", activos: 549 },
    esperado: { porHoras: 396.9, total: 945.9, deduccion: 945 },
  },
  {
    nombre: "843 hours in 2025-26",
    origen: { tipo: "recalculado", detalle: "843 × 0.70 = 590.10; claim 590." },
    fecha: "2026-10-14",
    entrada: { horas: 843, anio: "2025-26", activos: null },
    esperado: { porHoras: 590.1, deduccion: 590 },
  },
  {
    nombre: "2024-25 rate",
    origen: { tipo: "recalculado", detalle: "2024-25 also uses 70c: 1,000 × 0.70 = 700." },
    fecha: "2026-10-14",
    entrada: { horas: 1000, anio: "2024-25", activos: null },
    esperado: { deduccion: 700, tasa: 0.7 },
  },
]);
