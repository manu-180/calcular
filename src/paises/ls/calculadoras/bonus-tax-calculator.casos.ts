import { definirCasos } from "@/motor/calculo";
import calculadora from "./bonus-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "M10 000 bonus on a M10 000 salary",
    origen: {
      tipo: "recalculado",
      detalle: "Normal month: PAYE 1 332 (RSL example 3). Bonus month on 20 000: 1 296 + 13 520 × 30% = 5 352, less 1 020 = 4 332. Tax on bonus 3 000, net 7 000.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 10000, bono: 10000 },
    esperado: { sinBono: 1332, conBono: 4332, impuesto: 3000, neto: 7000, tasa: 30 },
  },
  {
    nombre: "Bonus that crosses the band",
    origen: {
      tipo: "recalculado",
      detalle: "Salary 4 000: PAYE 0 (800 under the credit). With M4 000 bonus, 8 000: 1 296 + 1 520 × 30% = 1 752, less 1 020 = 732. Net bonus 3 268.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 4000, bono: 4000 },
    esperado: { sinBono: 0, conBono: 732, impuesto: 732, neto: 3268 },
  },
]);
