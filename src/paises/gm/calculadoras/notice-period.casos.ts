import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

export default definirCasos(calculadora, [
  {
    nombre: "Monthly paid employee with three years",
    origen: { tipo: "recalculado", detalle: "Labour Act 2023, s. 91(1)(a): one month. 1 November 2026 + 1 month = 1 December 2026." },
    fecha: "2026-10-27",
    entrada: { quien: "empleador", motivo: "normal", contrato: "indefinido", pago: "mensual", anios: 3, aviso: "2026-11-01", salario: 10000 },
    esperado: { meses: 1, fin: "2026-12-01", enLugar: 10000 },
  },
  {
    nombre: "Employer after eight years",
    origen: { tipo: "recalculado", detalle: "s. 91(1)(e): two months for six years or more of continuous service. Pay in lieu 2 × 10,000." },
    fecha: "2026-10-27",
    entrada: { quien: "empleador", motivo: "normal", contrato: "indefinido", pago: "mensual", anios: 8, aviso: "2026-11-01", salario: 10000 },
    esperado: { meses: 2, enLugar: 20000 },
  },
  {
    nombre: "Employee resigning after eight years",
    origen: { tipo: "recalculado", detalle: "s. 91(2): the employee gives not less than one month." },
    fecha: "2026-10-27",
    entrada: { quien: "trabajador", motivo: null, contrato: "indefinido", pago: "mensual", anios: 8, aviso: "2026-11-01", salario: 10000 },
    esperado: { meses: 1 },
  },
  {
    nombre: "Redundancy",
    origen: { tipo: "recalculado", detalle: "s. 93: six months' notice. 31 August 2026 + 6 months = 28 February 2027." },
    fecha: "2026-10-27",
    entrada: { quien: "empleador", motivo: "redundancia", contrato: "indefinido", pago: "mensual", anios: 2, aviso: "2026-08-31", salario: 10000 },
    esperado: { meses: 6, fin: "2027-02-28", enLugar: 60000 },
  },
  {
    nombre: "Weekly paid with three years",
    origen: { tipo: "recalculado", detalle: "s. 91(1)(c)(ii): two weeks. Pay in lieu 5,200 × 12 / 52 × 2 = 2,400." },
    fecha: "2026-10-27",
    entrada: { quien: "empleador", motivo: "normal", contrato: "indefinido", pago: "semanal", anios: 3, aviso: "2026-11-02", salario: 5200 },
    esperado: { semanas: 2, fin: "2026-11-16", enLugar: 2400 },
  },
  {
    nombre: "Daily paid for four months",
    origen: { tipo: "recalculado", detalle: "s. 91(1)(d)(i): one day." },
    fecha: "2026-10-27",
    entrada: { quien: "empleador", motivo: "normal", contrato: "indefinido", pago: "diario", anios: 0.3, aviso: "2026-11-02", salario: 3650 },
    esperado: { dias: 1, fin: "2026-11-03", enLugar: 120 },
  },
  {
    nombre: "Fixed-term contract",
    origen: { tipo: "recalculado", detalle: "s. 91(4): fourteen days." },
    fecha: "2026-10-27",
    entrada: { quien: "trabajador", motivo: null, contrato: "plazo", pago: "mensual", anios: 1, aviso: "2026-11-02", salario: 3650 },
    esperado: { dias: 14, fin: "2026-11-16" },
  },
]);
