import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "TT$15,000 a month in a 4-Monday month",
    origen: {
      tipo: "recalculado",
      detalle:
        "NIS class XVI (13,600 and over): 169.50 × 4 = 678. Health Surcharge 8.25 × 4 = 33. Chargeable income 180,000 − 90,000 − 70% × (169.50 × 52) = 83,830.20. Tax 25% = 20,957.55, or 1,746.46 a month. Net 15,000 − 2,457.46 = 12,542.54.",
    },
    fecha: "2026-10-27",
    entrada: { bruto: 15000, lunes: "4", pension: 0, mayor60: false },
    esperado: { neto: 12542.54, nis: 678, surcharge: 33, paye: 1746.46, clase: 16, imponible: 83830.2 },
  },
  {
    nombre: "TT$8,000 a month in a 5-Monday month",
    origen: {
      tipo: "recalculado",
      detalle:
        "NIS class X (7,410 to 8,276.99): 97.70 × 5 = 488.50. Health Surcharge 8.25 × 5 = 41.25. Chargeable income 96,000 − 90,000 − 70% × 5,080.40 = 2,443.72. Tax 610.93 a year, 50.91 a month. Net 8,000 − 580.66 = 7,419.34.",
    },
    fecha: "2026-10-27",
    entrada: { bruto: 8000, lunes: "5", pension: 0, mayor60: false },
    esperado: { neto: 7419.34, nis: 488.5, surcharge: 41.25, paye: 50.91, clase: 10 },
  },
  {
    nombre: "Monthly minimum wage, no PAYE",
    origen: {
      tipo: "recalculado",
      detalle: "3,553.33 is in NIS class V: 45.60 × 4 = 182.40. Health Surcharge 33. Yearly pay 42,639.96 is below the 90,000 allowance. Net 3,337.93.",
    },
    fecha: "2026-10-27",
    entrada: { bruto: 3553.33, lunes: "4", pension: 0, mayor60: false },
    esperado: { neto: 3337.93, nis: 182.4, paye: 0, clase: 5 },
  },
  {
    nombre: "TT$120,000 a month, pension plan, aged 60",
    origen: {
      tipo: "recalculado",
      detalle:
        "NIS 678. No Health Surcharge at 60. NIS (70%) plus pension 6,169.80 + 60,000 capped at 60,000. Chargeable income 1,440,000 − 90,000 − 60,000 = 1,290,000. Tax 250,000 + 30% × 290,000 = 337,000, or 28,083.33 a month. Net 120,000 − 33,761.33 = 86,238.67.",
    },
    fecha: "2026-10-27",
    entrada: { bruto: 120000, lunes: "4", pension: 5000, mayor60: true },
    esperado: { neto: 86238.67, surcharge: 0, paye: 28083.33, total: 33761.33 },
  },
  {
    nombre: "Average month for the world comparison",
    origen: { tipo: "recalculado", detalle: "TT$15,000 with 52 ÷ 12 weeks: NIS 169.50 × 4.3333 = 734.50. Health Surcharge 35.75. PAYE 1,746.46. Net 12,483.29." },
    fecha: "2026-10-27",
    entrada: { bruto: 15000, lunes: "promedio", pension: 0, mayor60: false },
    esperado: { neto: 12483.29, nis: 734.5, surcharge: 35.75 },
  },
  {
    nombre: "No salary entered",
    origen: { tipo: "recalculado", detalle: "A gross salary of 0 is rejected." },
    fecha: "2026-10-27",
    entrada: { bruto: 0, lunes: "4", pension: 0, mayor60: false },
    esperaError: true,
  },
]);
