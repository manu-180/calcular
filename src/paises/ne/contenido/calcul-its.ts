import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ne.calcul-its",
  "h1": "Calcul de l'ITS {{anio}} au Niger : impôt sur les salaires",
  "title": "Calcul ITS Niger {{anio}} : barème mensuel",
  "description": "Calculez l'impôt sur les traitements et salaires au Niger : neuf tranches mensuelles de {{ne.its-bareme[0].tasa}} à {{ne.its-bareme[-1].tasa}}, en vigueur depuis {{ne.its-bareme#desde}}.",
  "intro": [
    "L'impôt sur les traitements et salaires (ITS) se calcule chaque mois, tranche par tranche. La première tranche, jusqu'à {{ne.its-bareme[1].desde}}, est taxée à {{ne.its-bareme[0].tasa}}. La dernière, au-delà de {{ne.its-bareme[-1].desde}}, est taxée à {{ne.its-bareme[-1].tasa}}.",
    "Saisissez le revenu net imposable de votre mois. Vous obtenez l'impôt, ce qu'il vous reste, le même impôt sur douze mois et votre taux moyen."
  ],
  "comoSeCalcula": [
    "Le barème est celui de l'article 150 du Code général des impôts, réécrit par la loi de finances. Il rend la fiscalité progressive : chaque part du revenu paie le taux de sa tranche.",
    "La tranche de {{ne.its-bareme[2].desde}} à {{ne.its-bareme[3].desde}} est taxée à {{ne.its-bareme[2].tasa}}, celle de {{ne.its-bareme[3].desde}} à {{ne.its-bareme[4].desde}} à {{ne.its-bareme[3].tasa}}, puis {{ne.its-bareme[4].tasa}} jusqu'à {{ne.its-bareme[5].desde}}.",
    "Dépasser un seuil ne fait pas payer tout le revenu au taux supérieur. Seule la part qui dépasse est taxée plus fort."
  ],
  "ejemplo": [
    "Pour un revenu net imposable de 200 000 F dans le mois : 250 F sur les 25 000 premiers francs, 500 F sur les 25 000 suivants, 3 000 F sur la tranche à 6 %, 6 500 F sur celle à 13 % et 12 500 F sur les 50 000 F à 25 %. L'ITS du mois est de 22 750 F, soit un taux moyen d'environ 11,4 %."
  ],
  "faq": [
    {
      "pregunta": "Quel texte fixe le barème de l'ITS ?",
      "respuesta": "L'article 150 du Code général des impôts, dans sa rédaction issue de l'ordonnance n° 2025-44 du 31 décembre 2025 portant loi de finances 2026, à compter du {{ne.its-bareme#desde}}."
    },
    {
      "pregunta": "Le barème s'applique-t-il par tranches ?",
      "respuesta": "Oui. Le texte parle d'un impôt progressif calculé par tranches mensuelles. Chaque part du revenu est taxée au taux de sa tranche."
    },
    {
      "pregunta": "Quel taux paie la dernière tranche ?",
      "respuesta": "Au-delà de {{ne.its-bareme[-1].desde}} par mois, la part du revenu est taxée à {{ne.its-bareme[-1].tasa}}."
    },
    {
      "pregunta": "Ce calcul tient-il compte des charges de famille ?",
      "respuesta": "Non. Il applique le barème au revenu net imposable saisi. Les abattements et cotisations se déduisent avant, sur votre bulletin de paie."
    }
  ],
  "glosario": [
    {
      "termino": "ITS",
      "definicion": "Impôt sur les traitements et salaires, retenu chaque mois par l'employeur sur la paie."
    },
    {
      "termino": "Revenu net imposable",
      "definicion": "Le revenu qui reste après les déductions prévues par le Code général des impôts et sur lequel le barème s'applique."
    },
    {
      "termino": "Tranche",
      "definicion": "Une part du revenu mensuel taxée à un même taux."
    }
  ]
});
