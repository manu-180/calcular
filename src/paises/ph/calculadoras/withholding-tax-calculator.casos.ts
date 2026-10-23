import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Monthly ₱25,000",
    origen: { tipo: "recalculado", detalle: "Yearly 300,000. Tax (300,000 − 250,000) × 15% = 7,500, monthly 625." },
    fecha: "2026-10-16",
    entrada: { compensacion: 25000, periodo: "monthly" },
    esperado: { impuesto: 625, neto: 24375, exentoHasta: 20833.33, marginal: 15 },
  },
  {
    nombre: "Monthly ₱165,000",
    origen: {
      tipo: "recalculado",
      detalle: "Yearly 1,980,000. Tax 102,500 + 1,180,000 × 25% = 397,500, monthly 33,125.",
    },
    fecha: "2026-10-16",
    entrada: { compensacion: 165000, periodo: "monthly" },
    esperado: { impuesto: 33125, marginal: 25 },
  },
  {
    nombre: "Semi-monthly ₱15,500 under the 2018 table (RR 11-2018 illustration 8)",
    origen: {
      tipo: "oficial",
      url: "https://bir-cdn.bir.gov.ph/local/pdf/RR%20No.%2011-2018.pdf",
      detalle: "Illustration 8: 0 on 10,417 plus 20% of 5,083 = 1,016.60. The yearly method gives (372,000 − 250,000) × 20% / 24 = 1,016.67.",
    },
    fecha: "2022-06-15",
    entrada: { compensacion: 15500, periodo: "semi-monthly" },
    esperado: { impuesto: 1016.67 },
    tolerancia: 0.1,
  },
  {
    nombre: "Daily ₱2,500 under the 2018 table (RR 11-2018 illustration 6)",
    origen: {
      tipo: "oficial",
      url: "https://bir-cdn.bir.gov.ph/local/pdf/RR%20No.%2011-2018.pdf",
      detalle: "Illustration 6: 356.16 on 2,192 plus 30% of 308 = 448.56. The yearly method gives (130,000 + (912,500 − 800,000) × 30%) / 365 = 448.63.",
    },
    fecha: "2022-06-15",
    entrada: { compensacion: 2500, periodo: "daily" },
    esperado: { impuesto: 448.63 },
    tolerancia: 0.1,
  },
  {
    nombre: "Weekly ₱4,000 pays nothing",
    origen: { tipo: "recalculado", detalle: "Yearly 208,000, under 250,000." },
    fecha: "2026-10-16",
    entrada: { compensacion: 4000, periodo: "weekly" },
    esperado: { impuesto: 0, exentoHasta: 4807.69 },
  },
]);
