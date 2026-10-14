import { definirCasos } from "@/motor/calculo";
import calculadora from "./car-expenses-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ATO example: Johan, 2,514 km in 2025-26",
    origen: {
      tipo: "oficial",
      url: "https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/cars-transport-and-travel/motor-vehicle-and-car-expenses/expenses-for-a-car-you-own-or-lease/cents-per-kilometre-method",
      detalle: "2,514 km × 0.88 = $2,212 in the ATO example (2,212.32 before dropping cents).",
    },
    fecha: "2026-10-14",
    entrada: { km: 2514, anio: "2025-26" },
    esperado: { deduccion: 2212.32, kmUsados: 2514 },
  },
  {
    nombre: "2026-27 rate",
    origen: { tipo: "recalculado", detalle: "3,000 × 0.91 = 2,730." },
    fecha: "2026-10-14",
    entrada: { km: 3000, anio: "2026-27" },
    esperado: { deduccion: 2730, tasa: 0.91 },
  },
  {
    nombre: "Above the 5,000 km cap",
    origen: { tipo: "recalculado", detalle: "Capped at 5,000 km × 0.88 = 4,400." },
    fecha: "2026-10-14",
    entrada: { km: 8000, anio: "2025-26" },
    esperado: { deduccion: 4400, kmUsados: 5000 },
  },
]);
