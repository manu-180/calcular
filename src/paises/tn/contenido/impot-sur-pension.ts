import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.impot-sur-pension",
  h1: "Impôt sur la pension de retraite en Tunisie",
  title: "Impôt sur pension de retraite en Tunisie : calcul 2026",
  description:
    "Calculez l'IRPP et la contribution sociale de solidarité sur votre pension de retraite en Tunisie, après l'abattement de {{tn.abattement-pensions}} et les déductions familiales.",
  intro: [
    "Les pensions et rentes viagères sont imposées comme les salaires, mais avec un abattement de {{tn.abattement-pensions}} sur leur montant brut à la place des frais professionnels.",
    "Indiquez votre pension brute mensuelle et votre situation de famille pour connaître l'impôt retenu chaque mois.",
  ],
  comoSeCalcula: [
    "Pension brute annuelle moins l'abattement de {{tn.abattement-pensions}}.",
    "Moins les déductions pour charges de famille, comme pour un salarié.",
    "Le barème de l'IRPP s'applique au reste, puis la contribution sociale de solidarité de {{tn.css-majoration}}, sauf si le revenu imposable ne dépasse pas {{tn.css-seuil-exoneration}}.",
  ],
  faq: [
    {
      pregunta: "L'abattement sur les pensions va-t-il augmenter ?",
      respuesta: "Oui. La loi de finances 2026 le relève par étapes à partir du 1er janvier 2027, jusqu'à la moitié de la pension en 2029.",
    },
    {
      pregunta: "Les retraités ont-ils droit aux déductions pour enfants ?",
      respuesta: "Oui, dans les mêmes conditions que les salariés : {{tn.deductions-famille[chef-de-famille]}} pour le chef de famille et {{tn.deductions-famille[par-enfant]}} par enfant à charge, dans la limite de {{tn.enfants-deduction-max}} enfants.",
    },
    {
      pregunta: "Une petite pension paie-t-elle la contribution sociale de solidarité ?",
      respuesta: "Non, si le revenu net imposable annuel ne dépasse pas {{tn.css-seuil-exoneration}} et que la personne n'a pas d'autres revenus que ses pensions ou salaires.",
    },
  ],
  glosario: [
    { termino: "Abattement", definicion: "Réduction forfaitaire appliquée au montant brut de la pension avant le calcul de l'impôt." },
    { termino: "Rente viagère", definicion: "Somme versée périodiquement jusqu'au décès du bénéficiaire." },
    { termino: "IRPP", definicion: "Impôt sur le revenu des personnes physiques." },
  ],
});
