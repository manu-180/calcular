import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.quebec-notice-of-termination",
  h1: "Calcul du préavis de fin d'emploi au Québec",
  title: "Préavis de fin d'emploi au Québec : calcul",
  description: "Voyez le préavis écrit qu'un employeur doit donner au Québec avant de mettre fin à un emploi, selon le service continu, et l'indemnité compensatrice.",
  intro: [
    "Inscrivez vos mois de service continu et votre salaire hebdomadaire habituel pour voir le préavis minimal et ce que l'employeur doit si ce préavis n'est pas donné.",
    "Le calcul suit l'article 82 de la Loi sur les normes du travail. Les licenciements collectifs et certains emplois ont d'autres règles.",
  ],
  comoSeCalcula: [
    "De 3 mois à moins d'un an de service continu, le préavis est de {{ca.qc-notice[3]}}; d'un an à 5 ans, de {{ca.qc-notice[12]}}; de 5 à 10 ans, de {{ca.qc-notice[60]}}; à partir de 10 ans, de {{ca.qc-notice[120]}}.",
    "Si l'employeur ne donne pas le préavis, il verse votre salaire habituel pour ces semaines.",
  ],
  faq: [
    {
      pregunta: "Quel préavis après 10 ans de service?",
      respuesta: "{{ca.qc-notice[120]}}.",
    },
    {
      pregunta: "Et si l'employeur ne donne aucun préavis?",
      respuesta: "Il doit verser une indemnité égale au salaire habituel des semaines de préavis non données.",
    },
    {
      pregunta: "Et les emplois de compétence fédérale?",
      respuesta: "Ce calcul suit la Loi sur les normes du travail du Québec. Les emplois de compétence fédérale suivent le Code canadien du travail.",
    },
  ],
  glosario: [
    { termino: "Avis de cessation d'emploi", definicion: "L'avertissement écrit que l'employeur donne avant de mettre fin à un emploi." },
    { termino: "Indemnité compensatrice", definicion: "Le salaire habituel des semaines de préavis que l'employeur n'a pas données." },
  ],
});
