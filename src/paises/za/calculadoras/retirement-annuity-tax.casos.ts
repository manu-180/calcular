import { definirCasos } from "@/motor/calculo";
import calculadora from "./retirement-annuity-tax";

export default definirCasos(calculadora, [
  {
    nombre: "R600 000 income, R60 000 contributions",
    origen: {
      tipo: "recalculado",
      detalle: "Limit 27.5% × 600 000 = 165 000, so all 60 000 is deductible. Tax on 600 000: 150 727 − 17 820 = 132 907. On 540 000: 129 127 − 17 820 = 111 307. Saving 21 600.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 600000, aporte: 60000, edad: "under-65" },
    esperado: { deducible: 60000, ahorro: 21600, costoNeto: 38400, limite: 165000, marginal: 36 },
  },
  {
    nombre: "R2 000 000 income hits the R430 000 cap",
    origen: {
      tipo: "recalculado",
      detalle: "27.5% = 550 000, capped at 430 000; 170 000 carried forward. Tax on 2 000 000: 720 969 − 17 820 = 703 149. On 1 570 000: 539 813 − 17 820 = 521 993. Saving 181 156.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 2000000, aporte: 600000, edad: "under-65" },
    esperado: { deducible: 430000, arrastre: 170000, ahorro: 181156 },
  },
]);
