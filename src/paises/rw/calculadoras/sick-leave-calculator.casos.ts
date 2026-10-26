import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Four months off on RWF 300,000",
    origen: { tipo: "recalculado", detalle: "Article 55: full salary for the first 3 months (900,000), then 1 month of unpaid suspension." },
    fecha: "2026-10-26",
    entrada: { tipo: "long", meses: 4, salario: 300000 },
    esperado: { mesesPagados: 3, mesesSinPago: 1, salarioPagado: 900000 },
  },
  {
    nombre: "Eight months off",
    origen: { tipo: "recalculado", detalle: "Leave is capped at 6 months: 3 paid and 3 unpaid." },
    fecha: "2026-10-26",
    entrada: { tipo: "long", meses: 8, salario: 200000 },
    esperado: { mesesPagados: 3, mesesSinPago: 3, salarioPagado: 600000 },
  },
  {
    nombre: "Short-term sickness",
    origen: { tipo: "recalculado", detalle: "Article 54: up to 15 days of paid sick leave." },
    fecha: "2026-10-26",
    entrada: { tipo: "short", meses: null, salario: null },
    esperado: { diasPagados: 15 },
  },
]);
