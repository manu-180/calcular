import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be-fr.rsz-berekenen",
  h1: "Calcul des cotisations ONSS et du bonus à l'emploi",
  title: "Cotisations ONSS {{anio}} : {{be.rsz-werknemer}} et bonus à l'emploi",
  description:
    "Calculez vos cotisations personnelles ONSS de {{be.rsz-werknemer}}, le bonus à l'emploi pour les bas salaires et la cotisation spéciale de sécurité sociale.",
  intro: [
    "Comme travailleur salarié, vous versez {{be.rsz-werknemer}} de votre salaire brut à la sécurité sociale. Cette cotisation finance votre pension, l'assurance maladie et l'assurance chômage.",
    "Si votre salaire est bas, vous recevez une réduction de cette cotisation : le bonus à l'emploi. Votre employeur retient aussi une cotisation spéciale de sécurité sociale, qui dépend de votre salaire et de votre situation familiale.",
  ],
  comoSeCalcula: [
    "Cotisations ONSS : {{be.rsz-werknemer}} de votre salaire brut. Pour les ouvriers, sur 108 % du brut.",
    "Bonus à l'emploi volet A (bas salaires) : montant complet jusqu'à un salaire mensuel de référence de {{be.werkbonus[grens-a]}}, puis il diminue jusqu'à zéro à {{be.werkbonus[plafond-a]}}.",
    "Bonus à l'emploi volet B (très bas salaires) : complet jusqu'à {{be.werkbonus[grens-b]}}, puis il diminue jusqu'à zéro à {{be.werkbonus[plafond-b]}}.",
    "Le bonus à l'emploi ne peut jamais dépasser vos cotisations ONSS.",
    "Cotisation spéciale : un montant trimestriel selon un barème appliqué à votre salaire du trimestre, retenu chaque mois pour un tiers.",
  ],
  ejemplo: [
    "Un employé isolé avec 2.800 € bruts paie 365,96 € de cotisations ONSS. Le bonus à l'emploi est de 127,54 € (volet A) plus 37,21 € (volet B), il reste donc 201,21 € d'ONSS. La cotisation spéciale est de 17,04 € par mois.",
  ],
  faq: [
    {
      pregunta: "À quoi servent les cotisations ONSS ?",
      respuesta: "Votre cotisation personnelle finance votre pension, l'assurance maladie-invalidité et l'assurance chômage. Votre employeur paie en plus ses propres cotisations.",
    },
    {
      pregunta: "Est-ce que je reçois le bonus à l'emploi automatiquement ?",
      respuesta: "Oui. Votre employeur l'applique à chaque paiement du salaire si votre salaire est sous le plafond. Vous n'avez rien à faire.",
    },
    {
      pregunta: "La cotisation spéciale de sécurité sociale est-elle définitive ?",
      respuesta: "Non. Les retenues mensuelles sont des avances. Le SPF Finances régularise la cotisation avec votre déclaration d'impôt, sur la base du revenu imposable de votre ménage.",
    },
  ],
  glosario: [
    { termino: "Salaire mensuel de référence", definicion: "Le salaire brut d'un mois complet à 100 %, qui sert à déterminer le bonus à l'emploi." },
    { termino: "Bonus à l'emploi", definicion: "Une réduction des cotisations personnelles ONSS pour les travailleurs à bas salaire." },
    { termino: "ONSS", definicion: "Office national de sécurité sociale, qui perçoit les cotisations sociales." },
  ],
});
