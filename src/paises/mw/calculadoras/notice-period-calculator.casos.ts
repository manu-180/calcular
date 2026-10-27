import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Monthly pay: one month",
    origen: { tipo: "recalculado", detalle: "Employment Act s. 29(1)(a): one month's notice. From 31 January the month ends on 28 February." },
    fecha: "2026-10-27",
    entrada: { pago: "mensual", meses: 3, fecha: "2026-01-31" },
    esperado: { periodo: "One month", fin: "2026-02-28" },
  },
  {
    nombre: "Fortnightly pay, three years: one fortnight",
    origen: { tipo: "recalculado", detalle: "s. 29(1)(b)(i): less than five years, one fortnight." },
    fecha: "2026-10-27",
    entrada: { pago: "quincenal", meses: 36, fecha: "2026-10-27" },
    esperado: { periodo: "One fortnight", dias: 14, fin: "2026-11-10" },
  },
  {
    nombre: "Weekly pay, one year: one week",
    origen: { tipo: "recalculado", detalle: "s. 29(1)(c)(i): less than two years, one week." },
    fecha: "2026-10-27",
    entrada: { pago: "semanal", meses: 12, fecha: "2026-10-27" },
    esperado: { periodo: "One week", dias: 7 },
  },
  {
    nombre: "Weekly pay, five years: one month",
    origen: { tipo: "recalculado", detalle: "s. 29(1)(c)(iii): at least five years, one month." },
    fecha: "2026-10-27",
    entrada: { pago: "semanal", meses: 60, fecha: "2026-10-27" },
    esperado: { periodo: "One month", fin: "2026-11-27" },
  },
  {
    nombre: "Daily pay, four months: one day",
    origen: { tipo: "recalculado", detalle: "s. 29(1)(d)(i): less than six months, one day." },
    fecha: "2026-10-27",
    entrada: { pago: "diario", meses: 4, fecha: "2026-10-27" },
    esperado: { periodo: "One day", dias: 1, fin: "2026-10-28" },
  },
  {
    nombre: "Daily pay, three years: one fortnight",
    origen: { tipo: "recalculado", detalle: "s. 29(1)(d)(iii): two to five years, one fortnight." },
    fecha: "2026-10-27",
    entrada: { pago: "diario", meses: 36, fecha: "2026-10-27" },
    esperado: { periodo: "One fortnight", dias: 14 },
  },
  {
    nombre: "Fixed-term contract: fourteen days",
    origen: { tipo: "recalculado", detalle: "s. 29(3): fourteen calendar days." },
    fecha: "2026-10-27",
    entrada: { pago: "plazo", meses: 8, fecha: "2026-10-27" },
    esperado: { periodo: "14 calendar days", dias: 14, fin: "2026-11-10" },
  },
]);
