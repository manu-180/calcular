import { definirCasos } from "@/motor/calculo";
import calculadora from "./apit-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 300,000 a month",
    origen: {
      tipo: "oficial",
      url: "https://www.ird.gov.lk/en/publications/APIT_Tax_Tables/2025-2026/Table%20-%201/02.%20APIT_2526_Table_01_Text.pdf",
      detalle: "Summarized Table 1, row 4: 24% of monthly regular profits less Rs. 53,500. 72,000 − 53,500 = 18,500.",
    },
    fecha: "2026-10-26",
    entrada: { sueldo: 300000, residencia: "residente" },
    esperado: { apit: 18500, apitAnual: 222000, tasaMarginal: 24, despues: 281500 },
  },
  {
    nombre: "Rs. 400,000 a month",
    origen: { tipo: "recalculado", detalle: "Row 6: 36% × 400,000 − 94,000 = 50,000." },
    fecha: "2026-10-26",
    entrada: { sueldo: 400000, residencia: "residente" },
    esperado: { apit: 50000, tasaMarginal: 36, tasaEfectiva: 12.5 },
  },
  {
    nombre: "Rs. 320,000 a month",
    origen: { tipo: "recalculado", detalle: "Row 5: 30% × 320,000 − 72,500 = 23,500." },
    fecha: "2026-10-26",
    entrada: { sueldo: 320000, residencia: "residente" },
    esperado: { apit: 23500, tasaMarginal: 30 },
  },
  {
    nombre: "Rs. 180,000 a month",
    origen: { tipo: "recalculado", detalle: "Row 2: 6% × 180,000 − 9,000 = 1,800." },
    fecha: "2026-10-26",
    entrada: { sueldo: 180000, residencia: "residente" },
    esperado: { apit: 1800, tasaMarginal: 6 },
  },
  {
    nombre: "Rs. 150,000 a month",
    origen: { tipo: "recalculado", detalle: "Row 1: up to Rs. 150,000 no tax." },
    fecha: "2026-10-26",
    entrada: { sueldo: 150000, residencia: "residente" },
    esperado: { apit: 0, tasaMarginal: 0 },
  },
  {
    nombre: "Non-resident foreign employee on Rs. 100,000",
    origen: {
      tipo: "oficial",
      url: "https://www.ird.gov.lk/en/publications/APIT_Tax_Tables/2025-2026/Table%20-%204/05.%20APIT_2526_Table_04_Text.pdf",
      detalle: "Table 4.1, row 2: 18% of monthly regular profits less Rs. 10,000. 18,000 − 10,000 = 8,000.",
    },
    fecha: "2026-10-26",
    entrada: { sueldo: 100000, residencia: "extranjero" },
    esperado: { apit: 8000, tasaMarginal: 18 },
  },
  {
    nombre: "Non-resident foreign employee on Rs. 300,000",
    origen: { tipo: "recalculado", detalle: "Table 4.1, row 5: 36% × 300,000 − 40,000 = 68,000." },
    fecha: "2026-10-26",
    entrada: { sueldo: 300000, residencia: "extranjero" },
    esperado: { apit: 68000 },
  },
  {
    nombre: "Non-resident foreign employee on Rs. 50,000",
    origen: { tipo: "recalculado", detalle: "Table 4.1, row 1: 6% from the first rupee, 3,000." },
    fecha: "2026-10-26",
    entrada: { sueldo: 50000, residencia: "extranjero" },
    esperado: { apit: 3000, tasaMarginal: 6 },
  },
]);
