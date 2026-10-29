import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.convertisseur-dollar-fcfa",
  h1: "Convertisseur dollar franc CFA",
  title: "Convertir dollars en francs CFA (XOF) au cours BCEAO",
  description: "Convertissez des dollars US en francs CFA ou l'inverse avec le cours publié par la BCEAO : 1 dollar = {{ml.usd-xof}} le {{ml.usd-xof#desde}}.",
  intro: [
    "Contrairement à l'euro, le dollar n'a pas de parité fixe avec le franc CFA. Son cours change chaque jour.",
    "Le calcul utilise la moyenne des cours d'achat et de vente publiés par la BCEAO.",
  ],
  comoSeCalcula: [
    "Au {{ml.usd-xof#desde}}, 1 dollar US vaut {{ml.usd-xof}} (moyenne des cours d'achat et de vente de la BCEAO).",
    "Pour passer en francs CFA, on multiplie les dollars par ce cours. Pour passer en dollars, on divise les francs par ce cours.",
  ],
  faq: [
    {
      pregunta: "Pourquoi le cours du dollar change-t-il ?",
      respuesta: "Le franc CFA suit l'euro. Le cours du dollar en francs CFA varie donc avec le cours du dollar face à l'euro.",
    },
    {
      pregunta: "Quel montant recevrai-je au guichet ?",
      respuesta: "Le cours d'une banque ou d'un bureau de change peut différer de la moyenne de la BCEAO et s'accompagner de commissions.",
    },
    {
      pregunta: "D'où vient le cours ?",
      respuesta: "De la page d'accueil de la BCEAO, qui publie les cours d'achat et de vente des principales devises avec leur date.",
    },
  ],
  glosario: [{ termino: "BCEAO", definicion: "Banque centrale des États de l'Afrique de l'Ouest, qui émet le franc CFA." }],
});
