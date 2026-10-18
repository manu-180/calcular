import { definirCasos } from "@/motor/calculo";
import calculadora from "./percentage-tax";

export default definirCasos(calculadora, [
  {
    nombre: "₱250,000 in a quarter at 3%",
    origen: { tipo: "recalculado", detalle: "250,000 × 3% = 7,500. Year at the same pace: 1,000,000 × 3% = 30,000." },
    fecha: "2026-10-16",
    entrada: { ventas: 250000, anuales: null },
    esperado: { impuesto: 7500, tasa: 3, neto: 242500, anual: 30000 },
  },
  {
    nombre: "Second quarter of 2023 still at 1%",
    origen: {
      tipo: "oficial",
      url: "https://bir-cdn.bir.gov.ph/local/pdf/RMC%20No.%2069-2023.pdf",
      detalle: "RMC 69-2023: quarterly sales from 1 January to 30 June 2023 keep the 1% rate. 250,000 × 1% = 2,500.",
    },
    fecha: "2023-06-30",
    entrada: { ventas: 250000, anuales: 1000000 },
    esperado: { impuesto: 2500, tasa: 1 },
  },
  {
    nombre: "Back to 3% from July 2023",
    origen: {
      tipo: "oficial",
      url: "https://bir-cdn.bir.gov.ph/local/pdf/RMC%20No.%2069-2023.pdf",
      detalle: "RMC 69-2023: the rate reverts to 3% of gross quarterly sales from 1 July 2023.",
    },
    fecha: "2023-07-01",
    entrada: { ventas: 250000, anuales: 1000000 },
    esperado: { impuesto: 7500, tasa: 3 },
  },
  {
    nombre: "No sales",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { ventas: 0, anuales: null },
    esperaError: true,
  },
]);
