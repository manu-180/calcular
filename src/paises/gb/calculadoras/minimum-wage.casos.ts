import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "National Living Wage from April 2026, full time",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.uk/national-minimum-wage-rates",
      detalle: "21 and over: £12.71 an hour. 37.5 hours: 476.625 → 476.63 a week; 24,784.50 a year; 2,065.38 a month.",
    },
    fecha: "2026-10-14",
    entrada: { grupo: "21-and-over", horas: 37.5, tuPaga: null },
    esperado: { hora: 12.71, semanal: 476.63, anual: 24784.5, mensual: 2065.38 },
  },
  {
    nombre: "Last day of the 2025 rates",
    origen: { tipo: "oficial", url: "https://www.gov.uk/national-minimum-wage-rates", detalle: "April 2025 to March 2026: 21 and over £12.21." },
    fecha: "2026-03-31",
    entrada: { grupo: "21-and-over", horas: 40, tuPaga: null },
    esperado: { hora: 12.21, semanal: 488.4 },
  },
  {
    nombre: "First day of the April 2026 rates, 18 to 20",
    origen: { tipo: "oficial", url: "https://www.gov.uk/national-minimum-wage-rates", detalle: "18 to 20: £10.85 an hour from April 2026." },
    fecha: "2026-04-01",
    entrada: { grupo: "18-to-20", horas: 20, tuPaga: null },
    esperado: { hora: 10.85, semanal: 217 },
  },
  {
    nombre: "Apprentice paid below the minimum",
    origen: { tipo: "recalculado", detalle: "Apprentice rate 8.00; paid 7.50, so 0.50 below." },
    fecha: "2026-10-14",
    entrada: { grupo: "apprentice", horas: 30, tuPaga: 7.5 },
    esperado: { hora: 8, diferencia: -0.5 },
  },
  {
    nombre: "Under 18",
    origen: { tipo: "oficial", url: "https://www.gov.uk/national-minimum-wage-rates", detalle: "Under 18: £8 an hour from April 2026." },
    fecha: "2026-10-14",
    entrada: { grupo: "under-18", horas: 10, tuPaga: null },
    esperado: { hora: 8, semanal: 80 },
  },
]);
