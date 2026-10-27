import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.impot-sur-les-societes",
  h1: "Calcul de l'impôt sur les sociétés au Cameroun",
  title: "Impôt sur les sociétés Cameroun : taux et minimum",
  description:
    "Calculez l'impôt sur les sociétés : {{cm.is-taux[droit-commun]}} ou {{cm.is-taux[pme]}} selon le chiffre d'affaires, minimum de perception et centimes communaux.",
  intro: [
    "Les sociétés du régime du réel paient l'impôt sur leur bénéfice. Il ne peut pas être inférieur à un minimum calculé sur le chiffre d'affaires.",
    "Les centimes additionnels communaux s'ajoutent ensuite au principal.",
  ],
  comoSeCalcula: [
    "Le taux est de {{cm.is-taux[droit-commun]}}, ou de {{cm.is-taux[pme]}} si le chiffre d'affaires ne dépasse pas {{cm.is-seuil-pme}}.",
    "Le minimum de perception vaut {{cm.minimum-perception}} du chiffre d'affaires. On retient le plus élevé des deux montants.",
    "On ajoute {{cm.cac}} de centimes additionnels communaux sur ce principal.",
  ],
  ejemplo: [
    "Une PME réalise 800 millions de chiffre d'affaires et 50 millions de bénéfice. L'impôt sur le bénéfice serait de 12,5 millions, mais le minimum est de 16 millions. Avec les CAC, elle paie 17,6 millions.",
  ],
  faq: [
    {
      pregunta: "Le minimum de perception est-il payé à part ?",
      respuesta: "Non. Il se paie par acomptes mensuels sur le chiffre d'affaires, puis s'impute sur l'impôt de l'exercice. Le calcul montre le montant dû pour l'année.",
    },
    {
      pregunta: "Le taux réduit est-il automatique ?",
      respuesta: "Il vaut pour les contribuables dont le chiffre d'affaires ne dépasse pas {{cm.is-seuil-pme}}. Ils peuvent opter pour le taux de droit commun, de manière irrévocable pour cinq exercices.",
    },
    {
      pregunta: "Le calcul couvre-t-il les régimes particuliers ?",
      respuesta: "Non. Les entreprises sous un régime dérogatoire ou incitatif gardent les taux propres à leur régime.",
    },
  ],
  glosario: [
    { termino: "Bénéfice fiscal", definicion: "Le résultat de l'exercice corrigé selon les règles fiscales, sur lequel porte l'impôt." },
    { termino: "Minimum de perception", definicion: "Impôt plancher calculé sur le chiffre d'affaires, dû même en cas de perte." },
  ],
});
