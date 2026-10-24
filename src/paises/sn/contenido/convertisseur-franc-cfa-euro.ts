import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sn.convertisseur-franc-cfa-euro",
  h1: "Convertisseur franc CFA et euro",
  title: "Convertisseur franc CFA euro : parité fixe",
  description: "Convertissez des euros en francs CFA, ou l'inverse, à la parité fixe de la BCEAO : {{sn.parite-euro}} pour 1 euro.",
  intro: [
    "Le franc CFA de l'Afrique de l'Ouest est rattaché à l'euro par une parité fixe.",
    "Inscrivez un montant pour le convertir dans un sens ou dans l'autre.",
  ],
  comoSeCalcula: [
    "Un euro vaut {{sn.parite-euro}}, depuis le {{sn.parite-euro#desde}}.",
    "Les euros sont multipliés par ce taux pour obtenir des francs CFA, et les francs CFA divisés par ce taux pour obtenir des euros.",
  ],
  ejemplo: ["100 euros valent 65 595,70 francs CFA, et 100 000 francs CFA valent environ 152,45 euros."],
  faq: [
    {
      pregunta: "La parité change-t-elle?",
      respuesta: "Non. Elle est fixe : {{sn.parite-euro}} pour 1 euro depuis le {{sn.parite-euro#desde}}.",
    },
    {
      pregunta: "Est-ce le taux de mon bureau de change?",
      respuesta: "Non. Les banques et les bureaux de change peuvent prendre une commission sur l'opération.",
    },
    {
      pregunta: "Quels pays utilisent ce franc CFA?",
      respuesta: "Les pays de l'Union monétaire ouest-africaine, dont la banque centrale est la BCEAO.",
    },
  ],
  glosario: [
    { termino: "XOF", definicion: "Le code du franc CFA de l'Afrique de l'Ouest." },
    { termino: "Parité fixe", definicion: "Un taux de change qui ne varie pas entre deux monnaies." },
  ],
});
