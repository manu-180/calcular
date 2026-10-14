import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

const DOL = "https://www.dol.gov/agencies/whd/minimum-wage/state" as const;

export default definirCasos(calculadora, [
  {
    nombre: "California, full time",
    origen: { tipo: "recalculado", url: DOL, detalle: "16.90 x 40 = 676 a week; x 52 = 35152 a year; 35152 / 12 = 2929.33 a month." },
    fecha: "2026-10-14",
    entrada: { estado: "california", horas: 40 },
    esperado: { federal: 7.25, estatal: 16.9, aplicable: 16.9, semanal: 676, mensual: 2929.33, anual: 35152 },
  },
  {
    nombre: "Florida the day before the September 2026 raise",
    origen: { tipo: "recalculado", url: "https://www.flsenate.gov/Laws/Constitution", detalle: "14.00 until September 29, 2026." },
    fecha: "2026-09-29",
    entrada: { estado: "florida", horas: 40 },
    esperado: { aplicable: 14, semanal: 560 },
  },
  {
    nombre: "Florida the day the raise starts",
    origen: { tipo: "recalculado", url: "https://www.flsenate.gov/Laws/Constitution", detalle: "15.00 from September 30, 2026." },
    fecha: "2026-09-30",
    entrada: { estado: "florida", horas: 40 },
    esperado: { aplicable: 15, semanal: 600 },
  },
  {
    nombre: "Alabama has no state minimum wage",
    origen: { tipo: "recalculado", url: DOL, detalle: "The federal 7.25 applies. Part time, 20 hours: 145 a week." },
    fecha: "2026-10-14",
    entrada: { estado: "alabama", horas: 20 },
    esperado: { estatal: null, aplicable: 7.25, semanal: 145 },
  },
  {
    nombre: "Georgia's state rate is below the federal one",
    origen: { tipo: "recalculado", url: DOL, detalle: "Georgia 5.15, federal 7.25 applies." },
    fecha: "2026-10-14",
    entrada: { estado: "georgia", horas: 40 },
    esperado: { estatal: 5.15, aplicable: 7.25, semanal: 290 },
  },
  {
    nombre: "New York City area",
    origen: { tipo: "recalculado", url: DOL, detalle: "17.00 x 35 = 595." },
    fecha: "2026-10-14",
    entrada: { estado: "new-york-city-area", horas: 35 },
    esperado: { aplicable: 17, semanal: 595 },
  },
]);
