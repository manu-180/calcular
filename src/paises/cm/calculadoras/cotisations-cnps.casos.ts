import { definirCasos } from "@/motor/calculo";
import calculadora from "./cotisations-cnps";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "300 000 F, régime général, groupe A",
    origen: { tipo: "recalculado", detalle: "Pension 4,2 % = 12 600 de chaque côté ; prestations familiales 7 % = 21 000 ; accidents 1,75 % = 5 250. Employeur 38 850, total 51 450." },
    fecha: F,
    entrada: { brut: 300000, regime: "general", groupe: "a" },
    esperado: { totalSalarie: 12600, prestationsFamiliales: 21000, accidentsTravail: 5250, totalEmployeur: 38850, total: 51450 },
  },
  {
    nombre: "1 000 000 F, régime agricole, groupe C : plafond de 750 000 F",
    origen: { tipo: "recalculado", detalle: "Pension 4,2 % × 750 000 = 31 500 ; prestations 5,65 % × 750 000 = 42 375 ; accidents 5 % × 1 000 000 = 50 000. Employeur 123 875." },
    fecha: F,
    entrada: { brut: 1000000, regime: "agricole", groupe: "c" },
    esperado: { basePlafonnee: 750000, totalSalarie: 31500, prestationsFamiliales: 42375, accidentsTravail: 50000, totalEmployeur: 123875 },
  },
  {
    nombre: "200 000 F, enseignement privé, groupe B",
    origen: { tipo: "recalculado", detalle: "Prestations 3,7 % = 7 400 ; accidents 2,5 % = 5 000 ; pension employeur 8 400. Employeur 20 800." },
    fecha: F,
    entrada: { brut: 200000, regime: "enseignement-prive", groupe: "b" },
    esperado: { prestationsFamiliales: 7400, accidentsTravail: 5000, totalEmployeur: 20800 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { brut: 0, regime: "general", groupe: "a" },
    esperaError: true,
  },
]);
