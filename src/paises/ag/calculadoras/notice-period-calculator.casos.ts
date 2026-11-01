import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Paid monthly",
    origen: { tipo: "recalculado", url: "https://laws.gov.ag/wp-content/uploads/2018/08/cap-27.pdf", detalle: "Section C9(3): notice equals the interval between paydays, at most 30 days. Monthly: 30 days. Pay 3,300 / 30 = 110 a day. 30 days = 3,300." },
    fecha: "2026-10-29",
    entrada: { frecuencia: "monthly", pago: 3300, prueba: false },
    esperado: { dias: 30, pagoDiario: 110, pagoSustitutivo: 3300, maxPrueba: 3 },
  },
  {
    nombre: "Paid every two weeks",
    origen: { tipo: "recalculado", detalle: "14 days. Pay 1,400 / 14 = 100 a day. 14 days = 1,400." },
    fecha: "2026-10-29",
    entrada: { frecuencia: "fortnightly", pago: 1400, prueba: false },
    esperado: { dias: 14, pagoDiario: 100, pagoSustitutivo: 1400 },
  },
  {
    nombre: "On probation",
    origen: { tipo: "recalculado", detalle: "Section C9(3)(a): 24 hours, shown as 1 day. 700 / 7 = 100." },
    fecha: "2026-10-29",
    entrada: { frecuencia: "weekly", pago: 700, prueba: true },
    esperado: { dias: 1, pagoSustitutivo: 100 },
  },
]);
