import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Full year, four days taken",
    origen: { tipo: "recalculado", detalle: "s. 188(1): 12 months × 1 day = 12. Due 12 − 4 = 8. Day's pay 6 000 / 195 × 9 hours = 276.92. Value 8 × 276.92 = 2 215.36." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, semana: "five-day", meses: 12, tomados: 4 },
    esperado: { ganados: 12, pendientes: 8, diario: 276.92, valor: 2215.36, pagoFinal: 2215.36 },
  },
  {
    nombre: "Two months in, six-day week",
    origen: { tipo: "recalculado", detalle: "2 days earned. Day's pay 6 000 / 195 × 8 = 246.15. Under 3 months, s. 188(4) does not apply: leave pay on termination 0." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, semana: "six-day", meses: 2, tomados: 0 },
    esperado: { ganados: 2, pendientes: 2, diario: 246.15, valor: 492.3, pagoFinal: 0 },
  },
  {
    nombre: "More days taken than allowed",
    origen: { tipo: "recalculado", detalle: "20 days taken against 12 earned." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, semana: "five-day", meses: 12, tomados: 20 },
    esperaError: true,
  },
]);
