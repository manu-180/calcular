import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.salaire-social-minimum",
  h1: "Salaire social minimum au Luxembourg",
  title: "Salaire social minimum Luxembourg 2026 : montants",
  description: "Salaire social minimum au Luxembourg depuis le 1er juin 2026 : {{lu.ssm-non-qualifie}} non qualifié, {{lu.ssm-qualifie}} qualifié, montants horaires et adolescents.",
  intro: [
    "Le salaire social minimum (SSM) est le salaire le plus bas qu'un employeur peut verser. Il s'élève à {{lu.ssm-non-qualifie}} par mois pour un salarié non qualifié de 18 ans et plus.",
    "Un salarié qualifié a droit à 20 % de plus, soit {{lu.ssm-qualifie}}. Pour les adolescents, le minimum est réduit.",
  ],
  comoSeCalcula: [
    "Montant mensuel : celui de la catégorie, pour un temps plein de {{lu.heures-par-mois}} heures par mois.",
    "Montant horaire : le mensuel divisé par {{lu.heures-par-mois}}, à quatre décimales.",
    "Temps partiel : le montant horaire multiplié par les heures prestées.",
  ],
  ejemplo: [
    "Un salarié qualifié à temps plein touche au moins 3.325,59 euros bruts par mois, soit 19,2231 euros de l'heure.",
  ],
  faq: [
    { pregunta: "Qui est un salarié qualifié ?", respuesta: "Celui qui exerce une profession qui demande une qualification sanctionnée par un certificat officiel au moins du niveau DAP ou CATP. D'autres certificats avec une pratique de 2 ou 5 ans, ou une pratique de 10 ans sans certificat, peuvent aussi donner droit au minimum qualifié." },
    { pregunta: "Combien touche un adolescent ?", respuesta: "{{lu.ssm-jeunes[17-18]}} du minimum non qualifié entre 17 et 18 ans, {{lu.ssm-jeunes[15-17]}} entre 15 et 17 ans." },
    { pregunta: "Quand le salaire social minimum augmente-t-il ?", respuesta: "Avec chaque tranche indiciaire, et lorsque la loi le relève. Le gouvernement présente tous les deux ans un rapport sur son évolution." },
  ],
  glosario: [
    { termino: "SSM", definicion: "Salaire social minimum." },
    { termino: "Tranche indiciaire", definicion: "Adaptation des salaires de 2,5 % à l'évolution du coût de la vie." },
  ],
});
