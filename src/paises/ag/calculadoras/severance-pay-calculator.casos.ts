import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Five years on EC$3,300",
    origen: { tipo: "recalculado", url: "https://laws.gov.ag/wp-content/uploads/2018/08/cap-27.pdf", detalle: "Section C41: 60 months x 1 day. A day's pay 3,300 / 22 = 150. 60 x 150 = 9,000." },
    fecha: "2026-10-29",
    entrada: { salario: 3300, diasLaborales: 22, anios: 5, meses: 0, fraccion: false },
    esperado: { mesesPago: 60, pagoDiario: 150, indemnizacion: 9000 },
  },
  {
    nombre: "Two years, 3 months and more than half a month",
    origen: { tipo: "recalculado", detalle: "27 months plus a major fraction = 28 months. Day 4,400 / 22 = 200. 28 x 200 = 5,600." },
    fecha: "2026-10-29",
    entrada: { salario: 4400, diasLaborales: 22, anios: 2, meses: 3, fraccion: true },
    esperado: { mesesPago: 28, indemnizacion: 5600 },
  },
  {
    nombre: "Under one year gets nothing",
    origen: { tipo: "recalculado", detalle: "Section C40 requires service exceeding one year." },
    fecha: "2026-10-29",
    entrada: { salario: 3300, diasLaborales: 22, anios: 0, meses: 10, fraccion: false },
    esperado: { mesesPago: 0, indemnizacion: 0 },
  },
]);
