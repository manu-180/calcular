import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "26 days at the 2026 minimum",
    origen: {
      tipo: "oficial",
      url: "https://fairwages.gov.gh/wp-content/uploads/2025/11/2026-National-Daily-Minimum-Wage.pdf",
      detalle: "NTC communique: new NDMW of GH₵21.77 from 1 January 2026. 21.77 × 26 = 566.02.",
    },
    fecha: "2026-10-18",
    entrada: { dias: 26, diario: 20 },
    esperado: { minimo: 21.77, mensual: 566.02, diferencia: -1.77 },
  },
  {
    nombre: "Too many days",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-18",
    entrada: { dias: 40, diario: null },
    esperaError: true,
  },
]);
