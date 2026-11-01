import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.convertisseur-euro-fcfa",
  h1: "Convertisseur euro franc CFA ({{anio}})",
  title: "Euro en franc CFA {{anio}} : parité fixe de {{bj.parite-euro}}",
  description: "Convertissez des euros en francs CFA et des francs CFA en euros au Bénin avec la parité fixe de {{bj.parite-euro}} francs CFA pour un euro.",
  intro: [
    "Un euro vaut {{bj.parite-euro}} au Bénin. Comme dans les autres pays de l'UEMOA, le franc CFA vaut toujours le même nombre d'euros. Un transfert depuis la France, un achat sur internet ou un salaire en euros se convertissent donc sans taux du jour.",
    "Choisissez le sens, saisissez le montant et lisez le résultat.",
  ],
  comoSeCalcula: [
    "Un euro vaut {{bj.parite-euro}} francs CFA, parité en vigueur depuis le {{bj.parite-euro#desde}}.",
    "Pour passer des euros aux francs CFA, on multiplie le montant par cette parité. Dans l'autre sens, on le divise.",
    "Ce taux est celui de la parité officielle, pas celui d'un guichet : les banques, les bureaux de change et les services de transfert ajoutent leur commission ou appliquent un écart.",
  ],
  ejemplo: [
    "500 euros valent 327 978,50 francs CFA. Un million de francs CFA représente environ 1 524,49 euros.",
  ],
  faq: [
    {
      pregunta: "Quelle est la parité entre l'euro et le franc CFA ?",
      respuesta: "Un euro vaut {{bj.parite-euro}} francs CFA, sans variation depuis le {{bj.parite-euro#desde}}.",
    },
    {
      pregunta: "Pourquoi le taux ne bouge-t-il jamais ?",
      respuesta: "Le franc CFA de l'Afrique de l'Ouest est rattaché à l'euro par une parité fixe. Seul le dollar et les autres devises varient face à l'euro, donc face au franc CFA.",
    },
    {
      pregunta: "Quelle banque centrale émet le franc CFA du Bénin ?",
      respuesta: "La Banque centrale des États de l'Afrique de l'Ouest, la BCEAO, dont le Bénin est membre.",
    },
  ],
  glosario: [
    { termino: "XOF", definicion: "Le code international du franc CFA de l'Afrique de l'Ouest." },
    { termino: "Parité fixe", definicion: "Un taux de change officiel qui ne varie pas." },
    { termino: "UEMOA", definicion: "L'Union économique et monétaire ouest-africaine, qui partage cette monnaie." },
  ],
});
