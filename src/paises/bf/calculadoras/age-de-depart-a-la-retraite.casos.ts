import { definirCasos } from "@/motor/calculo";
import calculadora from "./age-de-depart-a-la-retraite";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Cadre né le 15 mars 1970",
    origen: { tipo: "recalculado", detalle: "Cadres : 60 ans, le 15 mars 2030. Du 27 octobre 2026 au 15 mars 2030 : 3 ans et 4 mois complets." },
    fecha: F,
    entrada: { naissance: "1970-03-15", categorie: "cadre" },
    esperado: { age: 60, depart: "2030-03-15", annees: 3, mois: 4, cotisationMin: 15 },
  },
  {
    nombre: "Ouvrier né le 1er janvier 1970",
    origen: { tipo: "recalculado", detalle: "Ouvriers : 56 ans, atteints le 1er janvier 2026." },
    fecha: F,
    entrada: { naissance: "1970-01-01", categorie: "ouvrier" },
    esperado: { depart: "2026-01-01", annees: 0, mois: 0, statut: "L'âge de départ à la retraite est atteint." },
  },
  {
    nombre: "Employée née un 29 février",
    origen: { tipo: "recalculado", detalle: "Employés : 58 ans. 1972 + 58 = 2030, année non bissextile : 28 février 2030." },
    fecha: F,
    entrada: { naissance: "1972-02-29", categorie: "employe" },
    esperado: { depart: "2030-02-28" },
  },
]);
