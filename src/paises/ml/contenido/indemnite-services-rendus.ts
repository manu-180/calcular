import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.indemnite-services-rendus",
  h1: "Indemnité de services rendus en cas de démission au Mali",
  title: "Indemnité de services rendus au Mali : démission",
  description: "Calculez l'indemnité de services rendus due au salarié qui démissionne après au moins dix ans de services continus, selon l'article L.54 du Code du travail.",
  intro: [
    "Au Mali, la démission n'ouvre pas droit à l'indemnité de licenciement. Mais le salarié qui démissionne après au moins {{ml.services-rendus-anciennete-min}} de services continus a droit à une indemnité de services rendus.",
    "Elle se calcule sur les mêmes bases que l'indemnité de licenciement.",
  ],
  comoSeCalcula: [
    "Il faut au moins {{ml.services-rendus-anciennete-min}} de services continus dans l'entreprise.",
    "Chaque année de service vaut {{ml.licenciement-taux[0].tasa}} de la rémunération mensuelle moyenne des douze derniers mois pour les {{ml.licenciement-taux[0].hasta}} premières années, {{ml.licenciement-taux[1].tasa}} de la 6e à la 10e année et {{ml.licenciement-taux[-1].tasa}} au-delà.",
  ],
  ejemplo: ["Après 12 ans de service et 200 000 F de rémunération moyenne : 285 %, soit 570 000 F."],
  faq: [
    {
      pregunta: "Que se passe-t-il avec 9 ans et demi d'ancienneté ?",
      respuesta: "L'indemnité n'est pas due : le Code exige au moins {{ml.services-rendus-anciennete-min}} de services continus.",
    },
    {
      pregunta: "Dois-je respecter un préavis en démissionnant ?",
      respuesta: "Oui. La démission d'un contrat à durée indéterminée suit les mêmes règles de préavis que le licenciement.",
    },
    {
      pregunta: "Et si je pars à la retraite ?",
      respuesta: "Dans ce cas, vous recevez l'indemnité de départ à la retraite, calculée sur les mêmes bases, et non l'indemnité de services rendus.",
    },
  ],
  glosario: [{ termino: "Démission", definicion: "Rupture du contrat à durée indéterminée à l'initiative du salarié." }],
});
