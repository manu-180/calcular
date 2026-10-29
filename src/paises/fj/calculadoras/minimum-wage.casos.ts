import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "40 hours a week at the FJ$5.00 minimum",
    origen: { tipo: "recalculado", url: "https://www.fiji.gov.fj/2024-2025-national-budget-address/", detalle: "5.00 × 40 = 200 a week. × 52 / 12 = 866.67 a month. × 52 = 10,400 a year." },
    fecha: "2026-10-29",
    entrada: { horas: 40, tarifa: null },
    esperado: { hora: 5, semana: 200, mes: 866.67, anio: 10400 },
  },
  {
    nombre: "Paid FJ$4.20 an hour",
    origen: { tipo: "recalculado", detalle: "4.20 − 5.00 = −0.80 an hour." },
    fecha: "2026-10-29",
    entrada: { horas: 45, tarifa: 4.2 },
    esperado: { hora: 5, semana: 225, diferenciaHora: -0.8 },
  },
  {
    nombre: "The FJ$4.50 step before 1 April 2025",
    origen: { tipo: "recalculado", url: "https://www.fiji.gov.fj/2024-2025-national-budget-address/", detalle: "4.50 × 40 = 180 a week." },
    fecha: "2025-03-31",
    entrada: { horas: 40, tarifa: null },
    esperado: { hora: 4.5, semana: 180 },
  },
  {
    nombre: "First day of the FJ$5.00 rate",
    origen: { tipo: "recalculado", detalle: "5.00 × 40 = 200 a week from 1 April 2025." },
    fecha: "2025-04-01",
    entrada: { horas: 40, tarifa: null },
    esperado: { hora: 5, semana: 200 },
  },
]);
