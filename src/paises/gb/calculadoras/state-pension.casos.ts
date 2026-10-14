import { definirCasos } from "@/motor/calculo";
import calculadora from "./state-pension";

export default definirCasos(calculadora, [
  {
    nombre: "Full new State Pension",
    origen: { tipo: "oficial", url: "https://www.gov.uk/new-state-pension/what-youll-get", detalle: "The full rate is £241.30 a week with 35 qualifying years. Every 4 weeks 965.20; a year 12,547.60." },
    fecha: "2026-10-14",
    entrada: { anios: 35 },
    esperado: { semanal: 241.3, cuatroSemanas: 965.2, anual: 12547.6, faltan: 0 },
  },
  {
    nombre: "20 qualifying years",
    origen: {
      tipo: "recalculado",
      url: "https://www.gov.uk/new-state-pension/how-its-calculated",
      detalle: "GOV.UK method: full rate divided by 35 and multiplied by the qualifying years. 241.30 / 35 × 20 = 137.89; a year 7,170.28.",
    },
    fecha: "2026-10-14",
    entrada: { anios: 20 },
    esperado: { semanal: 137.89, anual: 7170.28, faltan: 15 },
  },
  {
    nombre: "Fewer than 10 years",
    origen: { tipo: "oficial", url: "https://www.gov.uk/new-state-pension/eligibility", detalle: "You need 10 qualifying years to get any new State Pension." },
    fecha: "2026-10-14",
    entrada: { anios: 9 },
    esperado: { semanal: 0 },
  },
  {
    nombre: "More than 35 years",
    origen: { tipo: "recalculado", detalle: "Years above 35 do not add more: 241.30." },
    fecha: "2026-10-14",
    entrada: { anios: 42 },
    esperado: { semanal: 241.3 },
  },
]);
