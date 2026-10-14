import { definirCasos } from "@/motor/calculo";
import calculadora from "./public-holiday-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Working the public holiday on €600 over 5 days",
    origen: { tipo: "recalculado", detalle: "Daily pay 600 / 5 = 120, so the extra day's pay is €120." },
    fecha: "2026-10-14",
    entrada: { semanal: 600, diasSemana: 5, situacion: "worked", parcial: false, horas5: 0 },
    esperado: { beneficio: 120, diario: 120 },
  },
  {
    nombre: "Not rostered, €400 a week",
    origen: {
      tipo: "oficial",
      url: "https://www.workplacerelations.ie/en/what_you_should_know/public-holidays/",
      detalle: "WRC: an employee not normally rostered gets one-fifth of normal weekly wage extra. 400 / 5 = 80.",
    },
    fecha: "2026-10-14",
    entrada: { semanal: 400, diasSemana: 3, situacion: "not-rostered", parcial: true, horas5: 60 },
    esperado: { beneficio: 80 },
  },
  {
    nombre: "Part-time with 30 hours in 5 weeks",
    origen: { tipo: "recalculado", detalle: "Part-time workers need 40 hours in the previous 5 weeks: no benefit yet." },
    fecha: "2026-10-14",
    entrada: { semanal: 300, diasSemana: 2, situacion: "day-off", parcial: true, horas5: 30 },
    esperado: { beneficio: 0 },
  },
  {
    nombre: "Day off on a 4-day week",
    origen: { tipo: "recalculado", detalle: "Normal day's pay: 520 / 4 = 130." },
    fecha: "2026-10-14",
    entrada: { semanal: 520, diasSemana: 4, situacion: "day-off", parcial: false, horas5: 0 },
    esperado: { beneficio: 130 },
  },
]);
