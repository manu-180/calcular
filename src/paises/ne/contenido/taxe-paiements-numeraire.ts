import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ne.taxe-paiements-numeraire",
  "h1": "Taxe sur les paiements en numéraire au Niger",
  "title": "Taxe paiements en espèces Niger : calcul {{anio}}",
  "description": "Calculez la taxe de {{ne.numeraire-taux}} sur les paiements en numéraire au Niger. Exonération jusqu'à {{ne.numeraire-seuil}}, en vigueur depuis {{ne.numeraire-taux#desde}}.",
  "intro": [
    "Un paiement en espèces de plus de {{ne.numeraire-seuil}} supporte une taxe de {{ne.numeraire-taux}}. Elle a été créée par la loi de finances pour l'année budgétaire 2026.",
    "Indiquez le montant hors TVA du paiement. Vous obtenez la taxe et le total à régler."
  ],
  "comoSeCalcula": [
    "La taxe est assise sur le montant hors taxe sur la valeur ajoutée du paiement effectué.",
    "Un paiement de {{ne.numeraire-seuil}} ou moins est exonéré en entier. Au-dessus, la taxe de {{ne.numeraire-taux}} porte sur tout le montant hors TVA.",
    "Les paiements des impôts et taxes sont aussi exonérés. Ce sont les entreprises soumises à un régime réel d'imposition qui collectent la taxe."
  ],
  "ejemplo": [
    "Pour un paiement en espèces de 500 000 F hors TVA, la taxe est de 5 000 F (1 % de 500 000) et le total est de 505 000 F. Pour un paiement de 100 000 F, il n'y a pas de taxe."
  ],
  "faq": [
    {
      "pregunta": "Quel est le taux de la taxe ?",
      "respuesta": "{{ne.numeraire-taux}} du montant hors TVA du paiement (article 394 quaterdecies du Code général des impôts)."
    },
    {
      "pregunta": "À partir de quel montant la taxe s'applique-t-elle ?",
      "respuesta": "Les paiements de {{ne.numeraire-seuil}} ou moins sont exonérés (article 394 duodecies). La taxe s'applique au-dessus."
    },
    {
      "pregunta": "Qui collecte la taxe ?",
      "respuesta": "Les entreprises soumises à un régime réel d'imposition la collectent et la reversent à la recette des impôts de rattachement (articles 394 undecies et 394 octiesdecies)."
    },
    {
      "pregunta": "Quand la taxe est-elle exigible ?",
      "respuesta": "Au plus tard le 15 du mois qui suit le paiement, dans les mêmes conditions que la TVA (article 394 sexiesdecies)."
    }
  ],
  "glosario": [
    {
      "termino": "Numéraire",
      "definicion": "Les espèces, pièces et billets, par opposition au virement ou au chèque."
    },
    {
      "termino": "Régime réel",
      "definicion": "Régime d'imposition des entreprises qui tiennent une comptabilité complète."
    },
    {
      "termino": "Hors TVA",
      "definicion": "Le montant avant ajout de la taxe sur la valeur ajoutée."
    }
  ]
});
