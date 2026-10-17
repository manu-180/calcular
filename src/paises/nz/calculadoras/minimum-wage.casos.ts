import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

const ENZ = "https://www.employment.govt.nz/pay-and-hours/pay-and-wages/minimum-wage/minimum-wage-rates-and-types";

export default definirCasos(calculadora, [
  {
    nombre: "Adult minimum wage, 40 hours",
    origen: { tipo: "oficial", url: ENZ, detalle: "Employment New Zealand: adult $23.95 an hour, $191.60 for an 8-hour day, $958 for a 40-hour week, $1,916 for an 80-hour fortnight." },
    fecha: "2026-10-14",
    entrada: { tipo: "adult", horas: 40 },
    esperado: { hora: 23.95, dia: 191.6, semanal: 958, quincenal: 1916, anual: 49816 },
  },
  {
    nombre: "Starting-out minimum wage, 40 hours",
    origen: { tipo: "oficial", url: ENZ, detalle: "Starting-out $19.16 an hour, $153.28 a day, $766.40 a 40-hour week, $1,532.80 a fortnight." },
    fecha: "2026-10-14",
    entrada: { tipo: "starting-out", horas: 40 },
    esperado: { hora: 19.16, dia: 153.28, semanal: 766.4, quincenal: 1532.8 },
  },
  {
    nombre: "Training wage, 25 hours",
    origen: { tipo: "recalculado", detalle: "19.16 × 25 = 479 a week." },
    fecha: "2026-10-14",
    entrada: { tipo: "training", horas: 25 },
    esperado: { semanal: 479 },
  },
  {
    nombre: "Adult rate the day before the April 2026 rise",
    origen: { tipo: "oficial", url: "https://www.employment.govt.nz/news-and-updates/minimum-wage-is-increasing-on-1-april-2026", detalle: "Before 1 April 2026 the adult minimum wage was $23.50 an hour." },
    fecha: "2026-03-31",
    entrada: { tipo: "adult", horas: 40 },
    esperado: { hora: 23.5, semanal: 940 },
  },
  {
    nombre: "No hours",
    origen: { tipo: "recalculado", detalle: "0 hours a week is not valid." },
    fecha: "2026-10-14",
    entrada: { tipo: "adult", horas: 0 },
    esperaError: true,
  },
]);
