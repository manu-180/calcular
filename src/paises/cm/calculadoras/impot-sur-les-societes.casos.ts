import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-societes";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "PME : 50 millions de bénéfice, 800 millions de chiffre d'affaires",
    origen: { tipo: "recalculado", detalle: "Taux de 25 % (chiffre d'affaires sous 3 milliards) : 12 500 000. Minimum 2 % × 800 000 000 = 16 000 000, plus élevé. CAC 1 600 000. Total 17 600 000." },
    fecha: F,
    entrada: { benefice: 50000000, chiffreAffaires: 800000000 },
    esperado: { taux: 25, impotBenefice: 12500000, minimum: 16000000, principal: 16000000, cac: 1600000, total: 17600000 },
  },
  {
    nombre: "Grande entreprise : 2 milliards de bénéfice",
    origen: { tipo: "recalculado", detalle: "Taux de 30 % : 600 000 000 ; minimum 2 % × 10 000 000 000 = 200 000 000. CAC 60 000 000. Total 660 000 000." },
    fecha: F,
    entrada: { benefice: 2000000000, chiffreAffaires: 10000000000 },
    esperado: { taux: 30, principal: 600000000, cac: 60000000, total: 660000000 },
  },
  {
    nombre: "Fraction inférieure à 1 000 F négligée",
    origen: { tipo: "recalculado", detalle: "Bénéfice 10 000 999 → 10 000 000 × 25 % = 2 500 000 ; minimum 2 % × 50 000 000 = 1 000 000." },
    fecha: F,
    entrada: { benefice: 10000999, chiffreAffaires: 50000000 },
    esperado: { impotBenefice: 2500000, total: 2750000 },
  },
]);
