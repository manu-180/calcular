import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.convertisseur-euro-fcfa",
  h1: "Convertisseur euro franc CFA (XAF)",
  title: "Convertisseur euro franc CFA : parité fixe BEAC",
  description: "Convertissez des euros en francs CFA d'Afrique centrale et l'inverse avec la parité fixe de {{cm.parite-euro}} pour 1 euro.",
  intro: [
    "Le franc CFA de la CEMAC (XAF) a une parité fixe avec l'euro. Un euro vaut toujours le même nombre de francs.",
    "Indiquez un montant et le sens de la conversion.",
  ],
  comoSeCalcula: [
    "D'euros en francs CFA : on multiplie par {{cm.parite-euro}} et on arrondit au franc.",
    "De francs CFA en euros : on divise par la même parité et on arrondit au centime.",
  ],
  ejemplo: ["100 euros valent 65 596 F CFA. 100 000 F CFA valent 152,45 euros."],
  faq: [
    {
      pregunta: "Depuis quand la parité est-elle fixe ?",
      respuesta: "Depuis le {{cm.parite-euro#desde}}, avec l'arrivée de l'euro. La parité découle de celle de l'ancien franc français.",
    },
    {
      pregunta: "Pourquoi ma banque donne-t-elle un autre montant ?",
      respuesta: "La parité ne change pas, mais les banques et bureaux de change ajoutent des commissions ou un écart entre achat et vente.",
    },
    {
      pregunta: "Le franc CFA du Sénégal ou de la Côte d'Ivoire est-il le même ?",
      respuesta: "Non. Le franc CFA de l'Afrique de l'Ouest (XOF) est une autre monnaie, même s'il a la même parité avec l'euro.",
    },
  ],
  glosario: [{ termino: "XAF", definicion: "Code du franc CFA de la Communauté économique et monétaire de l'Afrique centrale, émis par la BEAC." }],
});
