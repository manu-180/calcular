import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Five days with the allowance untouched",
    origen: { tipo: "recalculado", url: "https://laws.gov.ag/wp-content/uploads/2018/08/cap-27.pdf", detalle: "Section C17: first 12 days at the basic wage. Day 3,300 / 22 = 150. 5 x 150 = 750." },
    fecha: "2026-10-29",
    entrada: { salario: 3300, diasLaborales: 22, usados: 0, nuevos: 5 },
    esperado: { pagoDiario: 150, disponibles: 12, pagados: 5, sinPago: 0, pago: 750 },
  },
  {
    nombre: "Ten days when 8 are already used",
    origen: { tipo: "recalculado", detalle: "12 - 8 = 4 days left, so 4 paid and 6 not covered. 4 x 150 = 600." },
    fecha: "2026-10-29",
    entrada: { salario: 3300, diasLaborales: 22, usados: 8, nuevos: 10 },
    esperado: { disponibles: 4, pagados: 4, sinPago: 6, pago: 600 },
  },
  {
    nombre: "Allowance fully used",
    origen: { tipo: "recalculado", detalle: "12 used, none left." },
    fecha: "2026-10-29",
    entrada: { salario: 3300, diasLaborales: 22, usados: 12, nuevos: 3 },
    esperado: { pagados: 0, sinPago: 3, pago: 0 },
  },
]);
