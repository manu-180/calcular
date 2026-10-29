import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ne.convertisseur-euro-fcfa",
  "h1": "Convertisseur euro franc CFA",
  "title": "Convertisseur euro franc CFA : parité fixe BCEAO",
  "description": "Convertissez des euros en francs CFA et l'inverse au cours fixe de {{ne.parite-euro}} pour un euro, affiché par la BCEAO.",
  "intro": [
    "Un euro vaut {{ne.parite-euro}} au Niger comme dans toute la zone du franc CFA d'Afrique de l'Ouest. Ce cours ne bouge pas d'un jour à l'autre.",
    "Saisissez un montant en euros ou en francs CFA et lisez le résultat."
  ],
  "comoSeCalcula": [
    "Euros vers francs CFA : on multiplie le montant par {{ne.parite-euro}}.",
    "Francs CFA vers euros : on divise le montant par {{ne.parite-euro}}.",
    "Le résultat en francs est arrondi au franc, celui en euros au centime."
  ],
  "ejemplo": [
    "100 euros valent 65 596 F CFA (100 × 655,957 = 65 595,7). Inversement, 655 957 F CFA valent 1 000 euros."
  ],
  "faq": [
    {
      "pregunta": "Pourquoi le cours de l'euro ne change-t-il pas ?",
      "respuesta": "Le franc CFA est rattaché à l'euro par une parité fixe. La BCEAO affiche l'euro à {{ne.parite-euro}} à l'achat comme à la vente."
    },
    {
      "pregunta": "Ma banque applique-t-elle ce cours ?",
      "respuesta": "Elle peut y ajouter des commissions de change. Le cours de la BCEAO sert de référence."
    },
    {
      "pregunta": "Où voir le cours officiel ?",
      "respuesta": "Sur la page d'accueil du site de la BCEAO, rubrique « Cours des devises contre Franc CFA »."
    }
  ],
  "glosario": [
    {
      "termino": "Parité fixe",
      "definicion": "Un taux de change fixé par accord, qui ne varie pas avec le marché."
    },
    {
      "termino": "BCEAO",
      "definicion": "Banque Centrale des États de l'Afrique de l'Ouest, qui émet le franc CFA de la zone UEMOA."
    }
  ]
});
