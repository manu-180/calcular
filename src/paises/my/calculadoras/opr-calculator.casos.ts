import { definirCasos } from "@/motor/calculo";
import calculadora from "./opr-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "RM400,000 over 30 years at 4%, OPR cut of 0.25",
    origen: {
      tipo: "recalculado",
      detalle: "Instalment P × r / (1 − (1 + r)^−n) with r = rate / 12, n = 360: 1,909.66 at 4% and 1,852.46 at 3.75%. Change −57.20 a month, −686.40 a year. OPR 2.75% (BNM, 3 September 2026) to 2.50%.",
    },
    fecha: "2026-10-16",
    entrada: { saldo: 400000, tasa: 4, anios: 30, cambio: -0.25, traspaso: 100 },
    esperado: { actual: 1909.66, nueva: 1852.46, diferencia: -57.2, anual: -686.4, opr: 2.75, oprNueva: 2.5 },
  },
  {
    nombre: "RM300,000 over 25 years at 4.2%, rise of 0.25",
    origen: { tipo: "recalculado", detalle: "1,616.83 at 4.2% and 1,658.99 at 4.45%: +42.16 a month." },
    fecha: "2026-10-16",
    entrada: { saldo: 300000, tasa: 4.2, anios: 25, cambio: 0.25, traspaso: 100 },
    esperado: { diferencia: 42.16, nuevaTasa: 4.45 },
  },
  {
    nombre: "Bank passes on half of a 0.25 cut",
    origen: { tipo: "recalculado", detalle: "New rate 4.2 − 0.125 = 4.075%. 1,595.96 against 1,616.83: −20.87." },
    fecha: "2026-10-16",
    entrada: { saldo: 300000, tasa: 4.2, anios: 25, cambio: -0.25, traspaso: 50 },
    esperado: { diferencia: -20.87, nuevaTasa: 4.075 },
  },
]);
