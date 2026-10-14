import { definirCasos } from "@/motor/calculo";
import calculadora from "./dividend-tax";

export default definirCasos(calculadora, [
  {
    nombre: "HMRC example: £3,000 of dividends and £29,570 of wages",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.uk/tax-on-dividends",
      detalle: "No tax on £500 of dividends (dividend allowance) and 10.75% on £2,500 = £268.75.",
    },
    fecha: "2026-10-14",
    entrada: { dividendos: 3000, otros: 29570 },
    esperado: { impuesto: 268.75 },
  },
  {
    nombre: "Dividends crossing into the higher rate",
    origen: {
      tipo: "recalculado",
      detalle: "Other taxable 45,000 − 12,570 = 32,430. Dividends from 32,430: first 500 at 0% (to 32,930), 4,770 at 10.75% = 512.78 (to 37,700), 4,730 at 35.75% = 1,690.98. Total 2,203.75.",
    },
    fecha: "2026-10-14",
    entrada: { dividendos: 10000, otros: 45000 },
    esperado: { impuesto: 2203.75 },
  },
  {
    nombre: "Dividends only, covered by the allowances",
    origen: { tipo: "recalculado", detalle: "13,000 of dividends: 12,570 covered by the Personal Allowance, 430 by the dividend allowance. No tax." },
    fecha: "2026-10-14",
    entrada: { dividendos: 13000, otros: 0 },
    esperado: { impuesto: 0, exentos: 13000 },
  },
]);
