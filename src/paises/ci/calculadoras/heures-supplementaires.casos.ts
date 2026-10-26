import { definirCasos } from "@/motor/calculo";
import calculadora from "./heures-supplementaires";

export default definirCasos(calculadora, [
  {"nombre": "Taux horaire de 1 000 F, semaine chargée", "origen": {"tipo": "recalculado", "detalle": "6 h × 1 150 + 2 h × 1 500 + 2 h de nuit × 1 750 + 3 h de dimanche × 1 750 + 1 h de dimanche de nuit × 2 000 = 20 650."}, "fecha": "2026-10-23", "entrada": {"mode": "horaire", "mensuel": null, "horaire": 1000, "jour": 8, "nuit": 2, "dimancheJour": 3, "dimancheNuit": 1}, "esperado": {"montantPremieres": 6900, "montantSuivantes": 3000, "montantNuit": 3500, "montantDimancheJour": 5250, "montantDimancheNuit": 2000, "total": 20650}},
  {"nombre": "Salaire mensuel de 260 000 F", "origen": {"tipo": "recalculado", "detalle": "260 000 × 12 / 52 / 40 = 1 500 F de l'heure. 4 h × 1 725 = 6 900."}, "fecha": "2026-10-23", "entrada": {"mode": "mensuel", "mensuel": 260000, "horaire": null, "jour": 4, "nuit": 0, "dimancheJour": 0, "dimancheNuit": 0}, "esperado": {"tauxHoraire": 1500, "total": 6900}},
  {"nombre": "Salaire nul", "origen": {"tipo": "recalculado", "detalle": "Saisie invalide."}, "fecha": "2026-10-23", "entrada": {"mode": "mensuel", "mensuel": 0, "horaire": null, "jour": 4, "nuit": 0, "dimancheJour": 0, "dimancheNuit": 0}, "esperaError": true},
]);
