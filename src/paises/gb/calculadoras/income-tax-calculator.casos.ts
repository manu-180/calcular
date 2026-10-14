import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "£50,000 in England",
    origen: { tipo: "recalculado", detalle: "Taxable 50,000 − 12,570 = 37,430 × 20% = 7,486." },
    fecha: "2026-10-14",
    entrada: { ingreso: 50000, region: "england-wales-ni" },
    esperado: { impuesto: 7486, allowance: 12570, gravable: 37430, marginal: 20, neto: 42514 },
  },
  {
    nombre: "£150,000 in England, no Personal Allowance",
    origen: {
      tipo: "recalculado",
      detalle: "Allowance 0. 37,700 × 20% = 7,540; 87,440 × 40% = 34,976; 24,860 × 45% = 11,187. Total 53,703.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 150000, region: "england-wales-ni" },
    esperado: { impuesto: 53703, allowance: 0, marginal: 45 },
  },
  {
    nombre: "£60,000 in Scotland",
    origen: {
      tipo: "recalculado",
      detalle: "Taxable 47,430: 3,967 × 19% = 753.73; 12,989 × 20% = 2,597.80; 14,136 × 21% = 2,968.56; 16,338 × 42% = 6,861.96. Total 13,182.05.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 60000, region: "scotland" },
    esperado: { impuesto: 13182.05, marginal: 42 },
  },
  {
    nombre: "Income at the Personal Allowance",
    origen: { tipo: "recalculado", detalle: "12,570 is all covered by the Personal Allowance, so no tax." },
    fecha: "2026-10-14",
    entrada: { ingreso: 12570, region: "scotland" },
    esperado: { impuesto: 0, marginal: 0 },
  },
  {
    nombre: "£110,000 in England, reduced allowance",
    origen: {
      tipo: "recalculado",
      detalle: "Allowance 12,570 − 10,000/2 = 7,570. Taxable 102,430: 37,700 × 20% = 7,540 + 64,730 × 40% = 25,892. Total 33,432.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 110000, region: "england-wales-ni" },
    esperado: { allowance: 7570, impuesto: 33432 },
  },
]);
