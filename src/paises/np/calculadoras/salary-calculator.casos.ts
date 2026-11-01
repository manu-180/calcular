import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-calculator";

const SSF = "https://ssf.gov.np/list/act_regulation/social-security-operation-procedure-2075-with-5th-ammendment" as const;

export default definirCasos(calculadora, [
  {
    nombre: "NPR 100,000 gross, Fund contributor, basic pay 50%",
    origen: {
      tipo: "recalculado",
      url: SSF,
      detalle: "Basic 50,000. Fund 11% = 5,500. Provident 10% × 12 = 60,000 deducted. Taxable 1,140,000. Tax 10% × 140,000 = 14,000 a year = 1,166.67 a month. Net 100,000 − 5,500 − 1,166.67 = 93,333.33.",
    },
    fecha: "2026-10-29",
    entrada: { bruto: 100000, ssf: true, basicoPct: 50, mujer: false },
    esperado: { neto: 93333.33, ssf: 5500, impuesto: 1166.67, basico: 50000, totalDeducido: 6666.67 },
  },
  {
    nombre: "NPR 80,000 gross, not in the Fund",
    origen: { tipo: "recalculado", detalle: "Income 960,000. No deductions. Tax 1% × 960,000 = 9,600 a year = 800 a month. Net 79,200." },
    fecha: "2026-10-29",
    entrada: { bruto: 80000, ssf: false, basicoPct: 60, mujer: false },
    esperado: { neto: 79200, ssf: 0, impuesto: 800 },
  },
  {
    nombre: "NPR 30,000 gross, Fund contributor, no income tax",
    origen: { tipo: "recalculado", detalle: "Basic 18,000. Fund 1,980. Taxable income is below NPR 10 lakh and a contributor pays 0% there. Net 28,020." },
    fecha: "2026-10-29",
    entrada: { bruto: 30000, ssf: true, basicoPct: 60, mujer: false },
    esperado: { neto: 28020, impuesto: 0, ssf: 1980 },
  },
  {
    nombre: "No pay",
    origen: { tipo: "recalculado", detalle: "Gross pay has to be more than zero." },
    fecha: "2026-10-29",
    entrada: { bruto: 0, ssf: true, basicoPct: 60, mujer: false },
    esperaError: true,
  },
]);
