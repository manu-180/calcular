import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.indemnite-licenciement",
  h1: "Calcul de l'indemnité de licenciement au Mali",
  title: "Indemnité de licenciement Mali : calcul selon l'ancienneté",
  description: "Calculez l'indemnité légale de licenciement au Mali : un pourcentage de votre rémunération moyenne par année de service (article L.53 du Code du travail).",
  intro: [
    "Le travailleur licencié après au moins {{ml.licenciement-anciennete-min}} de service continu a droit à une indemnité de licenciement, distincte du préavis. Elle est aussi due en cas de rupture pour force majeure.",
    "Indiquez votre rémunération mensuelle moyenne des douze derniers mois et votre ancienneté. Le calcul tient compte des fractions d'année.",
  ],
  comoSeCalcula: [
    "On prend la moyenne mensuelle de la rémunération des douze mois qui précèdent le licenciement, primes comprises, sans les remboursements de frais.",
    "Chaque année de service vaut {{ml.licenciement-taux[0].tasa}} de cette moyenne pour les {{ml.licenciement-taux[0].hasta}} premières années, {{ml.licenciement-taux[1].tasa}} de la 6e à la 10e année et {{ml.licenciement-taux[-1].tasa}} au-delà.",
    "Les fractions d'année comptent au prorata.",
  ],
  ejemplo: ["Avec 200 000 F de rémunération moyenne et 8 ans de service : 5 × 20 % + 3 × 25 % = 175 %, soit 350 000 F."],
  faq: [
    {
      pregunta: "L'indemnité est-elle due en cas de faute lourde ?",
      respuesta: "Non. Elle n'est pas due si le licenciement est motivé par une faute lourde, appréciée par le juge.",
    },
    {
      pregunta: "L'indemnité de licenciement est-elle imposable ?",
      respuesta: "Non, dans la limite des montants fixés par le Code du travail. Le Code général des impôts l'exclut de l'ITS dans cette limite.",
    },
    {
      pregunta: "Ma convention collective peut-elle prévoir plus ?",
      respuesta: "Oui. Les conventions collectives et les accords d'établissement peuvent prévoir des taux plus favorables, qui remplacent alors ceux du Code.",
    },
  ],
  glosario: [
    { termino: "Ancienneté", definicion: "Durée de service continu dans l'entreprise à la date du licenciement." },
    { termino: "Force majeure", definicion: "Événement imprévisible et irrésistible qui rend impossible la poursuite du contrat." },
  ],
});
