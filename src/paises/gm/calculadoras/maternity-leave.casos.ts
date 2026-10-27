import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Maternity leave from 1 November 2026",
    origen: { tipo: "recalculado", detalle: "Labour Act 2023, s. 62(1): six months with pay. 1 Nov 2026 + 6 months = 1 May 2027, last day 30 April 2027. Pay 6 × 12,000." },
    fecha: "2026-10-27",
    entrada: { tipo: "maternidad", inicio: "2026-11-01", salario: 12000 },
    esperado: { ultimo: "2027-04-30", regreso: "2027-05-01", meses: 6, pago: 72000 },
  },
  {
    nombre: "Maternity leave from 31 August",
    origen: { tipo: "recalculado", detalle: "31 Aug 2026 + 6 months = 28 Feb 2027 (no 31 February), last day 27 Feb 2027." },
    fecha: "2026-10-27",
    entrada: { tipo: "maternidad", inicio: "2026-08-31", salario: 0 },
    esperado: { regreso: "2027-02-28", ultimo: "2027-02-27" },
  },
  {
    nombre: "Paternity leave from Monday 2 November 2026",
    origen: { tipo: "recalculado", detalle: "s. 63: ten working days. Monday 2 Nov to Friday 13 Nov 2026; back on Monday 16 Nov." },
    fecha: "2026-10-27",
    entrada: { tipo: "paternidad", inicio: "2026-11-02", salario: 10000 },
    esperado: { ultimo: "2026-11-13", regreso: "2026-11-16", dias: 10 },
  },
  {
    nombre: "Paternity leave asked from a Saturday",
    origen: { tipo: "recalculado", detalle: "Saturday 31 Oct 2026: counting starts on Monday 2 Nov, ends Friday 13 Nov." },
    fecha: "2026-10-27",
    entrada: { tipo: "paternidad", inicio: "2026-10-31", salario: 10000 },
    esperado: { ultimo: "2026-11-13" },
  },
]);
