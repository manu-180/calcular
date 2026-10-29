import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "N$20,000 basic, Social Security at the 2026 ceiling",
    origen: {
      tipo: "recalculado",
      detalle: "240,000 a year: 9,000 + 25% × 90,000 = 31,500, so PAYE 2,625. SSC 0.9% × 12,500 = 112.50. Net 20,000 − 2,625 − 112.50 = 17,262.50.",
    },
    fecha: "2026-10-27",
    entrada: { basico: 20000, asignaciones: 0, pension: 0 },
    esperado: { neto: 17262.5, paye: 2625, ssc: 112.5 },
  },
  {
    nombre: "N$10,000 basic, N$2,000 allowances and N$750 pension in February 2026",
    origen: {
      tipo: "recalculado",
      detalle: "144,000 − 9,000 pension = 135,000: 18% × 35,000 = 6,300, PAYE 525. SSC 0.9% × 10,000 = 90. Net 12,000 − 525 − 90 − 750 = 10,635.",
    },
    fecha: "2026-02-15",
    entrada: { basico: 10000, asignaciones: 2000, pension: 750 },
    esperado: { neto: 10635, paye: 525, ssc: 90, bruto: 12000 },
  },
  {
    nombre: "N$60,000 basic with pension above the cap, March 2027",
    origen: {
      tipo: "recalculado",
      detalle: "720,000 − 150,000 cap = 570,000: 115,000 + 30% × 20,000 = 121,000, PAYE 10,083.33. SSC 0.9% × 14,000 = 126. Net 60,000 − 10,083.33 − 126 − 15,000 = 34,790.67.",
    },
    fecha: "2027-03-15",
    entrada: { basico: 60000, asignaciones: 0, pension: 15000 },
    esperado: { neto: 34790.67, paye: 10083.33, ssc: 126 },
  },
  {
    nombre: "N$7,000 basic pays no PAYE",
    origen: { tipo: "recalculado", detalle: "84,000 a year is under N$100,000. SSC 0.9% × 7,000 = 63. Net 6,937." },
    fecha: "2026-10-27",
    entrada: { basico: 7000, asignaciones: 0, pension: 0 },
    esperado: { neto: 6937, paye: 0, ssc: 63 },
  },
]);
