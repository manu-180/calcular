import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ci.indemnite-depart-retraite",
  "h1": "Calcul de l'indemnité de départ à la retraite",
  "title": "Indemnité de départ à la retraite Côte d'Ivoire",
  "description": "Estimez votre indemnité de départ à la retraite : elle se calcule comme l'indemnité de licenciement, selon vos années de présence.",
  "intro": [
    "Au départ à la retraite, l'employeur verse une indemnité calculée comme l'indemnité de licenciement.",
    "Indiquez votre salaire moyen des 12 derniers mois et vos années de présence. Vous voyez le montant et son équivalent en mois de salaire."
  ],
  "comoSeCalcula": [
    "Jusqu'à la 5e année, chaque année vaut {{ci.licenciement-taux[0].tasa}} du salaire global mensuel moyen.",
    "De la 6e à la 10e année, {{ci.licenciement-taux[1].tasa}} par année. Au-delà, {{ci.licenciement-taux[-1].tasa}}.",
    "Les fractions d'année comptent au mois."
  ],
  "ejemplo": [
    "Après 20 ans avec 400 000 F de salaire moyen : 150 % + 175 % + 400 % = 725 %, soit 2 900 000 F (7,25 mois de salaire)."
  ],
  "faq": [
    {
      "pregunta": "Sur quel texte repose ce calcul ?",
      "respuesta": "Sur l'article 5 du décret n° 2017-210 du 30 mars 2017, qui renvoie au mode de calcul de l'indemnité de licenciement."
    },
    {
      "pregunta": "Est-elle versée en plus de la pension CNPS ?",
      "respuesta": "Oui. L'indemnité est payée par l'employeur. La pension de retraite est versée par la CNPS."
    },
    {
      "pregunta": "Quand est-elle payée ?",
      "respuesta": "Dès la cessation de service."
    }
  ],
  "glosario": [
    {
      "termino": "Indemnité de départ à la retraite",
      "definicion": "Somme versée par l'employeur au salarié qui part à la retraite."
    }
  ]
});
