import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-pay";

export default definirCasos(calculadora, [
  {
    nombre: "£600 a week",
    origen: {
      tipo: "recalculado",
      url: "https://www.gov.uk/maternity-pay-leave/pay",
      detalle: "90% of 600 = 540 × 6 = 3,240. Then the lower of 194.32 and 540 = 194.32 × 33 = 6,412.56. Total 9,652.56.",
    },
    fecha: "2026-10-14",
    entrada: { semanal: 600 },
    esperado: { primeras: 540, totalPrimeras: 3240, resto: 194.32, totalResto: 6412.56, total: 9652.56 },
  },
  {
    nombre: "£200 a week, 90% is below the standard rate",
    origen: { tipo: "recalculado", detalle: "90% of 200 = 180, lower than 194.32, so 180 for all 39 weeks: 7,020." },
    fecha: "2026-10-14",
    entrada: { semanal: 200 },
    esperado: { primeras: 180, resto: 180, total: 7020 },
  },
  {
    nombre: "Below the Lower Earnings Limit",
    origen: { tipo: "recalculado", detalle: "£100 a week is under the £129 Lower Earnings Limit: no SMP." },
    fecha: "2026-10-14",
    entrada: { semanal: 100 },
    esperado: { total: 0 },
  },
]);
