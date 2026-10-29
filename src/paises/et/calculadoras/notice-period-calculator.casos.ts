import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

const base = { motivo: "general", prueba: true } as const;

export default definirCasos(calculadora, [
  {
    nombre: "Eight months of service",
    origen: { tipo: "recalculado", detalle: "Article 35(1)(a): up to one year, one month." },
    fecha: "2026-10-27",
    entrada: { ...base, anios: 0, meses: 8 },
    esperado: { meses: 1 },
  },
  {
    nombre: "Exactly one year",
    origen: { tipo: "recalculado", detalle: "Not exceeding one year: one month." },
    fecha: "2026-10-27",
    entrada: { ...base, anios: 1, meses: 0 },
    esperado: { meses: 1 },
  },
  {
    nombre: "One year and one month",
    origen: { tipo: "recalculado", detalle: "Article 35(1)(b): above one year, two months." },
    fecha: "2026-10-27",
    entrada: { ...base, anios: 1, meses: 1 },
    esperado: { meses: 2 },
  },
  {
    nombre: "Exactly nine years",
    origen: { tipo: "recalculado", detalle: "Not exceeding nine years: two months." },
    fecha: "2026-10-27",
    entrada: { ...base, anios: 9, meses: 0 },
    esperado: { meses: 2 },
  },
  {
    nombre: "Nine years and one month",
    origen: { tipo: "recalculado", detalle: "Article 35(1)(c): more than nine years, three months." },
    fecha: "2026-10-27",
    entrada: { ...base, anios: 9, meses: 1 },
    esperado: { meses: 3 },
  },
  {
    nombre: "Redundancy after 15 years",
    origen: { tipo: "recalculado", detalle: "Article 35(1)(d): two months whatever the service." },
    fecha: "2026-10-27",
    entrada: { anios: 15, meses: 0, motivo: "redundancy", prueba: true },
    esperado: { meses: 2 },
  },
  {
    nombre: "On probation",
    origen: { tipo: "recalculado", detalle: "Article 11(5) and (6): no notice during probation." },
    fecha: "2026-10-27",
    entrada: { anios: 0, meses: 1, motivo: "general", prueba: false },
    esperado: { meses: 0 },
  },
]);
