import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage-calculator";

const LN390 = "https://www.printery.gov.tt/e-gazette/2023/Legal%20Notices/Legal%20Notice%20No.%20390%20of%202023.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Full 40-hour week",
    origen: { tipo: "oficial", url: LN390, detalle: "Schedule: $164.00 a day, $820.00 a week, $3,553.33 a month (173.3334 hours)." },
    fecha: "2026-10-27",
    entrada: { horas: 40, pagoHora: null },
    esperado: { semanaTuya: 820, mesTuyo: 3553.33, hora: 20.5, dia: 164, semana: 820, mes: 3553.33 },
  },
  {
    nombre: "25 hours at TT$18 an hour",
    origen: { tipo: "recalculado", detalle: "20.50 × 25 = 512.50 a week. Shortfall (20.50 − 18) × 25 = 62.50. Month 20.50 × 25 × 52 ÷ 12 = 2,220.83." },
    fecha: "2026-10-27",
    entrada: { horas: 25, pagoHora: 18 },
    esperado: { semanaTuya: 512.5, diferencia: 62.5, mesTuyo: 2220.83 },
  },
  {
    nombre: "More than 40 hours",
    origen: { tipo: "recalculado", detalle: "Hours above 40 are overtime and out of scope." },
    fecha: "2026-10-27",
    entrada: { horas: 45, pagoHora: null },
    esperaError: true,
  },
]);
