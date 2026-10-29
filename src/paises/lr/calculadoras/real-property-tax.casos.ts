import { definirCasos } from "@/motor/calculo";
import calculadora from "./real-property-tax";

export default definirCasos(calculadora, [
  {
    nombre: "LRA example: residential property worth US$10,000",
    origen: {
      tipo: "oficial",
      url: "https://revenue.lra.gov.lr/real-property-taxes/",
      detalle: "Tax amount = 10,000.00 × 0.25% = US$25.00 for one year; for two years US$50.",
    },
    fecha: "2026-10-27",
    entrada: { valor: 10000, tipo: "residential", anios: 2 },
    esperado: { anual: 25, total: 50, tasa: 0.25 },
  },
  {
    nombre: "LRA example: urban farmland worth US$50,000",
    origen: { tipo: "oficial", url: "https://revenue.lra.gov.lr/real-property-taxes/", detalle: "50000 × 0.0033 = $165." },
    fecha: "2026-10-27",
    entrada: { valor: 50000, tipo: "farm-urban", anios: 1 },
    esperado: { anual: 165 },
  },
  {
    nombre: "LRA example: residential building on public land worth US$50,000",
    origen: { tipo: "oficial", url: "https://revenue.lra.gov.lr/real-property-taxes/", detalle: "50000 × 0.0014 = $70." },
    fecha: "2026-10-27",
    entrada: { valor: 50000, tipo: "public-residential", anios: 1 },
    esperado: { anual: 70 },
  },
  {
    nombre: "Commercial property worth US$50,000",
    origen: { tipo: "recalculado", detalle: "1.5% × 50,000 = 750. The LRA page prints $700 for this example, an arithmetic slip." },
    fecha: "2026-10-27",
    entrada: { valor: 50000, tipo: "commercial", anios: 1 },
    esperado: { anual: 750 },
  },
  {
    nombre: "No value",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { valor: 0, tipo: "residential", anios: 1 },
    esperaError: true,
  },
]);
