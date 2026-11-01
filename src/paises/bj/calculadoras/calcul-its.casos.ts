import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-its";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "300 000 F imposables",
    origen: { tipo: "recalculado", detalle: "Art. 125 : 0 + 90 000 × 10 % + 100 000 × 15 % + 50 000 × 19 % = 33 500. Taux moyen 11,17 %." },
    fecha: F,
    entrada: { salaire: 300000, mois: "autre" },
    esperado: { total: 33500, impot: 33500, tauxMoyen: 11.17, tauxMarginal: 19, annuel: 402000 },
  },
  {
    nombre: "60 000 F en juin : première tranche exonérée",
    origen: { tipo: "recalculado", detalle: "Le salaire ne dépasse pas 60 000 F : impôt nul et pas de redevance de juin." },
    fecha: F,
    entrada: { salaire: 60000, mois: "juin" },
    esperado: { total: 0, redevance: 0, tauxMarginal: 0 },
  },
  {
    nombre: "1 000 000 F en juin",
    origen: { tipo: "recalculado", detalle: "9 000 + 15 000 + 47 500 + 500 000 × 30 % = 221 500, plus 3 000 de redevance ORTB = 224 500." },
    fecha: F,
    entrada: { salaire: 1000000, mois: "juin" },
    esperado: { impot: 221500, redevance: 3000, total: 224500, tauxMarginal: 30 },
  },
]);
