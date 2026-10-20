import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sn.calcul-nombre-de-parts",
  h1: "Calcul du nombre de parts fiscales au Sénégal",
  title: "Nombre de parts fiscales au Sénégal : calcul",
  description: "Calculez votre nombre de parts selon votre situation de famille et la réduction d'impôt pour charges de famille qui y correspond, d'après le CGI.",
  intro: [
    "Le nombre de parts fixe la réduction d'impôt pour charges de famille appliquée à votre impôt sur le revenu.",
    "Inscrivez votre situation de famille et vos enfants à charge pour le connaître.",
  ],
  comoSeCalcula: [
    "Une personne célibataire, divorcée ou veuve sans enfant a 1 part. Une personne mariée a 1,5 part, comme un veuf qui a des enfants à charge.",
    "Chaque enfant à charge ajoute une demi-part. Quand un seul conjoint a des revenus imposables, il reçoit une demi-part de plus. Le maximum est de 5 parts.",
  ],
  faq: [
    {
      pregunta: "Quels enfants sont à charge?",
      respuesta: "Les enfants mineurs ou infirmes, ou de moins de 25 ans qui poursuivent leurs études, sans revenus distincts, ainsi que les enfants recueillis dans les conditions du Code de la famille.",
    },
    {
      pregunta: "Quelle réduction donne 1 part?",
      respuesta: "Aucune : avec 1 part, la réduction est de {{sn.ir-reduction-taux[1]}}.",
    },
    {
      pregunta: "Quelle réduction donne le maximum de 5 parts?",
      respuesta: "{{sn.ir-reduction-taux[5]}} de l'impôt, entre {{sn.ir-reduction-min[5]}} et {{sn.ir-reduction-max[5]}}.",
    },
  ],
  glosario: [
    { termino: "Part", definicion: "L'unité qui mesure les charges de famille pour la réduction d'impôt." },
    { termino: "Réduction pour charges de famille", definicion: "Le pourcentage retiré de l'impôt sur le revenu selon le nombre de parts, entre un minimum et un maximum." },
  ],
});
