import { definirCasos } from "@/motor/calculo";
import hs from "./heures-supplementaires";

export default definirCasos(hs, [
  {
    nombre: "4 heures par semaine pendant 4 semaines, 2 200 € brut",
    origen: {
      tipo: "recalculado",
      detalle: "2 200 ÷ 151,67 = 14,51 €/h. Majoré de 25 % : 18,14 €. 16 heures × 18,14 = 290,24 €. CSG et CRDS 9,7 % sur 98,25 % = 27,66 ; net estimé 262,58 €.",
    },
    fecha: "2026-10-14",
    entrada: { base: "mensuel", montant: 2200, heuresSup: 4, semaines: 4 },
    esperado: { tauxHoraire: 14.51, taux1: 18.14, heures1: 16, heures2: 0, brut: 290.24, netEstime: 262.58 },
  },
  {
    nombre: "10 heures par semaine : 8 à 25 % et 2 à 50 %",
    origen: {
      tipo: "recalculado",
      detalle: "Taux 15 €. 16 h × 18,75 = 300 ; 4 h × 22,50 = 90 ; total 390 €. Net estimé 390 − 37,17 = 352,83 €.",
    },
    fecha: "2026-10-14",
    entrada: { base: "horaire", montant: 15, heuresSup: 10, semaines: 2 },
    esperado: { taux1: 18.75, taux2: 22.5, heures1: 16, heures2: 4, montant1: 300, montant2: 90, brut: 390, netEstime: 352.83 },
  },
  {
    nombre: "Sans salaire",
    origen: { tipo: "recalculado", detalle: "Il faut un salaire ou un taux horaire." },
    fecha: "2026-10-14",
    entrada: { base: "horaire", montant: 0, heuresSup: 5, semaines: 1 },
    esperaError: true,
  },
]);
