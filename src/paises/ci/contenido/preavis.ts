import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ci.preavis",
  "h1": "Calcul de la durée du préavis",
  "title": "Préavis de licenciement ou démission Côte d'Ivoire",
  "description": "Trouvez la durée de votre préavis selon votre catégorie et votre ancienneté, et l'indemnité compensatrice si le préavis n'est pas effectué.",
  "intro": [
    "Quand un contrat à durée indéterminée est rompu, la partie qui en prend l'initiative doit respecter un préavis. Sa durée dépend de la catégorie et de l'ancienneté.",
    "Choisissez votre situation et indiquez votre ancienneté. Vous voyez la durée minimale et l'indemnité due si le préavis n'est pas respecté."
  ],
  "comoSeCalcula": [
    "Payé au mois (catégories 1 à 5) : {{ci.preavis-mois[jusqu-6-ans]}} jusqu'à 6 ans, puis {{ci.preavis-mois[6-11-ans]}}, {{ci.preavis-mois[11-16-ans]}} et {{ci.preavis-mois[plus-16-ans]}} au-delà de 16 ans.",
    "Payé à l'heure, à la journée ou à la semaine : {{ci.preavis-jours[moins-6-mois]}} jusqu'à 6 mois, {{ci.preavis-jours[6-mois-1-an]}} jusqu'à 1 an, puis comme un salarié au mois.",
    "6e catégorie et au-delà : {{ci.preavis-mois[cadres-jusqu-16-ans]}} jusqu'à 16 ans, {{ci.preavis-mois[cadres-plus-16-ans]}} ensuite. Une incapacité de plus de 40 % double le préavis après 6 mois."
  ],
  "ejemplo": [
    "Un employé payé au mois avec 3 ans d'ancienneté a 1 mois de préavis. S'il est dispensé sans être payé, il a droit à un mois de salaire."
  ],
  "faq": [
    {
      "pregunta": "Puis-je chercher un emploi pendant le préavis ?",
      "respuesta": "Oui. Pendant le préavis, le salarié a droit à deux jours de liberté par semaine, payés à plein salaire, pour chercher un emploi."
    },
    {
      "pregunta": "Le préavis est-il dû en cas de faute lourde ?",
      "respuesta": "Non. Une faute lourde permet la rupture sans préavis."
    },
    {
      "pregunta": "Ces durées sont-elles des minimums ?",
      "respuesta": "Oui. Le décret n° 96-200 s'applique sauf disposition plus favorable de la convention collective ou du contrat."
    }
  ],
  "glosario": [
    {
      "termino": "Préavis",
      "definicion": "Délai entre l'annonce de la rupture du contrat et la fin effective du travail."
    },
    {
      "termino": "Indemnité compensatrice",
      "definicion": "Le salaire du préavis versé quand le préavis n'est pas effectué."
    }
  ]
});
