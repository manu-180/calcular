import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "£35,000 in England, no loan, no pension",
    origen: {
      tipo: "recalculado",
      detalle: "Taxable 35,000 − 12,570 = 22,430 × 20% = 4,486. NI (35,000 − 12,570) × 8% = 1,794.40. Take-home 35,000 − 4,486 − 1,794.40 = 28,719.60; a month 2,393.30.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 35000, region: "england-wales-ni", plan: "none", posgrado: false, pension: 0, tipoPension: "net-pay" },
    esperado: { impuesto: 4486, ni: 1794.4, anual: 28719.6, mensual: 2393.3, marginal: 20 },
  },
  {
    nombre: "£35,000 in Scotland",
    origen: {
      tipo: "recalculado",
      detalle: "Taxable 22,430: 3,967 × 19% = 753.73; 12,989 × 20% = 2,597.80; 5,474 × 21% = 1,149.54; tax 4,501.07. NI 1,794.40. Take-home 28,704.53.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 35000, region: "scotland", plan: "none", posgrado: false, pension: 0, tipoPension: "net-pay" },
    esperado: { impuesto: 4501.07, ni: 1794.4, anual: 28704.53, marginal: 21 },
  },
  {
    nombre: "£110,000 with Plan 2 and 5% salary sacrifice",
    origen: {
      tipo: "recalculado",
      detalle: "Pay after sacrifice 104,500. Allowance 12,570 − 4,500/2 = 10,320. Taxable 94,180: 37,700 × 20% = 7,540 + 56,480 × 40% = 22,592, tax 30,132. NI 37,700 × 8% = 3,016 + 54,230 × 2% = 1,084.60. Plan 2 (104,500 − 29,385) × 9% = 6,760.35. Take-home 63,507.05.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 110000, region: "england-wales-ni", plan: "plan-2", posgrado: false, pension: 5, tipoPension: "salary-sacrifice" },
    esperado: { allowance: 10320, impuesto: 30132, ni: 4100.6, prestamo: 6760.35, pagoPension: 0, anual: 63507.05, marginal: 40 },
  },
  {
    nombre: "£30,000 with Plan 1, Postgraduate Loan and 5% net pay pension",
    origen: {
      tipo: "recalculado",
      detalle: "Pension 1,500. Taxable 28,500 − 12,570 = 15,930 × 20% = 3,186. NI (30,000 − 12,570) × 8% = 1,394.40. Plan 1 (30,000 − 26,900) × 9% = 279. PGL (30,000 − 21,000) × 6% = 540. Take-home 30,000 − 3,186 − 1,394.40 − 279 − 540 − 1,500 = 23,100.60.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 30000, region: "england-wales-ni", plan: "plan-1", posgrado: true, pension: 5, tipoPension: "net-pay" },
    esperado: { impuesto: 3186, ni: 1394.4, prestamo: 279, posgrado: 540, pagoPension: 1500, anual: 23100.6 },
  },
  {
    nombre: "Relief at source pension",
    origen: {
      tipo: "recalculado",
      detalle: "Tax on the full 35,000 = 4,486, NI 1,794.40. Pension 5% = 1,750 gross, you pay 80% = 1,400. Take-home 35,000 − 4,486 − 1,794.40 − 1,400 = 27,319.60.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 35000, region: "england-wales-ni", plan: "none", posgrado: false, pension: 5, tipoPension: "relief-at-source" },
    esperado: { pagoPension: 1400, anual: 27319.6 },
  },
  {
    nombre: "Zero salary",
    origen: { tipo: "recalculado", detalle: "A salary of 0 is not a valid input." },
    fecha: "2026-10-14",
    entrada: { salario: 0, region: "england-wales-ni", plan: "none", posgrado: false, pension: 0, tipoPension: "net-pay" },
    esperaError: true,
  },
]);
