import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-benefit";

export default definirCasos(calculadora, [
  {
    nombre: "Leave from 2 November 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.ie/en/department-of-social-protection/services/maternity-benefit/",
      detalle: "€299 a week for 26 weeks = €7,774. 26 weeks from 2 November 2026 end on 2 May 2027; 16 more unpaid weeks end on 22 August 2027.",
    },
    fecha: "2026-10-14",
    entrada: { inicio: "2026-11-02", sueldo: null },
    esperado: { semanal: 299, semanas: 26, total: 7774, fin: "2027-05-02", finSinPago: "2027-08-22" },
  },
  {
    nombre: "Compared with €650 a week",
    origen: { tipo: "recalculado", detalle: "650 − 299 = 351 a week less than normal pay." },
    fecha: "2026-10-14",
    entrada: { inicio: "2026-10-19", sueldo: 650 },
    esperado: { diferencia: 351 },
  },
]);
