import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ci.indemnite-fin-de-contrat",
  "h1": "Calcul de l'indemnité de fin de contrat (CDD)",
  "title": "Indemnité de fin de CDD Côte d'Ivoire : 3 % des salaires",
  "description": "À la fin d'un CDD sans embauche en CDI, vous touchez {{ci.fin-contrat-taux}} des salaires bruts perçus. Calculez votre indemnité de fin de contrat.",
  "intro": [
    "Quand un contrat à durée déterminée (CDD) se termine sans CDI, le Code du travail prévoit une indemnité de fin de contrat. C'est un complément de salaire.",
    "Indiquez le total des salaires bruts du contrat et la façon dont il se termine."
  ],
  "comoSeCalcula": [
    "On additionne les salaires bruts perçus pendant tout le contrat.",
    "L'indemnité vaut {{ci.fin-contrat-taux}} de ce total. Elle est payée avec le dernier salaire."
  ],
  "ejemplo": [
    "Un CDD de 12 mois à 150 000 F : 1 800 000 F de salaires. L'indemnité est de 54 000 F."
  ],
  "faq": [
    {
      "pregunta": "Dans quels cas n'est-elle pas due ?",
      "respuesta": "Si vous refusez un CDI pour un emploi similaire au moins aussi bien payé, si vous rompez le contrat avant son terme, ou en cas de faute lourde."
    },
    {
      "pregunta": "Sur quel texte repose-t-elle ?",
      "respuesta": "Sur l'article 15.8 du Code du travail (loi n° 2015-532 du 20 juillet 2015)."
    },
    {
      "pregunta": "Est-ce la même chose que les congés payés ?",
      "respuesta": "Non. Les congés non pris donnent droit à une indemnité compensatrice à part."
    }
  ],
  "glosario": [
    {
      "termino": "CDD",
      "definicion": "Contrat à durée déterminée."
    },
    {
      "termino": "CDI",
      "definicion": "Contrat à durée indéterminée."
    }
  ]
});
