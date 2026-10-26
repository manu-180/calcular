import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-calculator";

const TAJ_PAYROLL =
  "https://www.jamaicatax.gov.jm/documents/10194/105112/Pay+Roll+Taxes+and+Contribution+Rates-Employer+and+Employees_Dec2025.pdf/1d5554a1-b0e6-13bd-d16b-073c8216b753";

export default definirCasos(calculadora, [
  {
    nombre: "TAJ scenario 1: J$125,000 in April 2024 with 4% pension",
    origen: { tipo: "oficial", url: TAJ_PAYROLL, detalle: "Pension 5,000, NIS 3,750, Education Tax 2,615.63, NHT 2,500, no PAYE. Net pay 111,134.37." },
    fecha: "2024-04-30",
    entrada: { bruto: 125000, pensionPct: 4 },
    esperado: { neto: 111134.37, paye: 0, nis: 3750, educationTax: 2615.63, nht: 2500, total: 13865.63 },
  },
  {
    nombre: "TAJ scenario 2: J$480,000 in April 2024 with 4% pension",
    origen: { tipo: "oficial", url: TAJ_PAYROLL, detalle: "Statutory income 448,300. Income tax 25% of 306,626 = 76,656.50. Net pay 351,956.75." },
    fecha: "2024-04-30",
    entrada: { bruto: 480000, pensionPct: 4 },
    esperado: { neto: 351956.75, paye: 76656.5, nis: 12500, ingresoEstatutario: 448300, educationTax: 10086.75, nht: 9600 },
  },
  {
    nombre: "TAJ scenario 3: J$875,000 in April 2024 with 10% pension",
    origen: { tipo: "oficial", url: TAJ_PAYROLL, detalle: "89,581.50 at 25% plus 82,500 at 30%. Total deductions 307,019. Net pay 567,981." },
    fecha: "2024-04-30",
    entrada: { bruto: 875000, pensionPct: 10 },
    esperado: { neto: 567981, paye: 172081.5, total: 307019 },
  },
  {
    nombre: "J$250,000 in October 2026",
    origen: {
      tipo: "recalculado",
      detalle: "NIS 7,500. Statutory income 242,500. Education Tax 5,456.25. NHT 5,000. PAYE (242,500 − 158,530) × 25% = 20,992.50. Net 211,051.25.",
    },
    fecha: "2026-10-24",
    entrada: { bruto: 250000, pensionPct: 0 },
    esperado: { neto: 211051.25, paye: 20992.5, nis: 7500, educationTax: 5456.25, nht: 5000, umbral: 158530 },
  },
  {
    nombre: "J$250,000 in March 2026, before the April threshold",
    origen: { tipo: "recalculado", detalle: "Monthly threshold 149,948 until March 31, 2026. PAYE (242,500 − 149,948) × 25% = 23,138." },
    fecha: "2026-03-31",
    entrada: { bruto: 250000, pensionPct: 0 },
    esperado: { paye: 23138, umbral: 149948 },
  },
  {
    nombre: "J$150,000 in October 2026, below the threshold",
    origen: { tipo: "recalculado", detalle: "Statutory income 145,500 is under 158,530. NIS 4,500, Education Tax 3,273.75, NHT 3,000. Net 139,226.25." },
    fecha: "2026-10-24",
    entrada: { bruto: 150000, pensionPct: 0 },
    esperado: { neto: 139226.25, paye: 0 },
  },
  {
    nombre: "J$875,000 with 10% pension in October 2026",
    origen: { tipo: "recalculado", detalle: "PAYE (500,000 − 158,530) × 25% + 275,000 × 30% = 85,367.50 + 82,500 = 167,867.50. Net 572,195." },
    fecha: "2026-10-24",
    entrada: { bruto: 875000, pensionPct: 10 },
    esperado: { neto: 572195, paye: 167867.5 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "A gross salary of zero is rejected." },
    fecha: "2026-10-24",
    entrada: { bruto: 0, pensionPct: 0 },
    esperaError: true,
  },
]);
