import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

const URL = "https://www.gov.uk/redundancy-your-rights/notice-periods";

export default definirCasos(calculadora, [
  {
    nombre: "Six months of work",
    origen: { tipo: "oficial", url: URL, detalle: "At least one week's notice if employed between one month and 2 years." },
    fecha: "2026-10-14",
    entrada: { anios: 0, meses: 6, semanal: null },
    esperado: { semanas: 1, tuPreaviso: 1 },
  },
  {
    nombre: "Seven years with pay in lieu",
    origen: { tipo: "oficial", url: URL, detalle: "One week's notice for each year between 2 and 12 years: 7 weeks × £550 = £3,850." },
    fecha: "2026-10-14",
    entrada: { anios: 7, meses: 4, semanal: 550 },
    esperado: { semanas: 7, pago: 3850 },
  },
  {
    nombre: "Twenty years is capped at 12 weeks",
    origen: { tipo: "oficial", url: URL, detalle: "12 weeks' notice if employed for 12 years or more." },
    fecha: "2026-10-14",
    entrada: { anios: 20, meses: 0, semanal: null },
    esperado: { semanas: 12 },
  },
  {
    nombre: "No service entered",
    origen: { tipo: "recalculado", detalle: "Under a month there is no statutory notice." },
    fecha: "2026-10-14",
    entrada: { anios: 0, meses: 0, semanal: null },
    esperaError: true,
  },
]);
