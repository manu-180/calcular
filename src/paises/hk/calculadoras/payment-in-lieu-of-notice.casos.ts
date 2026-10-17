import { definirCasos } from "@/motor/calculo";
import calculadora from "./payment-in-lieu-of-notice";

export default definirCasos(calculadora, [
  {
    nombre: "Labour Department example: one month with commission and half-pay leave",
    origen: {
      tipo: "recalculado",
      detalle: "Labour Department Concise Guide, appendix 1, example 4: (600,000 - 1,500) / 11.5 months = $52,043, with the months rounded. Unrounded 350 / 365 x 12 = 11.507 months gives 52,012.50.",
    },
    fecha: "2026-10-16",
    entrada: { unidad: "months", meses: 1, dias: null, salarios12: 600000, diasPeriodo: 365, diasExcluidos: 15, salariosExcluidos: 1500 },
    esperado: { pago: 52012.5 },
  },
  {
    nombre: "Seven days at $600 a day",
    origen: { tipo: "recalculado", detalle: "219,000 / 365 = 600 x 7 = 4,200." },
    fecha: "2026-10-16",
    entrada: { unidad: "days", meses: null, dias: 7, salarios12: 219000, diasPeriodo: 365, diasExcluidos: 0, salariosExcluidos: 0 },
    esperado: { pago: 4200, base: 600 },
  },
  {
    nombre: "One month on $18,000 a month",
    origen: { tipo: "recalculado", detalle: "216,000 over 12 months = 18,000." },
    fecha: "2026-10-16",
    entrada: { unidad: "months", meses: 1, dias: null, salarios12: 216000, diasPeriodo: 365, diasExcluidos: 0, salariosExcluidos: 0 },
    esperado: { pago: 18000 },
  },
  {
    nombre: "No notice entered is not valid",
    origen: { tipo: "recalculado", detalle: "Months 0." },
    fecha: "2026-10-16",
    entrada: { unidad: "months", meses: 0, dias: null, salarios12: 216000, diasPeriodo: 365, diasExcluidos: 0, salariosExcluidos: 0 },
    esperaError: true,
  },
]);
