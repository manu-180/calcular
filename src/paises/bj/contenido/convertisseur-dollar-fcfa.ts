import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.convertisseur-dollar-fcfa",
  h1: "Convertisseur dollar US franc CFA ({{anio}})",
  title: "Dollar en franc CFA {{anio}} : cours BCEAO du jour",
  description: "Convertissez des dollars US en francs CFA et l'inverse avec le dernier cours moyen publié par la BCEAO : {{bj.usd-xof}} pour un dollar.",
  intro: [
    "Le dernier cours est de {{bj.usd-xof}} pour un dollar. Le dollar américain n'a pas de parité fixe avec le franc CFA : son cours dépend de celui de l'euro. Pour un achat en ligne, un transfert ou un contrat en dollars, il faut donc un cours récent.",
    "Choisissez le sens et saisissez le montant. Le calcul utilise le dernier cours moyen relevé sur le site de la BCEAO.",
  ],
  comoSeCalcula: [
    "Le cours retenu est la moyenne des cours d'achat et de vente publiés par la BCEAO : {{bj.usd-xof}} pour un dollar, relevé le {{bj.usd-xof#desde}}.",
    "Pour des dollars, on multiplie le montant par ce cours. Pour des francs CFA, on le divise.",
    "Si le dernier relevé date de plus de dix jours, le convertisseur n'est plus proposé, pour ne pas afficher un cours périmé.",
  ],
  ejemplo: [
    "Au cours de 585,25 F, 100 dollars valent 58 525 F. À l'inverse, 100 000 F valent 170,87 dollars.",
  ],
  faq: [
    {
      pregunta: "Quel est le cours du dollar en franc CFA aujourd'hui ?",
      respuesta: "Le dernier cours moyen relevé sur le site de la BCEAO est de {{bj.usd-xof}} pour un dollar, au {{bj.usd-xof#desde}}.",
    },
    {
      pregunta: "Pourquoi le dollar change-t-il alors que l'euro est fixe ?",
      respuesta: "Le franc CFA est lié à l'euro par une parité fixe. Quand l'euro monte ou baisse face au dollar, le franc CFA suit.",
    },
    {
      pregunta: "Est-ce le taux que j'obtiendrai en banque ?",
      respuesta: "Non. Le cours affiché est une moyenne. Les banques, bureaux de change et services de transfert appliquent leur propre écart ou une commission.",
    },
  ],
  glosario: [
    { termino: "Cours moyen", definicion: "La moyenne du cours d'achat et du cours de vente d'une devise." },
    { termino: "BCEAO", definicion: "Banque centrale des États de l'Afrique de l'Ouest, qui émet le franc CFA." },
    { termino: "USD", definicion: "Le code international du dollar américain." },
  ],
});
