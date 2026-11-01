import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ne.convertisseur-dollar-fcfa",
  "h1": "Convertisseur dollar franc CFA",
  "title": "Convertisseur dollar franc CFA au cours BCEAO",
  "description": "Convertissez des dollars US en francs CFA au cours de la BCEAO ({{ne.usd-xof}} au {{ne.usd-xof#desde}}) et des francs CFA en dollars.",
  "intro": [
    "Le dollar vaut {{ne.usd-xof}} selon le dernier cours publié par la BCEAO ({{ne.usd-xof#desde}}). Il varie avec le cours de l'euro face au dollar.",
    "Ce convertisseur retient la moyenne du cours d'achat et du cours de vente de la banque centrale."
  ],
  "comoSeCalcula": [
    "Dollars vers francs CFA : montant multiplié par {{ne.usd-xof}}.",
    "Francs CFA vers dollars : montant divisé par {{ne.usd-xof}}."
  ],
  "ejemplo": [
    "Avec un cours moyen de 589,75 F, 100 dollars valent 58 975 F CFA."
  ],
  "faq": [
    {
      "pregunta": "Quel cours utilise ce convertisseur ?",
      "respuesta": "La moyenne des cours d'achat et de vente du dollar publiés par la BCEAO sur son site."
    },
    {
      "pregunta": "Pourquoi le cours du dollar change-t-il ?",
      "respuesta": "Le franc CFA est lié à l'euro. Quand l'euro monte ou baisse face au dollar, le cours du dollar en francs CFA suit."
    },
    {
      "pregunta": "Mon bureau de change applique-t-il le même cours ?",
      "respuesta": "Non, il fixe ses propres cours et commissions. Le cours de la BCEAO donne un repère."
    }
  ],
  "glosario": [
    {
      "termino": "Cours d'achat",
      "definicion": "Le prix auquel la banque achète des dollars."
    },
    {
      "termino": "Cours de vente",
      "definicion": "Le prix auquel la banque vend des dollars."
    }
  ]
});
