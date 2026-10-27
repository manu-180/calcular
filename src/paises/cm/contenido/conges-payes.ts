import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.conges-payes",
  h1: "Calcul des jours de congés payés",
  title: "Congés payés au Cameroun : combien de jours",
  description: "Calculez vos jours de congés payés selon vos mois de service, votre âge, votre ancienneté et vos enfants.",
  intro: [
    "Le salarié acquiert un congé payé pour chaque mois de service effectif, avec des jours en plus pour l'ancienneté et pour les mères salariées.",
  ],
  comoSeCalcula: [
    "Le congé principal est de {{cm.conges-jours-par-mois[general]}} ouvrables par mois de service, {{cm.conges-jours-par-mois[moins-18-ans]}} pour les moins de 18 ans.",
    "On ajoute {{cm.conges-majorations[anciennete-5-ans]}} par période de cinq ans d'ancienneté et, pour les mères, {{cm.conges-majorations[enfant]}} par enfant de moins de six ans.",
  ],
  ejemplo: ["Douze mois de service et six ans d'ancienneté donnent 18 jours plus 2 jours, soit 20 jours ouvrables."],
  faq: [],
  glosario: [],
});
