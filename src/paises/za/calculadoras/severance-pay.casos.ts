import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay";

export default definirCasos(calculadora, [
  {
    nombre: "R20 000 a month, six years",
    origen: { tipo: "recalculado", detalle: "Week 20 000 / 4.333 = 4 615.74. Six weeks = 27 694.44. Under 550 000, so no tax." },
    fecha: "2026-10-14",
    entrada: { salario: 20000, anios: 6, extra: null, anteriores: null },
    esperado: { semanal: 4615.74, minimo: 27694.44, impuesto: 0, neto: 27694.44 },
  },
  {
    nombre: "R60 000 a month, 20 years, R500 000 extra",
    origen: {
      tipo: "recalculado",
      detalle: "Week 13 847.22 × 20 = 276 944.40; total 776 944.40. Tax 39 600 + (776 944.40 − 770 000) × 27% = 41 474.99.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 60000, anios: 20, extra: 500000, anteriores: null },
    esperado: { minimo: 276944.4, total: 776944.4, impuesto: 41474.99, neto: 735469.41 },
  },
  {
    nombre: "Earlier lump sum of R600 000",
    origen: { tipo: "recalculado", detalle: "Tax on 600 000 + 27 694.44 = 18% × 77 694.44 = 13 985.00, less tax on 600 000 (9 000) = 4 985.00." },
    fecha: "2026-10-14",
    entrada: { salario: 20000, anios: 6, extra: null, anteriores: 600000 },
    esperado: { impuesto: 4985 },
  },
]);
