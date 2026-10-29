import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-calculator";

const BRA_PN =
  "https://bra.gov.bb/attachment?file=Attachments%2fPolicy+Note+2026_Reduction+in+Personal+Income+Tax+Rates_April+2026.pdf&name=Policy+Note+2026_Reduction+in+Personal+Income+Tax+Rates_April+2026";

export default definirCasos(calculadora, [
  {
    nombre: "BRA example 1: $60,000 a year, monthly PAYE",
    origen: { tipo: "oficial", url: BRA_PN, detalle: "5,000.00 less allowance 2,083.33 = 2,916.67 taxable. Tax 2,916.67 × 11.5% = 335.42." },
    fecha: "2026-10-27",
    entrada: { bruto: 5000 },
    esperado: { paye: 335.42, imponible: 2916.67, desgravacion: 2083.33 },
  },
  {
    nombre: "BRA example 2: $100,000 a year, both rates",
    origen: { tipo: "oficial", url: BRA_PN, detalle: "Taxable 6,250.00. 4,166.67 × 11.5% = 479.17 plus 2,083.33 × 27.5% = 572.92. Total 1,052.09." },
    fecha: "2026-10-27",
    entrada: { bruto: 8333.33 },
    esperado: { paye: 1052.09, imponible: 6250 },
  },
  {
    nombre: "$5,000 a month in October 2026",
    origen: { tipo: "recalculado", detalle: "NIS 5,000 × 11% = 550.00. RRF 5,000 × 0.25% = 12.50. PAYE 335.42. Deductions 897.92. Net 4,102.08." },
    fecha: "2026-10-27",
    entrada: { bruto: 5000 },
    esperado: { neto: 4102.08, nis: 550, rrf: 12.5, total: 897.92 },
  },
  {
    nombre: "$8,333.33 a month, above the NIS ceiling",
    origen: { tipo: "recalculado", detalle: "NIS on the 2026 ceiling 5,360 × 11% = 589.60. RRF 8,333.33 × 0.25% = 20.83. PAYE 1,052.09. Net 8,333.33 − 1,662.52 = 6,670.81." },
    fecha: "2026-10-27",
    entrada: { bruto: 8333.33 },
    esperado: { neto: 6670.81, nis: 589.6, rrf: 20.83, total: 1662.52 },
  },
  {
    nombre: "$8,333.33 in January 2027, new NIS ceiling",
    origen: { tipo: "recalculado", detalle: "2027 ceiling 5,450 × 11% = 599.50." },
    fecha: "2027-01-15",
    entrada: { bruto: 8333.33 },
    esperado: { nis: 599.5 },
  },
  {
    nombre: "$2,000 a month, inside the allowance",
    origen: { tipo: "recalculado", detalle: "2,000 is below the monthly allowance of 2,083.33, so PAYE is 0. NIS 220.00, RRF 5.00. Net 1,775.00." },
    fecha: "2026-10-27",
    entrada: { bruto: 2000 },
    esperado: { neto: 1775, paye: 0 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "A gross salary of zero is rejected." },
    fecha: "2026-10-27",
    entrada: { bruto: 0 },
    esperaError: true,
  },
]);
