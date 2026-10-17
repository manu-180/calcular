import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be-fr.maaltijdcheques-berekenen",
  h1: "Calcul des chèques-repas : combien recevez-vous par mois ?",
  title: "Chèques-repas : jusqu'à {{be.maaltijdcheque[werkgever-max]}} de votre employeur",
  description:
    "Calculez la valeur de vos chèques-repas par mois : intervention de l'employeur jusqu'à {{be.maaltijdcheque[werkgever-max]}}, la vôtre d'au moins {{be.maaltijdcheque[werknemer-min]}} par chèque.",
  intro: [
    "Un chèque-repas se compose d'une part de votre employeur, au maximum {{be.maaltijdcheque[werkgever-max]}}, et d'une part payée par vous, au moins {{be.maaltijdcheque[werknemer-min]}}.",
    "Indiquez le nombre de jours travaillés et les interventions prévues par votre convention ou votre contrat. Vous voyez ce qui arrive sur votre carte et ce que vous gagnez réellement.",
  ],
  comoSeCalcula: [
    "Vous recevez un chèque par jour effectivement presté.",
    "Valeur par chèque : intervention de l'employeur + votre intervention.",
    "Votre intervention est payée par vous. Votre avantage réel est la part de l'employeur.",
  ],
  ejemplo: [
    "Avec 20 jours de travail, l'intervention maximale de l'employeur et votre intervention minimale, 200 € arrivent sur votre carte. Vous en payez 21,80 € vous-même, votre avantage est donc de 178,20 €.",
  ],
  faq: [
    {
      pregunta: "Combien de temps un chèque-repas reste-t-il valable ?",
      respuesta: "Douze mois à partir du moment où il est placé sur votre compte chèques-repas. Ensuite, vous pouvez demander une fois gratuitement sa réactivation dans les trois mois.",
    },
    {
      pregunta: "À quoi puis-je utiliser mes chèques-repas ?",
      respuesta: "Uniquement pour payer un repas ou acheter des aliments prêts à la consommation.",
    },
    {
      pregunta: "Les chèques-repas sont-ils exonérés ?",
      respuesta:
        "La part de votre employeur est exonérée de cotisations sociales et d'impôts si les conditions sont remplies. L'octroi doit notamment figurer dans une convention collective ou un accord écrit, et les chèques ne peuvent pas remplacer du salaire.",
    },
  ],
  glosario: [
    { termino: "Chèque-repas", definicion: "Un chèque électronique pour payer des repas ou de l'alimentation, financé en partie par votre employeur." },
    { termino: "Intervention patronale", definicion: "La partie du chèque payée par votre employeur." },
  ],
});
