import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.convertisseur-dollar-fcfa",
  h1: "Convertisseur dollar franc CFA",
  title: "Convertir dollars en francs CFA au cours BCEAO",
  description: "Convertissez des dollars US en francs CFA et inversement au cours publié par la BCEAO : 1 dollar vaut {{bf.usd-xof}} au {{bf.usd-xof#desde}}.",
  intro: [
    "Contrairement à l'euro, le dollar n'a pas de parité fixe avec le franc CFA : son cours change chaque jour.",
    "Indiquez un montant et le sens de la conversion. Le calcul utilise la moyenne des cours d'achat et de vente publiés par la BCEAO.",
  ],
  comoSeCalcula: [
    "Dollars vers francs CFA : montant × {{bf.usd-xof}}.",
    "Francs CFA vers dollars : montant ÷ {{bf.usd-xof}}, arrondi au centime.",
    "Le cours retenu est celui du {{bf.usd-xof#desde}}, mis à jour à partir du site de la BCEAO.",
  ],
  ejemplo: ["Au cours du 27 octobre 2026 (585,25 F), 100 dollars valent 58 525 F CFA."],
  faq: [
    {
      pregunta: "Pourquoi le cours du dollar change-t-il ?",
      respuesta: "Le franc CFA suit l'euro à une parité fixe. Le cours du dollar en francs CFA bouge donc avec le cours de l'euro face au dollar.",
    },
    {
      pregunta: "Pourquoi une moyenne entre achat et vente ?",
      respuesta: "La BCEAO publie un cours d'achat et un cours de vente. La moyenne donne une valeur de référence ; votre banque appliquera son propre cours.",
    },
    {
      pregunta: "Où vérifier le cours du jour ?",
      respuesta: "Sur la page d'accueil de la BCEAO, dans le tableau des cours des devises.",
    },
  ],
  glosario: [
    { termino: "Cours d'achat", definicion: "Le prix auquel la banque achète la devise." },
    { termino: "Cours de vente", definicion: "Le prix auquel la banque vend la devise." },
  ],
});
