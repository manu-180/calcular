import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.convertisseur-euro-fcfa",
  h1: "Convertisseur euro franc CFA",
  title: "Convertir euros en francs CFA (XOF) au taux fixe",
  description: "Convertissez des euros en francs CFA ou des francs CFA en euros au taux fixe de la BCEAO : 1 euro = {{ml.parite-euro}}.",
  intro: [
    "Le franc CFA utilisé au Mali et dans l'UEMOA est lié à l'euro par une parité fixe. Le taux ne change pas d'un jour à l'autre.",
    "Choisissez le sens de la conversion et le montant.",
  ],
  comoSeCalcula: [
    "Depuis le {{ml.parite-euro#desde}}, 1 euro vaut {{ml.parite-euro}}.",
    "Pour passer en francs CFA, on multiplie les euros par la parité. Pour passer en euros, on divise les francs par la parité.",
  ],
  ejemplo: ["100 euros valent 65 596 F CFA (100 × 655,957, arrondi au franc)."],
  faq: [
    {
      pregunta: "Pourquoi ma banque me donne-t-elle un autre montant ?",
      respuesta: "La parité est fixe, mais une banque ou un bureau de change peut prendre des commissions et des frais en plus.",
    },
    {
      pregunta: "Le franc CFA du Mali est-il le même qu'au Sénégal ?",
      respuesta: "Oui. Le Mali, le Sénégal et la Côte d'Ivoire utilisent le même franc CFA (XOF), émis par la BCEAO pour les pays de l'UEMOA.",
    },
    {
      pregunta: "Depuis quand la parité est-elle fixée ?",
      respuesta: "Le franc CFA est arrimé à l'euro depuis le {{ml.parite-euro#desde}}, date de la création de l'euro.",
    },
  ],
  glosario: [
    { termino: "XOF", definicion: "Code du franc CFA de l'Afrique de l'Ouest, émis par la BCEAO." },
    { termino: "Parité fixe", definicion: "Un taux de change qui ne varie pas." },
  ],
});
