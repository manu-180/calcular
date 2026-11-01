import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

const IRD = "https://ird.gov.np/content/13609/tax-rate-for-natural-persons-for-the/" as const;
const base = { bonusAnual: 0, aporteRetiro: 0, remota: "none", seguroVida: 0, seguroSalud: 0, seguroCasa: 0, mujer: false } as const;

export default definirCasos(calculadora, [
  {
    nombre: "NPR 100,000 a month, Fund contributor with basic pay of 50,000",
    origen: {
      tipo: "recalculado",
      url: IRD,
      detalle: "Income 1,200,000. Provident share 10% × 50,000 × 12 = 60,000. Taxable 1,140,000. First band 0% for a Fund contributor, then 140,000 × 10% = 14,000. Monthly 1,166.67.",
    },
    fecha: "2026-10-29",
    entrada: { ...base, mensual: 100000, ssf: true, basico: 50000 },
    esperado: { impuestoAnual: 14000, impuestoMensual: 1166.67, gravable: 1140000, retiro: 60000, aporteSsf: 66000, marginal: 10 },
  },
  {
    nombre: "NPR 60,000 a month, no retirement fund",
    origen: { tipo: "recalculado", url: IRD, detalle: "Income 720,000. Taxable 720,000. 1% × 720,000 = 7,200. Monthly 600." },
    fecha: "2026-10-29",
    entrada: { ...base, mensual: 60000, ssf: false, basico: null },
    esperado: { impuestoAnual: 7200, impuestoMensual: 600, gravable: 720000, marginal: 1 },
  },
  {
    nombre: "NPR 500,000 a month with a retirement fund at the cap",
    origen: {
      tipo: "recalculado",
      url: IRD,
      detalle: "Income 6,000,000. Deduction min(600,000, 500,000, 2,000,000) = 500,000. Taxable 5,500,000. Tax 0 + 50,000 + 200,000 + 405,000 + 1,500,000 × 29% = 435,000. Total 1,090,000 (first band free because of the fund).",
    },
    fecha: "2026-10-29",
    entrada: { ...base, mensual: 500000, ssf: false, basico: null, aporteRetiro: 600000 },
    esperado: { impuestoAnual: 1090000, gravable: 5500000, retiro: 500000, marginal: 29 },
  },
  {
    nombre: "Woman with insurance and a Category B remote post",
    origen: {
      tipo: "recalculado",
      url: IRD,
      detalle: "Income 1,800,000. Insurance min(50,000, 40,000) + min(25,000, 20,000) + min(12,000, 10,000) = 70,000. Remote 40,000. Taxable 1,690,000. Tax 10,000 + 50,000 + 190,000 × 20% = 38,000 = 98,000. Rebate 10% = 9,800. Tax 88,200.",
    },
    fecha: "2026-10-29",
    entrada: { ...base, mensual: 150000, ssf: false, basico: null, remota: "b", seguroVida: 50000, seguroSalud: 25000, seguroCasa: 12000, mujer: true },
    esperado: { impuestoAnual: 88200, impuestoMensual: 7350, gravable: 1690000, seguros: 70000, remota: 40000, rebaja: 9800, impuestoBruto: 98000 },
  },
  {
    nombre: "No pay",
    origen: { tipo: "recalculado", detalle: "Pay has to be more than zero." },
    fecha: "2026-10-29",
    entrada: { ...base, mensual: 0, ssf: false, basico: null },
    esperaError: true,
  },
]);
