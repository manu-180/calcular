import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.convertisseur-euro-fcfa",
  h1: "Convertisseur euro franc CFA",
  title: "Convertir euros en francs CFA (XOF) : parité fixe",
  description: "Convertissez des euros en francs CFA et inversement. La parité est fixe : 1 euro vaut {{bf.parite-euro}} depuis le 1er janvier 1999.",
  intro: [
    "Le franc CFA (XOF), monnaie du Burkina Faso émise par la BCEAO, est arrimé à l'euro.",
    "Indiquez un montant et le sens de la conversion. Le résultat ne dépend pas du jour : la parité ne bouge pas.",
  ],
  comoSeCalcula: [
    "Euros vers francs CFA : montant × {{bf.parite-euro}}.",
    "Francs CFA vers euros : montant ÷ {{bf.parite-euro}}, arrondi au centime.",
    "Les banques et bureaux de change peuvent ajouter une commission : le calcul donne la valeur officielle.",
  ],
  ejemplo: ["100 euros valent 65 596 F CFA. 100 000 F CFA valent 152,45 euros."],
  faq: [
    {
      pregunta: "Pourquoi la parité est-elle fixe ?",
      respuesta: "Le franc CFA est arrimé à l'euro depuis le 1er janvier 1999, au taux de {{bf.parite-euro}} pour 1 euro, selon la BCEAO.",
    },
    {
      pregunta: "La parité a-t-elle déjà changé ?",
      respuesta: "Oui. Selon la BCEAO, le franc CFA a été dévalué le 12 janvier 1994, avant d'être arrimé à l'euro le 1er janvier 1999.",
    },
    {
      pregunta: "Combien valent 1 000 F CFA en euros ?",
      respuesta: "Environ 1,52 euro : 1 000 divisé par {{bf.parite-euro}}.",
    },
  ],
  glosario: [
    { termino: "XOF", definicion: "Code du franc CFA de l'Afrique de l'Ouest, émis par la BCEAO." },
    { termino: "Parité fixe", definicion: "Un taux de change qui ne varie pas d'un jour à l'autre." },
  ],
});
