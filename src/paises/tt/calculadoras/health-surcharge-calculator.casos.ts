import { definirCasos } from "@/motor/calculo";
import calculadora from "./health-surcharge-calculator";

const IRD = "https://www.ird.gov.tt/health-surcharge";

export default definirCasos(calculadora, [
  {
    nombre: "TT$8,000 a month, 4 Mondays",
    origen: { tipo: "oficial", url: IRD, detalle: "Monthly pay above $469.99 pays $8.25 a week. Four weeks: 33.00. A year: 429.00." },
    fecha: "2026-10-27",
    entrada: { frecuencia: "mensual", pago: 8000, lunes: "4", exento: false },
    esperado: { periodo: 33, semana: 8.25, anual: 429 },
  },
  {
    nombre: "TT$100 a week",
    origen: { tipo: "oficial", url: IRD, detalle: "Weekly pay of $109.00 or less pays $4.80 a week." },
    fecha: "2026-10-27",
    entrada: { frecuencia: "semanal", pago: 100, lunes: null, exento: false },
    esperado: { periodo: 4.8, semana: 4.8 },
  },
  {
    nombre: "Exactly TT$109 a week",
    origen: { tipo: "oficial", url: IRD, detalle: "The higher rate is for weekly pay more than $109.00, so $109.00 pays $4.80." },
    fecha: "2026-10-27",
    entrada: { frecuencia: "semanal", pago: 109, lunes: null, exento: false },
    esperado: { semana: 4.8 },
  },
  {
    nombre: "Aged 60, 5 Mondays",
    origen: { tipo: "oficial", url: IRD, detalle: "Not deducted from people aged sixty and over." },
    fecha: "2026-10-27",
    entrada: { frecuencia: "mensual", pago: 8000, lunes: "5", exento: true },
    esperado: { periodo: 0 },
  },
]);
