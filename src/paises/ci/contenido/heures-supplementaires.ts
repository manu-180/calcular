import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ci.heures-supplementaires",
  "h1": "Calcul des heures supplémentaires",
  "title": "Heures supplémentaires Côte d'Ivoire : majorations",
  "description": "Calculez le paiement de vos heures supplémentaires avec les majorations légales : {{ci.heures-sup-majorations[premieres]}}, {{ci.heures-sup-majorations[suivantes]}}, nuit et dimanche.",
  "intro": [
    "Au-delà de {{ci.duree-legale-travail}} heures par semaine, les heures sont des heures supplémentaires, payées avec une majoration.",
    "Indiquez votre salaire et vos heures de la semaine. Vous obtenez le montant à payer, majoration comprise."
  ],
  "comoSeCalcula": [
    "Le taux horaire se déduit du salaire mensuel : salaire × 12 / 52 / {{ci.duree-legale-travail}}.",
    "Les {{ci.heures-sup-premiere-tranche}} premières heures supplémentaires de la semaine sont majorées de {{ci.heures-sup-majorations[premieres]}}, les suivantes de {{ci.heures-sup-majorations[suivantes]}}.",
    "Heures de nuit et du dimanche ou d'un jour férié de jour : {{ci.heures-sup-majorations[nuit]}}. Dimanche ou jour férié de nuit : {{ci.heures-sup-majorations[dimanche-nuit]}}."
  ],
  "ejemplo": [
    "Avec 260 000 F par mois, le taux horaire est de 1 500 F. Quatre heures supplémentaires de jour rapportent 4 × 1 725 = 6 900 F."
  ],
  "faq": [
    {
      "pregunta": "Ces taux sont-ils des minimums ?",
      "respuesta": "Oui. Le décret n° 96-203 fixe des majorations minimales. Votre convention collective ou un accord d'entreprise peut prévoir mieux."
    },
    {
      "pregunta": "La durée légale vaut-elle partout ?",
      "respuesta": "Elle vaut dans tous les établissements sauf les établissements agricoles, qui ont leur propre durée."
    },
    {
      "pregunta": "Comment déclarer ces heures ?",
      "respuesta": "Elles s'ajoutent au salaire brut du mois et entrent dans la base de l'ITS et des cotisations CNPS."
    }
  ],
  "glosario": [
    {
      "termino": "Durée légale",
      "definicion": "La durée normale du travail, au-delà de laquelle commencent les heures supplémentaires."
    },
    {
      "termino": "Majoration",
      "definicion": "Le pourcentage ajouté au taux horaire normal."
    }
  ]
});
