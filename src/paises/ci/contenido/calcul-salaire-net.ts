import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ci.calcul-salaire-net",
  h1: "Calcul du salaire net en Côte d'Ivoire",
  title: "Calcul salaire net Côte d'Ivoire : du brut au net",
  description:
    "Passez du salaire brut au net : ITS avec la réduction pour charges de famille et cotisation retraite CNPS de {{ci.cnps-taux[retraite-salarie]}}.",
  intro: [
    "Le salaire net est ce qui reste du brut après l'impôt sur les traitements et salaires (ITS) et la cotisation retraite à la CNPS.",
    "Indiquez votre brut, votre situation de famille et vos indemnités non imposables. Vous obtenez le net à payer du mois.",
  ],
  comoSeCalcula: [
    "L'ITS se calcule sur le brut imposable avec le barème mensuel, moins la réduction pour charges de famille selon votre nombre de parts.",
    "La CNPS retient {{ci.cnps-taux[retraite-salarie]}} pour la retraite, sur le salaire limité à {{ci.cnps-plafond-retraite-smig}} fois le SMIG.",
    "On retire les autres retenues que vous indiquez, puis on ajoute les indemnités non imposables comme le transport.",
  ],
  ejemplo: ["Avec 300 000 F bruts, célibataire sans enfant : 39 000 F d'ITS et 18 900 F de CNPS. Le net est de 242 100 F."],
  faq: [
    {
      pregunta: "Pourquoi mon net est-il plus élevé si je suis marié ?",
      respuesta:
        "Le mariage et les enfants augmentent votre nombre de parts. La réduction pour charges de famille baisse alors l'ITS retenu chaque mois.",
    },
    {
      pregunta: "L'ITS se calcule-t-il après la CNPS ?",
      respuesta: "Non. Le barème de l'ITS s'applique au montant brut imposable. La cotisation retraite ne diminue pas la base de l'impôt.",
    },
    {
      pregunta: "Que mettre dans les autres retenues ?",
      respuesta:
        "Ce qui figure sur votre bulletin en plus de l'ITS et de la CNPS, par exemple la couverture maladie, une mutuelle ou une avance sur salaire.",
    },
  ],
  glosario: [
    { termino: "Salaire brut imposable", definicion: "Salaire, primes, heures supplémentaires et avantages en nature, sans les indemnités exonérées." },
    { termino: "Net à payer", definicion: "La somme versée au salarié une fois toutes les retenues faites." },
  ],
});
