import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.13-monatslohn-rechner",
  h1: "Calcul du 13e salaire",
  title: "Calcul du 13e salaire : au prorata en cas d'entrée",
  description: "Combien de 13e salaire vous revient-il ? Part pour une année entière ou en cas d'entrée et de départ en cours d'année, par mois et par an.",
  intro: [
    "Si un 13e salaire est convenu, il correspond pour une année entière à un salaire mensuel supplémentaire.",
    "Le calculateur montre la part si vous n'avez pas travaillé toute l'année. Ce que prévoit votre contrat pour les entrées et les départs est déterminant.",
  ],
  comoSeCalcula: [
    "13e salaire = salaire mensuel × mois travaillés / 12.",
    "Chaque mois travaillé donne un douzième de salaire mensuel.",
    "Le 13e salaire subit les mêmes déductions sociales que le salaire normal.",
  ],
  ejemplo: [
    "Une personne qui commence mi-mai avec un salaire mensuel de 6500 francs travaille 7,5 mois jusqu'à la fin de l'année. Son 13e salaire s'élève alors à 4062,50 francs.",
  ],
  faq: [
    { pregunta: "Ai-je droit à un 13e salaire ?", respuesta: "Seulement s'il est convenu, dans le contrat de travail, dans une convention collective ou dans un contrat-type de travail. La loi ne l'impose pas." },
    { pregunta: "Quelle est la différence avec une gratification ?", respuesta: "Une gratification est une rétribution spéciale accordée à certaines occasions. En cas de départ avant cette occasion, une part n'est due que si elle a été convenue." },
    { pregunta: "Faut-il payer l'AVS sur le 13e salaire ?", respuesta: "Oui. Il fait partie du salaire soumis à l'AVS. Le calcul du salaire net vous indique les déductions." },
  ],
  glosario: [
    { termino: "Gratification", definicion: "Rétribution spéciale accordée à certaines occasions, par exemple à Noël. Elle n'est due que si elle a été convenue." },
  ],
});
