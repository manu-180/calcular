import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.impot-foncier-propriete-batie",
  h1: "Calcul de l'impôt foncier sur la propriété bâtie (IFPB)",
  title: "IFPB Madagascar : calcul de l'impôt foncier bâti",
  description: "Estimez l'IFPB de votre maison ou de votre immeuble à Madagascar : {{mg.ifpb[taux]}} de la valeur locative, minimum de {{mg.ifpb-minimum}} par immeuble.",
  intro: [
    "L'impôt foncier sur la propriété bâtie (IFPB) est un impôt annuel perçu dans la commune où se trouve l'immeuble : {{mg.ifpb[taux]}} de la valeur locative, avec un minimum de {{mg.ifpb-minimum}}.",
    "Indiquez le loyer si le bien est loué, ou la valeur locative fixée par la commune si vous y habitez.",
  ],
  comoSeCalcula: [
    "Pour un bien loué, la base est le loyer déclaré ramené à l'année. Elle ne peut pas être inférieure à la valeur fixée par la commission communale.",
    "Pour la résidence principale du propriétaire, la base est réduite à {{mg.ifpb[residence-principale]}} de la valeur locative fixée par la commission.",
    "L'impôt est de {{mg.ifpb[taux]}} de la base, sans descendre sous {{mg.ifpb-minimum}} par immeuble.",
  ],
  ejemplo: ["Une maison louée 600 000 Ar par mois : base de 7 200 000 Ar, IFPB de 360 000 Ar."],
  faq: [
    {
      pregunta: "Qui fixe la valeur locative ?",
      respuesta: "Une commission municipale ou communale, d'après ses critères d'évaluation. Les conseillers peuvent la réviser chaque année. Sans révision, elle augmente de 5 % pour trois ans.",
    },
    {
      pregunta: "Une maison neuve paie-t-elle tout de suite ?",
      respuesta: "Non. Les constructions nouvelles, les reconstructions et les agrandissements sont exonérés pendant 5 ans à compter de l'année d'achèvement, sur demande du propriétaire. L'exonération tombe si l'immeuble change de propriétaire, sauf pour les héritiers.",
    },
    {
      pregunta: "Existe-t-il des forfaits ?",
      respuesta: "Oui. Pour certains immeubles construits avec l'autorisation de la commune, le conseil municipal ou communal peut fixer un forfait au lieu du calcul sur la valeur locative.",
    },
  ],
  glosario: [
    { termino: "IFPB", definicion: "Impôt foncier sur la propriété bâtie, perçu chaque année au profit de la commune." },
    { termino: "Valeur locative", definicion: "Loyer annuel que l'immeuble pourrait rapporter." },
  ],
});
