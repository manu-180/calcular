import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.indemnite-depart-retraite",
  h1: "Calcul de l'indemnité de départ à la retraite au Mali",
  title: "Indemnité de départ à la retraite au Mali : calcul",
  description: "Calculez l'indemnité de départ à la retraite au Mali. Elle se calcule comme l'indemnité de licenciement, selon l'article L.55 du Code du travail.",
  intro: [
    "Le salarié qui quitte définitivement son entreprise pour toucher sa pension de retraite reçoit une indemnité de départ à la retraite.",
    "Elle se calcule sur les mêmes bases que l'indemnité de licenciement : votre rémunération moyenne et vos années de service.",
  ],
  comoSeCalcula: [
    "On prend la moyenne mensuelle de la rémunération des douze derniers mois, sans les remboursements de frais.",
    "Chaque année de service vaut {{ml.licenciement-taux[0].tasa}} de cette moyenne pour les {{ml.licenciement-taux[0].hasta}} premières années, {{ml.licenciement-taux[1].tasa}} de la 6e à la 10e année et {{ml.licenciement-taux[-1].tasa}} au-delà, fractions d'année comprises.",
  ],
  ejemplo: ["Après 25 ans de service avec 250 000 F de rémunération moyenne : 100 % + 125 % + 15 × 30 % = 675 %, soit 1 687 500 F."],
  faq: [
    {
      pregunta: "Peut-on cumuler cette indemnité avec l'indemnité de licenciement ?",
      respuesta: "Non. Quand le salarié part pour toucher sa pension de retraite, il perçoit l'indemnité de départ à la retraite à la place de l'indemnité de licenciement ou de services rendus.",
    },
    {
      pregunta: "Est-elle imposable ?",
      respuesta: "Non, dans la limite des montants fixés par le Code du travail. Le Code général des impôts l'exclut de l'ITS dans cette limite.",
    },
    {
      pregunta: "Faut-il une ancienneté minimale ?",
      respuesta: "Le Code du travail ne fixe pas d'ancienneté minimale pour cette indemnité : elle se calcule sur les années effectuées.",
    },
  ],
  glosario: [{ termino: "Pension de retraite", definicion: "Revenu versé par l'INPS au salarié qui a cessé son activité et remplit les conditions d'âge et de cotisation." }],
});
