import { definirCasos } from "@/motor/calculo";
import calculadora from "./bond-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "R1 800 000 home, 10% deposit, prime on 14 October 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Prime 10.75% (SARB, 14/10/2026). Bond 1 620 000 over 240 months: 1 620 000 × r / (1 − (1 + r)^−240), r = 10.75% / 12 = 16 446.71. Transfer duty 13 614 + 6% × 136 200 = 21 786.",
    },
    fecha: "2026-10-14",
    entrada: { precio: 1800000, deposito: 180000, anios: 20, margen: 0 },
    esperado: { prime: 10.75, prestado: 1620000, pago: 16446.71, intereses: 2327210.17, siSube: 274.74, derecho: 21786 },
  },
  {
    nombre: "Same bond with prime at 10.5% on 1 September 2026",
    origen: { tipo: "recalculado", detalle: "Prime 10.5% (SARB). Repayment 16 173.75 over 240 months." },
    fecha: "2026-09-01",
    entrada: { precio: 1800000, deposito: 180000, anios: 20, margen: 0 },
    esperado: { prime: 10.5, pago: 16173.75 },
  },
  {
    nombre: "Prime minus 0.5 over 30 years",
    origen: { tipo: "recalculado", detalle: "10.75 − 0.5 = 10.25%. Bond 900 000 over 360 months: 8 064.91." },
    fecha: "2026-10-14",
    entrada: { precio: 1000000, deposito: 100000, anios: 30, margen: -0.5 },
    esperado: { tasa: 10.25, pago: 8064.91, derecho: 0 },
  },
  {
    nombre: "Deposit equal to the price",
    origen: { tipo: "recalculado", detalle: "Nothing left to borrow." },
    fecha: "2026-10-14",
    entrada: { precio: 1000000, deposito: 1000000, anios: 20, margen: 0 },
    esperaError: true,
  },
]);
