import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay-calculator";

const ORIGEN = "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/employment-act-1995-2010-edition/download";

export default definirCasos(calculadora, [
  {
    nombre: "Redundancy after 5 years",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Section 47(2)(b)(i): five-sixths of one day's wage for each completed month. Day's wage 22,000 ÷ 22 = 1,000. 1,000 × 5/6 × 60 = 50,000." },
    fecha: "2026-10-29",
    entrada: { motivo: "termination", contrato: "continuous", meses: 60, salario: 22000, diasMes: 22 },
    esperado: { compensacion: 50000, diaria: 1000, diasPagados: 50 },
  },
  {
    nombre: "Fixed-term contract, 12 months",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Section 47(2)(b)(ii): double the rate for fixed-term contracts. 1,000 × 5/6 × 12 × 2 = 20,000." },
    fecha: "2026-10-29",
    entrada: { motivo: "termination", contrato: "fixed", meses: 12, salario: 22000, diasMes: 22 },
    esperado: { compensacion: 20000, diasPagados: 20 },
  },
  {
    nombre: "Resignation after 4 years",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Section 62A(1): compensation on resignation needs not less than five years of continuous service. 48 months is below 60." },
    fecha: "2026-10-29",
    entrada: { motivo: "resignation", contrato: "continuous", meses: 48, salario: 22000, diasMes: 22 },
    esperado: { compensacion: 0 },
  },
  {
    nombre: "Resignation after 6 years",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Section 62A(1) pays the section 47(2)(b) rate: 1,000 × 5/6 × 72 = 60,000." },
    fecha: "2026-10-29",
    entrada: { motivo: "resignation", contrato: "continuous", meses: 72, salario: 22000, diasMes: 22 },
    esperado: { compensacion: 60000 },
  },
]);
