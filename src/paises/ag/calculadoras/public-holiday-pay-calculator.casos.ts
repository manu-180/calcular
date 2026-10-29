import { definirCasos } from "@/motor/calculo";
import calculadora from "./public-holiday-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Eight hours worked on a public holiday at EC$20",
    origen: { tipo: "recalculado", url: "https://laws.gov.ag/wp-content/uploads/2018/08/cap-27.pdf", detalle: "Section C15: holiday wage 8 x 20 = 160, plus 8 x 20 x 1.5 = 240. Total 400." },
    fecha: "2026-10-29",
    entrada: { tarifa: 20, horasNormales: 8, horasTrabajadas: 8 },
    esperado: { pagoFeriado: 160, pagoTrabajado: 240, total: 400 },
  },
  {
    nombre: "Holiday not worked",
    origen: { tipo: "recalculado", detalle: "Section C15(1): the employee suffers no loss of pay. 8 x 20 = 160." },
    fecha: "2026-10-29",
    entrada: { tarifa: 20, horasNormales: 8, horasTrabajadas: 0 },
    esperado: { pagoFeriado: 160, pagoTrabajado: 0, total: 160 },
  },
  {
    nombre: "Four hours worked",
    origen: { tipo: "recalculado", detalle: "Holiday wage 160 plus 4 x 20 x 1.5 = 120. Total 280." },
    fecha: "2026-10-29",
    entrada: { tarifa: 20, horasNormales: 8, horasTrabajadas: 4 },
    esperado: { total: 280 },
  },
]);
