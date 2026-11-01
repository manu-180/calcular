import { definirCasos } from "@/motor/calculo";
import calculadora from "./heures-supplementaires";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "200 000 F par mois, 10 heures de jour",
    origen: {
      tipo: "recalculado",
      detalle: "Taux horaire 200 000 × 12 / 52 / 40 = 1 153,85. Art. 147 : 8 h × 1,12 = 10 338 ; 2 h × 1,35 = 3 115. Total 13 453.",
    },
    fecha: F,
    entrada: { mode: "mensuel", mensuel: 200000, horaire: null, jour: 10, nuit: 0, dimancheJour: 0, dimancheNuit: 0 },
    esperado: { tauxHoraire: 1154, montantPremieres: 10338, montantSuivantes: 3115, total: 13453 },
  },
  {
    nombre: "1 000 F de l'heure, nuit et dimanche",
    origen: { tipo: "recalculado", detalle: "Nuit 4 h × 1,5 = 6 000 ; dimanche de jour 3 h × 1,5 = 4 500 ; dimanche de nuit 2 h × 2 = 4 000. Total 14 500." },
    fecha: F,
    entrada: { mode: "horaire", mensuel: null, horaire: 1000, jour: 0, nuit: 4, dimancheJour: 3, dimancheNuit: 2 },
    esperado: { montantNuit: 6000, montantDimancheJour: 4500, montantDimancheNuit: 4000, total: 14500 },
  },
]);
