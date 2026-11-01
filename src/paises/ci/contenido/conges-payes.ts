import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ci.conges-payes",
  "h1": "Calcul des congés payés en Côte d'Ivoire",
  "title": "Congés payés Côte d'Ivoire : jours et allocation",
  "description": "Calculez vos jours de congé ({{ci.conges-jours-par-mois}} jours ouvrables par mois) et l'allocation de congé, avec les jours en plus pour l'ancienneté.",
  "intro": [
    "Chaque mois de service effectif vous donne {{ci.conges-jours-par-mois}} jours ouvrables de congé payé. L'ancienneté ajoute des jours.",
    "Indiquez vos mois de service, votre ancienneté et la rémunération de la période. Vous obtenez vos jours et l'allocation versée pendant le congé."
  ],
  "comoSeCalcula": [
    "Jours : mois de service × {{ci.conges-jours-par-mois}}, arrondi au jour supérieur.",
    "Ancienneté : {{ci.conges-supplement-anciennete[5]}} de plus après 5 ans, jusqu'à {{ci.conges-supplement-anciennete[30]}} après 30 ans.",
    "Allocation : un {{ci.conges-allocation-diviseur}}e de la rémunération totale de la période. Chaque jour d'ancienneté est payé au même prix qu'un jour du congé principal."
  ],
  "ejemplo": [
    "Après 12 mois avec 3 600 000 F de rémunération et 6 ans d'ancienneté : 27 jours plus 1 jour, et une allocation de 311 111 F."
  ],
  "faq": [
    {
      "pregunta": "Quand puis-je prendre mon congé ?",
      "respuesta": "Le droit de partir s'ouvre après un an de service effectif. Le congé se prend dans les 12 mois suivants, aux dates fixées par l'employeur."
    },
    {
      "pregunta": "Les absences pour maladie réduisent-elles mes congés ?",
      "respuesta": "Non pour les accidents du travail et le congé de maternité. Les maladies constatées par un médecin agréé comptent comme travail dans la limite de six mois."
    },
    {
      "pregunta": "Y a-t-il des jours pour les enfants ?",
      "respuesta": "Oui. Le salarié ou l'apprenti de moins de 21 ans a 2 jours de plus par enfant à charge. Au-delà, ces 2 jours s'appliquent à partir du 4e enfant."
    },
    {
      "pregunta": "Que se passe-t-il si je quitte l'entreprise avant mon congé ?",
      "respuesta": "Vous recevez une indemnité compensatrice calculée sur les droits acquis à la fin du contrat."
    }
  ],
  "glosario": [
    {
      "termino": "Jour ouvrable",
      "definicion": "Tout jour de la semaine sauf le jour de repos hebdomadaire et les jours fériés chômés."
    },
    {
      "termino": "Allocation de congé",
      "definicion": "Somme versée au salarié pendant son congé."
    }
  ]
});
