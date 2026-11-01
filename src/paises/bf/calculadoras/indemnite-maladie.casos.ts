import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-maladie";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Trois ans d'ancienneté, trois mois d'absence",
    origen: { tipo: "recalculado", detalle: "Article 113, de un à cinq ans : un mois plein (200 000) puis demi-salaire deux mois (200 000). Total 400 000 ; maximum 500 000." },
    fecha: F,
    entrada: { annees: 3, salaire: 200000, absence: 3 },
    esperado: { plein: 1, demi: 3, indemnite: 400000, maximum: 500000 },
  },
  {
    nombre: "Moins d'un an, quatre mois d'absence",
    origen: { tipo: "recalculado", detalle: "Un mois plein et un mois à demi-salaire : 100 000 + 50 000 = 150 000. Deux mois restent sans indemnité de l'employeur." },
    fecha: F,
    entrada: { annees: 0, salaire: 100000, absence: 4 },
    esperado: { indemnite: 150000, moisSansIndemnite: 2 },
  },
  {
    nombre: "Vingt ans d'ancienneté, six mois d'absence",
    origen: { tipo: "recalculado", detalle: "Au-delà de quinze ans : cinq mois pleins et cinq mois à demi-salaire. 5 × 300 000 + 1 × 150 000 = 1 650 000." },
    fecha: F,
    entrada: { annees: 20, salaire: 300000, absence: 6 },
    esperado: { plein: 5, demi: 5, indemnite: 1650000 },
  },
]);
