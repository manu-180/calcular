import { definirCasos } from "@/motor/calculo";
import calculadora from "./holiday-entitlement";

const base = { horas: 37.5, meses: 12, trabajadas: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "Five days a week",
    origen: { tipo: "oficial", url: "https://www.gov.uk/holiday-entitlement-rights", detalle: "A 5-day week gets at least 28 days (5 × 5.6)." },
    fecha: "2026-10-14",
    entrada: { ...base, tipo: "days", dias: 5 },
    esperado: { dias: 28 },
  },
  {
    nombre: "Three days a week",
    origen: { tipo: "oficial", url: "https://www.gov.uk/holiday-entitlement-rights", detalle: "GOV.UK example: 3 days a week get at least 16.8 days (3 × 5.6)." },
    fecha: "2026-10-14",
    entrada: { ...base, tipo: "days", dias: 3 },
    esperado: { dias: 16.8 },
  },
  {
    nombre: "Six days a week is capped",
    origen: { tipo: "oficial", url: "https://www.gov.uk/holiday-entitlement-rights", detalle: "Staff working 6 days a week are only entitled to 28 days." },
    fecha: "2026-10-14",
    entrada: { ...base, tipo: "days", dias: 6 },
    esperado: { dias: 28 },
  },
  {
    nombre: "Irregular hours, 68 hours worked",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.uk/government/publications/simplifying-holiday-entitlement-and-holiday-pay-calculations/holiday-pay-and-entitlement-reforms-from-1-january-2024",
      detalle: "Jill works 68 hours in June: 68 ÷ 100 × 12.07 = 8.2076, which becomes 8 hours.",
    },
    fecha: "2026-10-14",
    entrada: { ...base, tipo: "irregular", dias: 5, trabajadas: 68 },
    esperado: { horas: 8.21, horasRedondeadas: 8 },
  },
  {
    nombre: "37.5 hours over 5 days",
    origen: { tipo: "recalculado", detalle: "37.5 × 5.6 = 210 hours, the same as 28 days of 7.5 hours." },
    fecha: "2026-10-14",
    entrada: { ...base, tipo: "hours", dias: 5 },
    esperado: { horas: 210, dias: 28 },
  },
  {
    nombre: "Starting half way through the year",
    origen: { tipo: "recalculado", detalle: "28 days × 6/12 = 14 days." },
    fecha: "2026-10-14",
    entrada: { ...base, tipo: "days", dias: 5, meses: 6 },
    esperado: { dias: 14 },
  },
]);
