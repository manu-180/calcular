import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-licenciement";

export default definirCasos(calculadora, [
  {
    nombre: "8 ans de service",
    origen: { tipo: "recalculado", detalle: "5 × 20 % + 3 × 25 % = 175 % ; 200 000 × 1,75 = 350 000." },
    fecha: "2026-10-27",
    entrada: { salaire: 200000, annees: 8, mois: 0 },
    esperado: { pourcentage: 175, indemnite: 350000 },
  },
  {
    nombre: "8 ans et 6 mois : la fraction d'année compte",
    origen: { tipo: "recalculado", detalle: "175 % + 0,5 × 25 % = 187,5 % ; 375 000." },
    fecha: "2026-10-27",
    entrada: { salaire: 200000, annees: 8, mois: 6 },
    esperado: { pourcentage: 187.5, indemnite: 375000 },
  },
  {
    nombre: "12 ans de service",
    origen: { tipo: "recalculado", detalle: "100 % + 125 % + 2 × 30 % = 285 % ; 570 000." },
    fecha: "2026-10-27",
    entrada: { salaire: 200000, annees: 12, mois: 0 },
    esperado: { pourcentage: 285, indemnite: 570000 },
  },
  {
    nombre: "Moins d'un an : pas d'indemnité",
    origen: { tipo: "recalculado", detalle: "Article L.53 : un an de service continu au minimum." },
    fecha: "2026-10-27",
    entrada: { salaire: 200000, annees: 0, mois: 10 },
    esperado: { indemnite: 0 },
  },
]);
