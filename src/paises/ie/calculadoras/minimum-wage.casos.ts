import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

const WRC = "https://www.workplacerelations.ie/en/what_you_should_know/hours-and-wages/national%20minimum%20wage/";

export default definirCasos(calculadora, [
  {
    nombre: "Adult rate, 39 hours a week",
    origen: { tipo: "recalculado", detalle: "€14.15 × 39 = 551.85 a week, × 52 = 28,696.20 a year, 2,391.35 a month." },
    fecha: "2026-10-14",
    entrada: { edad: "age-20-plus", horas: 39, tuPaga: null },
    esperado: { hora: 14.15, semanal: 551.85, anual: 28696.2, mensual: 2391.35 },
  },
  {
    nombre: "Under 18",
    origen: { tipo: "oficial", url: WRC, detalle: "WRC table from 1 January 2026: under 18, €9.91 (70%)." },
    fecha: "2026-10-14",
    entrada: { edad: "under-18", horas: 20, tuPaga: null },
    esperado: { hora: 9.91, porcentaje: 70 },
  },
  {
    nombre: "18 years old",
    origen: { tipo: "oficial", url: WRC, detalle: "WRC table: 18 years old, €11.32 (80%)." },
    fecha: "2026-10-14",
    entrada: { edad: "age-18", horas: 20, tuPaga: null },
    esperado: { hora: 11.32 },
  },
  {
    nombre: "19 years old, paid below the minimum",
    origen: { tipo: "oficial", url: WRC, detalle: "WRC table: 19 years old, €12.74 (90%). Paid €12.50, so €0.24 short." },
    fecha: "2026-10-14",
    entrada: { edad: "age-19", horas: 30, tuPaga: 12.5 },
    esperado: { hora: 12.74, diferencia: -0.24 },
  },
  {
    nombre: "Zero hours",
    origen: { tipo: "recalculado", detalle: "Weekly hours must be above zero." },
    fecha: "2026-10-14",
    entrada: { edad: "age-20-plus", horas: 0, tuPaga: null },
    esperaError: true,
  },
]);
