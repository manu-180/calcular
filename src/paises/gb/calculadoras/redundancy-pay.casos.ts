import { definirCasos } from "@/motor/calculo";
import calculadora from "./redundancy-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Maximum statutory redundancy pay from 6 April 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.uk/redundancy-your-rights/redundancy-pay",
      detalle: "Weekly pay capped at £751, service capped at 20 years, maximum £22,530. Age 61 with 20 years: all years at 41 or older, 30 weeks × 751 = 22,530.",
    },
    fecha: "2026-10-14",
    entrada: { edad: 61, anios: 25, semanal: 1000 },
    esperado: { total: 22530, semanas: 30, aniosContados: 20, pagaSemanal: 751 },
  },
  {
    nombre: "Age 30 with 10 years on £500 a week",
    origen: { tipo: "recalculado", detalle: "Years at ages 22 to 29: 8 × 1 = 8 weeks. Years at 20 and 21: 2 × 0.5 = 1. Total 9 weeks × 500 = 4,500." },
    fecha: "2026-10-14",
    entrada: { edad: 30, anios: 10, semanal: 500 },
    esperado: { total: 4500, semanas: 9 },
  },
  {
    nombre: "Age 45 with 6 years on £600 a week",
    origen: { tipo: "recalculado", detalle: "Years at ages 41 to 44: 4 × 1.5 = 6. Ages 39 and 40: 2 × 1 = 2. Total 8 weeks × 600 = 4,800." },
    fecha: "2026-10-14",
    entrada: { edad: 45, anios: 6, semanal: 600 },
    esperado: { total: 4800, semanas: 8 },
  },
  {
    nombre: "Less than 2 years",
    origen: { tipo: "recalculado", detalle: "Under 2 years of service there is no statutory redundancy pay." },
    fecha: "2026-10-14",
    entrada: { edad: 35, anios: 1, semanal: 600 },
    esperado: { total: 0 },
  },
  {
    nombre: "Service longer than possible for the age",
    origen: { tipo: "recalculado", detalle: "20 years of service at age 30 is not possible." },
    fecha: "2026-10-14",
    entrada: { edad: 30, anios: 20, semanal: 600 },
    esperaError: true,
  },
]);
