import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ci.convertisseur-dollar-fcfa",
  "h1": "Convertisseur dollar franc CFA",
  "title": "Convertisseur dollar franc CFA au cours BCEAO",
  "description": "Convertissez des dollars US en francs CFA au cours publié par la BCEAO ({{ci.usd-xof}} le {{ci.usd-xof#desde}}), et inversement.",
  "intro": [
    "Le cours du dollar en francs CFA varie chaque jour. La BCEAO publie un cours d'achat et un cours de vente.",
    "Ce convertisseur utilise la moyenne des deux, mise à jour avec le dernier cours publié."
  ],
  "comoSeCalcula": [
    "Dollars vers francs CFA : montant × cours du jour ({{ci.usd-xof}}).",
    "Francs CFA vers dollars : montant / cours du jour."
  ],
  "ejemplo": [
    "Au cours de 586 F, 100 dollars valent 58 600 F CFA."
  ],
  "faq": [
    {
      "pregunta": "Quel cours utilise ma banque ?",
      "respuesta": "Chaque banque applique son propre cours et ses frais. Le cours de la BCEAO sert de référence."
    },
    {
      "pregunta": "Pourquoi le cours change-t-il ?",
      "respuesta": "Le franc CFA est lié à l'euro. Le cours du dollar suit donc celui de l'euro face au dollar."
    },
    {
      "pregunta": "À quelle fréquence le cours est-il mis à jour ?",
      "respuesta": "La BCEAO publie les cours des devises chaque jour ouvré."
    }
  ],
  "glosario": [
    {
      "termino": "Cours d'achat et de vente",
      "definicion": "Les prix auxquels la banque achète et vend la devise."
    }
  ]
});
