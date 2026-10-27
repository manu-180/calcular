import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.convertisseur-euro-fcfa",
  h1: "Convertisseur euro franc CFA",
  title: "Convertisseur euro franc CFA : 1 euro = {{tg.parite-euro}}",
  description: "Convertissez des euros en francs CFA et inversement au Togo, avec la parité fixe de la BCEAO : 1 euro = {{tg.parite-euro}}.",
  intro: [
    "Le Togo utilise le franc CFA de l'Afrique de l'Ouest (XOF), dont la parité avec l'euro est fixe depuis le 1er janvier 1999.",
    "Choisissez le sens de conversion et le montant pour obtenir la somme exacte.",
  ],
  comoSeCalcula: ["Euros vers francs CFA : montant × {{tg.parite-euro}}.", "Francs CFA vers euros : montant ÷ {{tg.parite-euro}}."],
  ejemplo: ["100 euros valent 65 596 F CFA (65 595,7 arrondi au franc)."],
  faq: [
    {
      pregunta: "Pourquoi le cours de l'euro ne change-t-il jamais ?",
      respuesta: "La parité entre le franc CFA et l'euro est fixe. La BCEAO affiche le même cours à l'achat et à la vente.",
    },
    {
      pregunta: "Les bureaux de change appliquent-ils ce cours ?",
      respuesta: "Ils peuvent ajouter une commission ou des frais. Le cours officiel reste la référence.",
    },
    {
      pregunta: "Le franc CFA du Togo est-il le même qu'au Bénin ou en Côte d'Ivoire ?",
      respuesta: "Oui. Les huit pays de l'UEMOA partagent le franc CFA émis par la BCEAO.",
    },
  ],
  glosario: [
    { termino: "XOF", definicion: "Code du franc CFA de l'Union économique et monétaire ouest-africaine." },
    { termino: "BCEAO", definicion: "Banque centrale des États de l'Afrique de l'Ouest." },
  ],
});
