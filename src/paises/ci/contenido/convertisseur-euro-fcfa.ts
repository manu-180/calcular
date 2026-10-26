import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ci.convertisseur-euro-fcfa",
  "h1": "Convertisseur euro franc CFA",
  "title": "Convertisseur euro franc CFA : parité fixe 655,957",
  "description": "Convertissez des euros en francs CFA et inversement avec la parité fixe de la BCEAO : 1 euro = {{ci.parite-euro}}.",
  "intro": [
    "Le franc CFA de l'Afrique de l'Ouest (XOF) a une parité fixe avec l'euro. Le cours ne change pas d'un jour à l'autre.",
    "Choisissez le sens et le montant. Vous obtenez la conversion exacte."
  ],
  "comoSeCalcula": [
    "Euros vers francs CFA : montant × {{ci.parite-euro}}.",
    "Francs CFA vers euros : montant / {{ci.parite-euro}}."
  ],
  "ejemplo": [
    "100 euros valent 65 596 F CFA (65 595,7 arrondi au franc)."
  ],
  "faq": [
    {
      "pregunta": "Pourquoi le cours ne bouge-t-il pas ?",
      "respuesta": "Parce que la parité entre le franc CFA et l'euro est fixe. La BCEAO publie le même cours à l'achat et à la vente."
    },
    {
      "pregunta": "Les bureaux de change appliquent-ils ce cours ?",
      "respuesta": "Ils peuvent prendre une commission ou des frais. Le cours officiel reste la référence."
    },
    {
      "pregunta": "Le franc CFA d'Afrique centrale est-il le même ?",
      "respuesta": "Il a la même parité avec l'euro mais c'est une autre monnaie (XAF), émise par la BEAC."
    }
  ],
  "glosario": [
    {
      "termino": "XOF",
      "definicion": "Code du franc CFA de l'Union économique et monétaire ouest-africaine."
    },
    {
      "termino": "BCEAO",
      "definicion": "Banque centrale des États de l'Afrique de l'Ouest."
    }
  ]
});
