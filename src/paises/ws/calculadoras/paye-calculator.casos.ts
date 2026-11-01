import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

const IS02 = "https://revenue.gov.ws/wp-content/uploads/2026/10/IS02_Salary-and-Wage-Income-Tax-2026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Fortnightly pay of WST 1,000",
    origen: { tipo: "recalculado", url: IS02, detalle: "(962 − 576) × 20% = 77.20, plus (1,000 − 962) × 27% = 10.26. PAYE 87.46." },
    fecha: "2026-10-29",
    entrada: { bruto: 1000, periodo: "fortnight" },
    esperado: { impuesto: 87.46, neto: 912.54, tasaMarginal: 27 },
  },
  {
    nombre: "Fortnightly pay at the threshold of WST 576",
    origen: { tipo: "oficial", url: IS02, detalle: "Pay of WST 576 or less a fortnight pays no PAYE." },
    fecha: "2026-10-29",
    entrada: { bruto: 576, periodo: "fortnight" },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Fortnightly pay of WST 700",
    origen: { tipo: "recalculado", detalle: "(700 − 576) × 20% = 24.80." },
    fecha: "2026-10-29",
    entrada: { bruto: 700, periodo: "fortnight" },
    esperado: { impuesto: 24.8, tasaMarginal: 20 },
  },
  {
    nombre: "Monthly pay of WST 4,000",
    origen: { tipo: "recalculado", detalle: "Annual 48,000. (25,000 − 15,000) × 20% = 2,000, plus 23,000 × 27% = 6,210. 8,210 / 12 = 684.17." },
    fecha: "2026-10-29",
    entrada: { bruto: 4000, periodo: "month" },
    esperado: { impuesto: 684.17, impuestoAnual: 8210.04 },
  },
  {
    nombre: "Yearly pay of WST 20,000",
    origen: { tipo: "recalculado", detalle: "(20,000 − 15,000) × 20% = 1,000." },
    fecha: "2026-10-29",
    entrada: { bruto: 20000, periodo: "year" },
    esperado: { impuesto: 1000 },
  },
]);
