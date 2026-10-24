import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ci.indemnite-licenciement",
  "h1": "Calcul de l'indemnité de licenciement",
  "title": "Indemnité de licenciement Côte d'Ivoire : calcul",
  "description": "Calculez votre indemnité de licenciement selon le décret de 2017 : {{ci.licenciement-taux[0].tasa}} puis {{ci.licenciement-taux[1].tasa}} et {{ci.licenciement-taux[-1].tasa}} du salaire par année de présence.",
  "intro": [
    "Un salarié licencié après au moins {{ci.licenciement-anciennete-min}} an de présence, sans faute lourde, a droit à une indemnité de licenciement. Elle s'ajoute au préavis.",
    "Indiquez votre salaire moyen des 12 derniers mois et votre ancienneté. Vous obtenez le montant minimum prévu par le décret n° 2017-210."
  ],
  "comoSeCalcula": [
    "On part du salaire global mensuel moyen des 12 mois qui précèdent le licenciement.",
    "Chaque année jusqu'à la 5e vaut {{ci.licenciement-taux[0].tasa}} de ce salaire, de la 6e à la 10e {{ci.licenciement-taux[1].tasa}}, et au-delà {{ci.licenciement-taux[-1].tasa}}.",
    "Les mois commencés comptent : une demi-année vaut la moitié du pourcentage."
  ],
  "ejemplo": [
    "Avec 400 000 F de salaire moyen et 7 ans de présence : 5 × 30 % + 2 × 35 % = 220 %. L'indemnité est de 880 000 F."
  ],
  "faq": [
    {
      "pregunta": "Qui a droit à l'indemnité de licenciement ?",
      "respuesta": "Le salarié licencié par l'employeur après au moins {{ci.licenciement-anciennete-min}} an de service effectif, sauf en cas de faute lourde."
    },
    {
      "pregunta": "Que comprend le salaire global ?",
      "respuesta": "Toutes les sommes qui rémunèrent le travail (salaire, primes, avantages), sans les remboursements de frais."
    },
    {
      "pregunta": "Quand l'indemnité est-elle payée ?",
      "respuesta": "Dès la cessation de service, avec le dernier salaire."
    },
    {
      "pregunta": "Une convention collective peut-elle prévoir plus ?",
      "respuesta": "Oui. Le décret fixe un minimum. Votre convention collective ou votre contrat peut être plus favorable."
    }
  ],
  "glosario": [
    {
      "termino": "Salaire global mensuel moyen",
      "definicion": "La moyenne des rémunérations des 12 derniers mois d'activité."
    },
    {
      "termino": "Faute lourde",
      "definicion": "Faute grave qui prive le salarié de l'indemnité et du préavis."
    }
  ]
});
