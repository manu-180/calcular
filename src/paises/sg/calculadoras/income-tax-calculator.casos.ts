import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

const IRAS = "https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-residency-and-tax-rates/individual-income-tax-rates";

export default definirCasos(calculadora, [
  {
    nombre: "$72,000 with only Earned Income Relief",
    origen: { tipo: "recalculado", url: IRAS, detalle: "72,000 − 1,000 EIR = 71,000. Tax on first 40,000 = 550, next 31,000 × 7% = 2,170. Total 2,720." },
    fecha: "2026-10-14",
    entrada: { ingreso: 72000, edad: "menos-55", cpf: 0, otros: 0 },
    esperado: { impuesto: 2720, gravable: 71000, marginal: 7 },
  },
  {
    nombre: "$120,000 with CPF relief",
    origen: { tipo: "recalculado", url: IRAS, detalle: "Reliefs 1,000 + 14,400 = 15,400. Chargeable 104,600. First 80,000 = 3,350, next 24,600 × 11.5% = 2,829. Total 6,179." },
    fecha: "2026-10-14",
    entrada: { ingreso: 120000, edad: "menos-55", cpf: 14400, otros: 0 },
    esperado: { impuesto: 6179, gravable: 104600 },
  },
  {
    nombre: "IRAS table: first $1,000,000",
    origen: { tipo: "oficial", url: IRAS, detalle: "Gross tax payable on the first $1,000,000 is $199,150 (from YA 2024 onwards)." },
    fecha: "2026-10-14",
    entrada: { ingreso: 1001000, edad: "menos-55", cpf: 0, otros: 0 },
    esperado: { impuesto: 199150, gravable: 1000000 },
  },
  {
    nombre: "Reliefs capped at $80,000",
    origen: { tipo: "recalculado", detalle: "Reliefs 1,000 + 100,000 = 101,000, capped at 80,000. Chargeable 220,000. First 200,000 = 21,150, next 20,000 × 19% = 3,800. Total 24,950." },
    fecha: "2026-10-14",
    entrada: { ingreso: 300000, edad: "menos-55", cpf: 0, otros: 100000 },
    esperado: { impuesto: 24950, alivios: 80000 },
  },
  {
    nombre: "Aged 60 with $8,000 Earned Income Relief",
    origen: { tipo: "recalculado", detalle: "50,000 − 8,000 = 42,000. 550 + 2,000 × 7% = 690." },
    fecha: "2026-10-14",
    entrada: { ingreso: 50000, edad: "60-y-mas", cpf: 0, otros: 0 },
    esperado: { impuesto: 690 },
  },
  {
    nombre: "Below the taxable threshold",
    origen: { tipo: "recalculado", detalle: "20,000 − 1,000 = 19,000, inside the 0% band." },
    fecha: "2026-10-14",
    entrada: { ingreso: 20000, edad: "menos-55", cpf: 0, otros: 0 },
    esperado: { impuesto: 0 },
  },
]);
