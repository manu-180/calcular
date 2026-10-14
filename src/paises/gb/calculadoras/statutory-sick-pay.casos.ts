import { definirCasos } from "@/motor/calculo";
import calculadora from "./statutory-sick-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Daily rate with 7 qualifying days",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027",
      detalle: "HMRC: £123.25 a week is £17.61 a day for 7 qualifying days.",
    },
    fecha: "2026-10-14",
    entrada: { semanal: 600, diasSemana: 7, diasEnfermo: 1 },
    esperado: { semanal: 123.25, diaria: 17.61, total: 17.61 },
  },
  {
    nombre: "Two weeks off on £500 a week",
    origen: { tipo: "recalculado", detalle: "80% of 500 = 400, higher than 123.25, so 123.25 a week. 10 days / 5 = 2 weeks = 246.50." },
    fecha: "2026-10-14",
    entrada: { semanal: 500, diasSemana: 5, diasEnfermo: 10 },
    esperado: { semanal: 123.25, total: 246.5 },
  },
  {
    nombre: "Low earner paid 80%",
    origen: { tipo: "recalculado", detalle: "80% of 100 = 80, lower than 123.25. 5 days of a 5-day week = 80." },
    fecha: "2026-10-14",
    entrada: { semanal: 100, diasSemana: 5, diasEnfermo: 5 },
    esperado: { semanal: 80, total: 80 },
  },
  {
    nombre: "Absence longer than 28 weeks",
    origen: { tipo: "recalculado", detalle: "28 weeks × 5 days = 140 days paid. 140 / 5 × 123.25 = 3,451." },
    fecha: "2026-10-14",
    entrada: { semanal: 500, diasSemana: 5, diasEnfermo: 160 },
    esperado: { dias: 140, total: 3451 },
  },
]);
