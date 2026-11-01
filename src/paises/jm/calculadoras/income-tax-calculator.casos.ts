import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

const ADVISORY = "https://www.jamaicatax.gov.jm/documents/10194/52231399/Technical_Advisory_Threshold+_042025.pdf/c4adbf81-8ddd-9a1b-9e8b-8bdc431162df";

export default definirCasos(calculadora, [
  {
    nombre: "TAJ scenario 1: J$7,000,000 salary in 2025 with 10% pension",
    origen: {
      tipo: "oficial",
      url: ADVISORY,
      detalle: "NIS 150,000, pension 700,000, statutory income 6,150,000. Tax 1,056,361.50 + 45,000 = 1,101,361.50. NHT 140,000, Education Tax 138,375. Net 4,770,263.50.",
    },
    fecha: "2025-12-31",
    entrada: { empleo: 7000000, aporte: 700000, pensionIngreso: 0, edad: "under-55" },
    esperado: { impuesto: 1101361.5, impuesto30: 45000, nis: 150000, ingresoEstatutario: 6150000, nht: 140000, educationTax: 138375, neto: 4770263.5 },
  },
  {
    nombre: "TAJ scenario 2: pensioner aged 55 to 64 with J$11,200,000 in 2025",
    origen: { tipo: "oficial", url: ADVISORY, detalle: "Less the pension exemption of 250,040: 10,949,960. Tax 1,056,361.50 + 30% of 4,949,960 = 2,541,349.50." },
    fecha: "2025-12-31",
    entrada: { empleo: 0, aporte: 0, pensionIngreso: 11200000, edad: "55-64" },
    esperado: { impuesto: 2541349.5, exenciones: 250040 },
  },
  {
    nombre: "J$3,000,000 salary in 2026",
    origen: { tipo: "recalculado", detalle: "NIS 90,000. Statutory income 2,910,000. Tax (2,910,000 − 1,876,614) × 25% = 258,346.50. Net 2,526,178.50." },
    fecha: "2026-10-24",
    entrada: { empleo: 3000000, aporte: 0, pensionIngreso: 0, edad: "under-55" },
    esperado: { impuesto: 258346.5, umbral: 1876614, nis: 90000, nht: 60000, educationTax: 65475, neto: 2526178.5 },
  },
  {
    nombre: "J$3,000,000 salary in 2026, aged 65",
    origen: { tipo: "recalculado", detalle: "Age exemption 250,040. Tax (2,910,000 − 250,040 − 1,876,614) × 25% = 195,836.50." },
    fecha: "2026-10-24",
    entrada: { empleo: 3000000, aporte: 0, pensionIngreso: 0, edad: "65-plus" },
    esperado: { impuesto: 195836.5, exenciones: 250040 },
  },
  {
    nombre: "Salary under the threshold in 2026",
    origen: { tipo: "recalculado", detalle: "1,800,000 less NIS of 54,000 is 1,746,000, under 1,876,614. No tax." },
    fecha: "2026-10-24",
    entrada: { empleo: 1800000, aporte: 0, pensionIngreso: 0, edad: "under-55" },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "J$3,000,000 salary in 2027",
    origen: { tipo: "recalculado", detalle: "Effective threshold for 2027 is 1,978,212. Tax (2,910,000 − 1,978,212) × 25% = 232,947." },
    fecha: "2027-06-30",
    entrada: { empleo: 3000000, aporte: 0, pensionIngreso: 0, edad: "under-55" },
    esperado: { impuesto: 232947, umbral: 1978212 },
  },
]);
