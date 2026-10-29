import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.convertisseur-dollar-fcfa",
  h1: "Convertisseur dollar franc CFA",
  title: "Convertisseur dollar franc CFA au cours de la BCEAO",
  description: "Convertissez des dollars US en francs CFA au cours de la BCEAO ({{tg.usd-xof}} le {{tg.usd-xof#desde}}), et des francs CFA en dollars.",
  intro: [
    "Le cours du dollar en francs CFA change chaque jour. La BCEAO publie un cours d'achat et un cours de vente sur son site.",
    "Ce convertisseur prend la moyenne des deux, avec le dernier cours publié.",
  ],
  comoSeCalcula: ["Dollars vers francs CFA : montant × cours du jour ({{tg.usd-xof}}).", "Francs CFA vers dollars : montant ÷ cours du jour."],
  ejemplo: ["Au cours de 585,25 F, 100 dollars valent 58 525 F CFA."],
  faq: [
    {
      pregunta: "Quel cours applique ma banque ?",
      respuesta: "Chaque banque fixe son propre cours et ses frais. Le cours de la BCEAO sert de référence.",
    },
    {
      pregunta: "Pourquoi le cours du dollar varie-t-il ?",
      respuesta: "Le franc CFA est arrimé à l'euro : le cours du dollar en francs CFA suit celui de l'euro face au dollar.",
    },
    {
      pregunta: "Quand le cours est-il mis à jour ?",
      respuesta: "La BCEAO publie les cours des devises chaque jour ouvré.",
    },
  ],
  glosario: [{ termino: "Cours d'achat et de vente", definicion: "Les prix auxquels la banque achète et vend la devise." }],
});
