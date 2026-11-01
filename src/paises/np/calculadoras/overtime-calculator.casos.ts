import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

const ACT = "https://ssf.gov.np/images/news/16430171669623_labor-act-2074.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "NPR 30,000 a month, 10 overtime hours",
    origen: { tipo: "recalculado", url: ACT, detalle: "Hourly basic 30,000 / (30 × 8) = 125. Overtime 125 × 1.5 × 10 = 1,875." },
    fecha: "2026-10-29",
    entrada: { modo: "monthly", mensual: 30000, diasPagados: 30, hora: null, horas: 10, horasDia: null, horasSemana: null },
    esperado: { total: 1875, base: 125, tarifa: 187.5 },
  },
  {
    nombre: "Hourly worker with 4 hours",
    origen: { tipo: "recalculado", url: ACT, detalle: "200 × 1.5 × 4 = 1,200." },
    fecha: "2026-10-29",
    entrada: { modo: "hourly", mensual: null, diasPagados: null, hora: 200, horas: 4, horasDia: 5, horasSemana: 30 },
    esperado: { total: 1200, tarifa: 300 },
  },
  {
    nombre: "No hourly pay",
    origen: { tipo: "recalculado", detalle: "Hourly pay has to be more than zero." },
    fecha: "2026-10-29",
    entrada: { modo: "hourly", mensual: null, diasPagados: null, hora: 0, horas: 4, horasDia: null, horasSemana: null },
    esperaError: true,
  },
]);
