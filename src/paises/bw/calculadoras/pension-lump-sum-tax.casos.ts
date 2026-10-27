import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-lump-sum-tax";

export default definirCasos(calculadora, [
  {
    nombre: "P300 000 provident fund payout taken in cash, no other income",
    origen: {
      tipo: "recalculado",
      detalle: "Section 19 of the Income Tax Act, 2026: half tax-free. Taxable 150 000: 1 800 + 4 500 + 18.75% × 30 000 = 11 925. Cash 300 000 − 11 925 = 288 075.",
    },
    fecha: "2026-10-27",
    entrada: { monto: 300000, ingreso: 0, destino: "cash" },
    esperado: { exento: 150000, gravable: 150000, impuesto: 11925, efectivo: 288075 },
  },
  {
    nombre: "P1 000 000 on top of P200 000 of income",
    origen: { tipo: "recalculado", detalle: "Taxable 500 000. tax(700 000) = 74 050 + 27.5% × 300 000 = 156 550; tax(200 000) = 13 050 + 25% × 44 000 = 24 050. Tax 132 500." },
    fecha: "2026-10-27",
    entrada: { monto: 1000000, ingreso: 200000, destino: "cash" },
    esperado: { impuesto: 132500, efectivo: 867500 },
  },
  {
    nombre: "Taxable half moved to an annuity",
    origen: { tipo: "recalculado", detalle: "Section 19 (3): keep the tax-free half (150 000) and transfer the rest. No tax now." },
    fecha: "2026-10-27",
    entrada: { monto: 300000, ingreso: 0, destino: "annuity" },
    esperado: { impuesto: 0, efectivo: 150000, gravable: 0 },
  },
  {
    nombre: "Zero lump sum",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { monto: 0, ingreso: 0, destino: "cash" },
    esperaError: true,
  },
]);
