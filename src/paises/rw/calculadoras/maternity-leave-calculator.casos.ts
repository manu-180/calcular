import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Leave from 2 November 2026",
    origen: { tipo: "recalculado", detalle: "14 weeks = 98 days: 2 November 2026 + 97 days = 7 February 2027. RSSB weeks start after 6 weeks, on 14 December 2026." },
    fecha: "2026-10-26",
    entrada: { inicio: "2026-11-02", complicaciones: false },
    esperado: { ultimo: "2027-02-07", regreso: "2027-02-08", semanas: 14, empleador: 6, rssb: 8, inicioRssb: "2026-12-14" },
  },
  {
    nombre: "With complications",
    origen: { tipo: "recalculado", detalle: "One more month after 7 February 2027: last day 7 March 2027." },
    fecha: "2026-10-26",
    entrada: { inicio: "2026-11-02", complicaciones: true },
    esperado: { ultimo: "2027-03-07", regreso: "2027-03-08" },
  },
]);
