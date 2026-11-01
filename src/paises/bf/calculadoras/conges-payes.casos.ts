import { definirCasos } from "@/motor/calculo";
import calculadora from "./conges-payes";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Douze mois de service, trois ans d'ancienneté",
    origen: { tipo: "recalculado", detalle: "Article 180 : 12 × 2,5 = 30 jours." },
    fecha: F,
    entrada: { mois: 12, annees: 3, jeuneMere: false, enfants: null },
    esperado: { principal: 30, anciennete: 0, total: 30 },
  },
  {
    nombre: "Vingt-six ans d'ancienneté",
    origen: { tipo: "recalculado", detalle: "Article 181 : quatre jours après vingt-cinq ans. 30 + 4 = 34." },
    fecha: F,
    entrada: { mois: 12, annees: 26, jeuneMere: false, enfants: null },
    esperado: { anciennete: 4, total: 34 },
  },
  {
    nombre: "Jeune mère avec deux enfants, sept mois de service",
    origen: { tipo: "recalculado", detalle: "7 × 2,5 = 17,5 jours ; article 182 : 2 × 2 = 4 jours. Total 21,5." },
    fecha: F,
    entrada: { mois: 7, annees: 0, jeuneMere: true, enfants: 2 },
    esperado: { principal: 17.5, enfants: 4, total: 21.5 },
  },
]);
