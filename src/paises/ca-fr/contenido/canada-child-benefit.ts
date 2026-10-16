import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.canada-child-benefit",
  h1: "Calcul de l'allocation canadienne pour enfants (juillet 2026 à juin 2027)",
  title: "Allocation canadienne pour enfants 2026-2027 : calcul",
  description: "Estimez votre allocation canadienne pour enfants de juillet 2026 à juin 2027 : jusqu'à {{ca.ccb-maximum[under-6]}} par année par enfant de moins de 6 ans.",
  intro: [
    "Inscrivez le nombre d'enfants et votre revenu familial net rajusté de 2025 pour estimer vos versements de l'ACE de juillet 2026 à juin 2027.",
    "Le calcul suit les montants et les taux de réduction publiés par l'Agence du revenu du Canada. L'allocation famille du Québec et la prestation pour enfants handicapés ne sont pas incluses.",
  ],
  comoSeCalcula: [
    "On part du maximum pour chaque enfant : {{ca.ccb-maximum[under-6]}} par année avant 6 ans et {{ca.ccb-maximum[6-to-17]}} de 6 à 17 ans.",
    "Si votre revenu familial dépasse {{ca.ccb-thresholds[first]}}, l'allocation est réduite de {{ca.ccb-rates-first[1]}} du revenu au-delà de ce seuil pour un enfant, de {{ca.ccb-rates-first[2]}} pour deux, de {{ca.ccb-rates-first[3]}} pour trois et de {{ca.ccb-rates-first[4]}} pour quatre ou plus.",
    "Au-delà de {{ca.ccb-thresholds[second]}}, la réduction est un montant fixe ({{ca.ccb-base-reduction[1]}} pour un enfant, {{ca.ccb-base-reduction[2]}} pour deux, {{ca.ccb-base-reduction[3]}} pour trois, {{ca.ccb-base-reduction[4]}} pour quatre ou plus) plus {{ca.ccb-rates-second[1]}}, {{ca.ccb-rates-second[2]}}, {{ca.ccb-rates-second[3]}} ou {{ca.ccb-rates-second[4]}} du revenu au-delà de ce seuil.",
    "En garde partagée, chaque parent reçoit la moitié du montant complet, selon son propre revenu familial.",
  ],
  ejemplo: [
    "Un enfant de moins de 6 ans et un revenu familial net de 45 000 $ : la réduction est de 7 % de 6 763 $, soit 473,41 $. L'ACE est donc de 7 683,59 $ pour l'année, environ 640,30 $ par mois.",
  ],
  faq: [
    {
      pregunta: "Quel revenu est utilisé?",
      respuesta: "Les versements de juillet 2026 à juin 2027 sont calculés selon votre revenu familial net rajusté de 2025.",
    },
    {
      pregunta: "L'allocation canadienne pour enfants est-elle imposable?",
      respuesta: "Non. Les versements de l'ACE ne sont pas imposables et vous n'avez pas à les déclarer dans votre déclaration de revenus.",
    },
    {
      pregunta: "Qu'est-ce que le revenu familial net rajusté?",
      respuesta: "Votre revenu net de la ligne 23600 plus celui de votre époux ou conjoint de fait, moins la PUGE et les revenus d'un REEI reçus, plus les montants de PUGE et de REEI remboursés.",
    },
  ],
  glosario: [
    { termino: "ACE", definicion: "Allocation canadienne pour enfants, un versement mensuel non imposable aux familles qui ont des enfants de moins de 18 ans." },
    { termino: "RFNR", definicion: "Revenu familial net rajusté, le revenu que l'ARC utilise pour calculer l'ACE." },
  ],
});
