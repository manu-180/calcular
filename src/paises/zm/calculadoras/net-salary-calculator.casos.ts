import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-salary-calculator";

// El techo de NAPSA de 2026 no está verificado: los casos prueban la fórmula con valores fijos.
const VALORES = {
  "zm.paye-bands": [
    { desde: 0, hasta: 5100, tasa: 0 },
    { desde: 5100, hasta: 7100, tasa: 20 },
    { desde: 7100, hasta: 9200, tasa: 30 },
    { desde: 9200, hasta: null, tasa: 37 },
  ],
  "zm.napsa-rate": 5,
  "zm.napsa-ceiling": 37236,
  "zm.nhima-rate": 1,
};

export default definirCasos(calculadora, [
  {
    nombre: "K10,000 basic and K5,000 allowances",
    origen: {
      tipo: "recalculado",
      detalle: "Gross 15,000. PAYE 3,176 (ZRA example). NAPSA 5% × 15,000 = 750. NHIMA 1% × 10,000 = 100. Net 15,000 − 4,026 = 10,974.",
    },
    fecha: "2026-10-26",
    entrada: { basico: 10000, asignaciones: 5000 },
    valores: VALORES,
    esperado: { neto: 10974, paye: 3176, napsa: 750, nhima: 100, deducciones: 4026 },
  },
  {
    nombre: "K50,000 basic, NAPSA at the ceiling",
    origen: {
      tipo: "recalculado",
      detalle: "PAYE 16,126. NAPSA 5% × 37,236 = 1,861.80. NHIMA 500. Net 50,000 − 18,487.80 = 31,512.20.",
    },
    fecha: "2026-10-26",
    entrada: { basico: 50000, asignaciones: 0 },
    valores: VALORES,
    esperado: { neto: 31512.2, napsa: 1861.8, nhima: 500 },
  },
]);
