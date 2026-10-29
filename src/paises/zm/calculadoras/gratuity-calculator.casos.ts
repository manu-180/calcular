import { definirCasos } from "@/motor/calculo";
import calculadora from "./gratuity-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Two-year contract on K8,000",
    origen: {
      tipo: "recalculado",
      url: "https://www.mlss.gov.zm/wp-content/uploads/2023/07/The-Employment-Code-Act-No.-3-of-2019.pdf",
      detalle: "Section 73(1): 25% × (8,000 × 24) = 25% × 192,000 = 48,000.",
    },
    fecha: "2026-10-26",
    entrada: { basico: 8000, meses: 24, tasa: null },
    esperado: { gratuity: 48000, basicoTotal: 192000, tasa: 25 },
  },
  {
    nombre: "Contract ended after 9 months at a 30% rate",
    origen: { tipo: "recalculado", detalle: "Prorated (section 73(2)): 30% × (6,000 × 9) = 16,200." },
    fecha: "2026-10-26",
    entrada: { basico: 6000, meses: 9, tasa: 30 },
    esperado: { gratuity: 16200 },
  },
  {
    nombre: "Rate below the minimum",
    origen: { tipo: "recalculado", detalle: "20% is below the 25% minimum." },
    fecha: "2026-10-26",
    entrada: { basico: 6000, meses: 12, tasa: 20 },
    esperaError: true,
  },
]);
