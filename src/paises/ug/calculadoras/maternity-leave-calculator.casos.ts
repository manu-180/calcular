import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Maternity leave from Monday 2 November 2026, five-day week",
    origen: {
      tipo: "recalculado",
      url: "https://media.ulii.org/media/legislation/111709/source_file/ae0785212ae9a6b7/2006-6.pdf",
      detalle: "Section 55(1): 60 working days = 12 weeks of Monday to Friday, ending Friday 22 January 2027 (82 calendar days). Pay 60 × 1,000,000 × 12 / 260 = 2,769,230.77.",
    },
    fecha: "2026-10-24",
    entrada: { tipo: "maternity", inicio: "2026-11-02", semana: "5", mensual: 1000000 },
    esperado: { fin: "2027-01-22", dias: 60, corridos: 82, pago: 2769231 },
  },
  {
    nombre: "Maternity leave on a six-day week",
    origen: { tipo: "recalculado", detalle: "60 days = 10 weeks of Monday to Saturday, ending Saturday 9 January 2027 (69 calendar days)." },
    fecha: "2026-10-24",
    entrada: { tipo: "maternity", inicio: "2026-11-02", semana: "6", mensual: 1000000 },
    esperado: { fin: "2027-01-09", corridos: 69 },
  },
  {
    nombre: "Paternity leave from Thursday 29 October 2026",
    origen: { tipo: "recalculado", detalle: "Section 56(1): 4 working days: Thursday, Friday, Monday 2 and Tuesday 3 November." },
    fecha: "2026-10-24",
    entrada: { tipo: "paternity", inicio: "2026-10-29", semana: "5", mensual: 1300000 },
    esperado: { fin: "2026-11-03", dias: 4, corridos: 6, pago: 240000 },
  },
  {
    nombre: "Leave starting on a Sunday",
    origen: { tipo: "recalculado", detalle: "Counting starts on Monday 2 November: 4 days end Thursday 5 November. Calendar days from Sunday 1 November: 5." },
    fecha: "2026-10-24",
    entrada: { tipo: "paternity", inicio: "2026-11-01", semana: "6", mensual: 1300000 },
    esperado: { fin: "2026-11-05", corridos: 5 },
  },
]);
