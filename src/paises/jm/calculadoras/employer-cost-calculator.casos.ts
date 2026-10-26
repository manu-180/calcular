import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "J$250,000 salary with HEART",
    origen: {
      tipo: "recalculado",
      detalle: "NIS 3% = 7,500. NHT 3% = 7,500. Education Tax 3.5% of (250,000 − 7,500) = 8,487.50. HEART 3% = 7,500. Contributions 30,987.50. Cost 280,987.50.",
    },
    fecha: "2026-10-24",
    entrada: { bruto: 250000, pension: 0, heart: true },
    esperado: { costo: 280987.5, contribuciones: 30987.5, educationTax: 8487.5, heart: 7500 },
  },
  {
    nombre: "J$600,000 salary, NIS at the ceiling",
    origen: {
      tipo: "recalculado",
      detalle: "NIS capped at 3% of 5,000,000 / 12 = 12,500. NHT 18,000. Education Tax 3.5% of 587,500 = 20,562.50. HEART 18,000. Cost 669,062.50.",
    },
    fecha: "2026-10-24",
    entrada: { bruto: 600000, pension: 0, heart: true },
    esperado: { nis: 12500, costo: 669062.5 },
  },
  {
    nombre: "Small payroll without HEART",
    origen: { tipo: "recalculado", detalle: "60,000: NIS 1,800, NHT 1,800, Education Tax 3.5% of 58,200 = 2,037. No HEART. Cost 65,637." },
    fecha: "2026-10-24",
    entrada: { bruto: 60000, pension: 0, heart: false },
    esperado: { costo: 65637, heart: 0 },
  },
]);
