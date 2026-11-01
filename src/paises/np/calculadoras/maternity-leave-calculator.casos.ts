import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

const ACT = "https://ssf.gov.np/images/news/16430171669623_labor-act-2074.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Maternity leave from 1 December 2026",
    origen: { tipo: "recalculado", url: ACT, detalle: "14 weeks = 98 days. The last day is 97 days after 1 December: 8 March 2027. The first 60 days end on 29 January 2027." },
    fecha: "2026-10-29",
    entrada: { quien: "mother", inicio: "2026-12-01", extra: false },
    esperado: { dias: 98, diasPagados: 60, fin: "2027-03-08", finPago: "2027-01-29", regreso: "2027-03-09" },
  },
  {
    nombre: "Maternity leave with the extra month",
    origen: { tipo: "recalculado", url: ACT, detalle: "98 + 30 days of paid leave added." },
    fecha: "2026-10-29",
    entrada: { quien: "mother", inicio: "2026-12-01", extra: true },
    esperado: { dias: 128, diasPagados: 90, fin: "2027-04-07" },
  },
  {
    nombre: "Paternity care leave",
    origen: { tipo: "recalculado", url: ACT, detalle: "15 days from 10 December: last day 24 December." },
    fecha: "2026-10-29",
    entrada: { quien: "father", inicio: "2026-12-10", extra: null },
    esperado: { dias: 15, fin: "2026-12-24" },
  },
]);
