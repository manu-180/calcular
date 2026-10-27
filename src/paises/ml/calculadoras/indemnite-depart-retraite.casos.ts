import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-depart-retraite";

export default definirCasos(calculadora, [
  {
    nombre: "25 ans de service",
    origen: { tipo: "recalculado", detalle: "5 × 20 % + 5 × 25 % + 15 × 30 % = 675 % ; 250 000 × 6,75 = 1 687 500." },
    fecha: "2026-10-27",
    entrada: { salaire: 250000, annees: 25, mois: 0 },
    esperado: { pourcentage: 675, indemnite: 1687500, enMois: 6.75 },
  },
  {
    nombre: "3 ans de service",
    origen: { tipo: "recalculado", detalle: "3 × 20 % = 60 % ; 150 000." },
    fecha: "2026-10-27",
    entrada: { salaire: 250000, annees: 3, mois: 0 },
    esperado: { pourcentage: 60, indemnite: 150000 },
  },
]);
