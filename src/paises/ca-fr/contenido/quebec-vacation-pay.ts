import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.quebec-vacation-pay",
  h1: "Calcul de l'indemnité de vacances au Québec",
  title: "Indemnité de vacances au Québec : calcul",
  description: "Calculez votre indemnité de vacances minimale selon la Loi sur les normes du travail, à partir de votre salaire brut et de vos années de service continu.",
  intro: [
    "Inscrivez votre salaire brut de l'année de référence et vos années de service continu pour voir l'indemnité de vacances minimale prévue par la loi.",
    "Votre contrat ou votre convention collective peut prévoir plus, jamais moins.",
  ],
  comoSeCalcula: [
    "L'indemnité est de {{ca.qc-vacation-pay[rate-0]}} du salaire brut gagné pendant l'année de référence.",
    "À partir de {{ca.qc-vacation-pay[years-1]}} ans de service continu à la fin de l'année de référence, elle est de {{ca.qc-vacation-pay[rate-1]}}.",
  ],
  faq: [
    {
      pregunta: "Quand le taux augmente-t-il?",
      respuesta: "Quand vous atteignez {{ca.qc-vacation-pay[years-1]}} ans de service continu à la fin de l'année de référence : le taux passe alors à {{ca.qc-vacation-pay[rate-1]}}.",
    },
    {
      pregunta: "Quel salaire compte?",
      respuesta: "Le salaire brut gagné pendant l'année de référence.",
    },
    {
      pregunta: "Et les emplois de compétence fédérale?",
      respuesta: "Ce calcul suit la Loi sur les normes du travail du Québec. Les emplois de compétence fédérale suivent le Code canadien du travail.",
    },
  ],
  glosario: [
    { termino: "Année de référence", definicion: "La période de 12 mois qui sert à calculer la durée des vacances et l'indemnité." },
    { termino: "Service continu", definicion: "La période ininterrompue pendant laquelle vous êtes lié au même employeur." },
  ],
});
