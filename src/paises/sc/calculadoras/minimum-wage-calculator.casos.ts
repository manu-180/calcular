import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Regular worker, 40 hours a week",
    origen: { tipo: "oficial", url: "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/si-16-2025-employment-national-minimum-wage-amendment-regulations-2025/download", detalle: "S.I. 16 of 2025 sets SR40.95 an hour. 40.95 × 40 = 1,638 a week and 1,638 × 52 ÷ 12 = 7,098 a month." },
    fecha: "2026-10-29",
    entrada: { contrato: "regular", horasSemana: 40, pagaHora: null },
    esperado: { hora: 40.95, semana: 1638, mes: 7098 },
  },
  {
    nombre: "Casual worker, 40 hours a week",
    origen: { tipo: "oficial", url: "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/si-16-2025-employment-national-minimum-wage-amendment-regulations-2025/download", detalle: "S.I. 16 of 2025 sets SR47.19 an hour for casual workers. 47.19 × 40 = 1,887.60 a week; × 52 ÷ 12 = 8,179.60." },
    fecha: "2026-10-29",
    entrada: { contrato: "casual", horasSemana: 40, pagaHora: null },
    esperado: { hora: 47.19, semana: 1887.6, mes: 8179.6 },
  },
  {
    nombre: "Paid below the minimum",
    origen: { tipo: "recalculado", detalle: "40.95 − 38 = 2.95 short an hour. 2.95 × 40 × 52 ÷ 12 = 511.33 a month." },
    fecha: "2026-10-29",
    entrada: { contrato: "regular", horasSemana: 40, pagaHora: 38 },
    esperado: { faltaHora: 2.95, faltaMes: 511.33 },
  },
]);
