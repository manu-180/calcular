import { definirCasos } from "@/motor/calculo";
import calculadora from "./self-employed-tax";

export default definirCasos(calculadora, [
  {
    nombre: "£40,000 profit in England",
    origen: { tipo: "recalculado", detalle: "Tax (40,000 − 12,570) × 20% = 5,486. Class 4 (40,000 − 12,570) × 6% = 1,645.80. Total 7,131.80; profit after tax 32,868.20." },
    fecha: "2026-10-14",
    entrada: { beneficio: 40000, region: "england-wales-ni" },
    esperado: { impuesto: 5486, clase4: 1645.8, total: 7131.8, neto: 32868.2, voluntaria: 0 },
  },
  {
    nombre: "£60,000 profit in Scotland",
    origen: {
      tipo: "recalculado",
      detalle: "Scottish tax on 47,430 taxable = 13,182.05. Class 4: 37,700 × 6% = 2,262 + 9,730 × 2% = 194.60, so 2,456.60. Total 15,638.65.",
    },
    fecha: "2026-10-14",
    entrada: { beneficio: 60000, region: "scotland" },
    esperado: { impuesto: 13182.05, clase4: 2456.6, total: 15638.65 },
  },
  {
    nombre: "Small profit below the Class 2 threshold",
    origen: { tipo: "recalculado", detalle: "6,000 is under 7,105 and under the allowance: no tax, no Class 4. Voluntary Class 2: 3.65 × 52 = 189.80." },
    fecha: "2026-10-14",
    entrada: { beneficio: 6000, region: "england-wales-ni" },
    esperado: { total: 0, voluntaria: 189.8 },
  },
]);
