import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Bds$1,000 a year ago",
    origen: { tipo: "recalculado", url: "https://stats.gov.bb/subjects/economic-statistics/retail-price-index/", detalle: "RPI change to June 2026 is 1.6%: 1,000 × 1.016 = 1,016.00." },
    fecha: "2026-10-27",
    entrada: { importe: 1000 },
    esperado: { hoy: 1016, aumento: 16, tasa: 1.6, periodo: "June 2025 to June 2026" },
  },
  {
    nombre: "No amount",
    origen: { tipo: "recalculado", detalle: "A zero amount is rejected." },
    fecha: "2026-10-27",
    entrada: { importe: 0 },
    esperaError: true,
  },
]);
