import { definirCasos } from "@/motor/calculo";
import calculadora from "./public-holiday-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "One holiday worked",
    origen: { tipo: "oficial", url: "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/employment-conditions-of-employment-regulations-1991-si-34-of-1991/download", detalle: "Regulation 5(2): double pay for the day. 800 × 2 = 1,600, which is 800 above a normal day." },
    fecha: "2026-10-29",
    entrada: { pagaDia: 800, dias: 1 },
    esperado: { total: 1600, extra: 800 },
  },
  {
    nombre: "Three holidays worked",
    origen: { tipo: "recalculado", detalle: "800 × 2 × 3 = 4,800. Normal pay for 3 days is 2,400, so the extra is 2,400." },
    fecha: "2026-10-29",
    entrada: { pagaDia: 800, dias: 3 },
    esperado: { total: 4800, extra: 2400 },
  },
  {
    nombre: "No daily pay entered",
    origen: { tipo: "recalculado", detalle: "A day's pay of zero is rejected." },
    fecha: "2026-10-29",
    entrada: { pagaDia: 0, dias: 1 },
    esperaError: true,
  },
]);
