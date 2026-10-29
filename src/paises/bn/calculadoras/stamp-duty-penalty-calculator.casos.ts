import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-penalty-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Presented after 14 days, duty of BND 400",
    origen: { tipo: "recalculado", detalle: "Double the duty is 800, above the minimum of 10, so the penalty is 800." },
    fecha: "2026-10-29",
    entrada: { duty: 400, retraso: "early" },
    esperado: { penalizacion: 800, total: 1200 },
  },
  {
    nombre: "Presented after 14 days, duty of BND 3",
    origen: { tipo: "recalculado", detalle: "Double the duty is 6, below the minimum of 10, so the penalty is 10." },
    fecha: "2026-10-29",
    entrada: { duty: 3, retraso: "early" },
    esperado: { penalizacion: 10, total: 13 },
  },
  {
    nombre: "Presented after 3 months, duty of BND 400",
    origen: { tipo: "recalculado", detalle: "Four times the duty is 1,600, above the minimum of 25." },
    fecha: "2026-10-29",
    entrada: { duty: 400, retraso: "late" },
    esperado: { penalizacion: 1600, total: 2000 },
  },
  {
    nombre: "Presented after 3 months, duty of BND 5",
    origen: { tipo: "recalculado", detalle: "Four times the duty is 20, below the minimum of 25, so the penalty is 25." },
    fecha: "2026-10-29",
    entrada: { duty: 5, retraso: "late" },
    esperado: { penalizacion: 25, total: 30 },
  },
  {
    nombre: "Presented in time",
    origen: { tipo: "oficial", url: "https://www.mof.gov.bn/div_revenue_typesoftaxes_stampduty/", detalle: "No penalty applies within 14 days." },
    fecha: "2026-10-29",
    entrada: { duty: 400, retraso: "ontime" },
    esperado: { penalizacion: 0, total: 400 },
  },
]);
