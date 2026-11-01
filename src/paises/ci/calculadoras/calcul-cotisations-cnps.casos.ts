import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-cotisations-cnps";

const F = "2026-10-23";

export default definirCasos(calculadora, [
  {
    nombre: "300 000 F bruts, taux accidents du travail de 2 %",
    origen: {
      tipo: "recalculado",
      detalle: "Retraite : 300 000 × 6,3 % = 18 900 et × 7,7 % = 23 100. Autres branches sur 70 000 : 5 % = 3 500, 0,75 % = 525, 2 % = 1 400. Employeur 28 525.",
    },
    fecha: F,
    entrada: { brut: 300000, tauxAt: 2 },
    esperado: { totalSalarie: 18900, retraiteEmployeur: 23100, prestationsFamiliales: 3500, maternite: 525, accidentTravail: 1400, totalEmployeur: 28525, total: 47425, plafondRetraite: 3375000 },
  },
  {
    nombre: "4 000 000 F bruts : plafond de la retraite à 45 SMIG",
    origen: { tipo: "recalculado", detalle: "Plafond 45 × 75 000 = 3 375 000. 6,3 % = 212 625 ; 7,7 % = 259 875 ; 3 500 + 525 + 5 % de 70 000 = 3 500. Employeur 267 400." },
    fecha: F,
    entrada: { brut: 4000000, tauxAt: 5 },
    esperado: { baseRetraite: 3375000, totalSalarie: 212625, retraiteEmployeur: 259875, accidentTravail: 3500, totalEmployeur: 267400 },
  },
  {
    nombre: "Taux accidents du travail hors fourchette",
    origen: { tipo: "recalculado", detalle: "1 % est sous le minimum de 2 %." },
    fecha: F,
    entrada: { brut: 300000, tauxAt: 1 },
    esperaError: true,
  },
]);
