import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.kinderzulagen-rechner",
  h1: "Calcul des allocations familiales : enfants et formation",
  title: "Allocations familiales Suisse 2026 : calcul",
  description: "Allocations familiales en Suisse : allocation pour enfant d'au moins {{ch.kinderzulage}}, de formation d'au moins {{ch.ausbildungszulage}} par mois. Avec les taux de votre canton.",
  intro: [
    "Pour les enfants, il existe en Suisse des allocations familiales. La loi fédérale fixe des montants minimaux : {{ch.kinderzulage}} d'allocation pour enfant et {{ch.ausbildungszulage}} d'allocation de formation professionnelle par mois.",
    "Les cantons peuvent prévoir des taux plus élevés. Indiquez les taux de votre canton si vous les connaissez. Sinon, le calculateur retient le minimum.",
  ],
  comoSeCalcula: [
    "Allocation pour enfant : du mois de la naissance jusqu'à la fin du mois au cours duquel l'enfant atteint 16 ans.",
    "Allocation de formation : dès le début d'une formation postobligatoire, au plus tôt dès le mois où l'enfant atteint 15 ans, jusqu'à la fin de la formation, au plus tard jusqu'à la fin du mois où il atteint 25 ans.",
    "Allocations par mois : nombre d'enfants × allocation pour enfant plus nombre d'enfants en formation × allocation de formation.",
  ],
  ejemplo: [
    "Deux enfants de moins de 16 ans et un enfant en apprentissage donnent au moins 698 francs par mois, 8376 francs par an.",
  ],
  faq: [
    { pregunta: "À combien s'élève l'allocation pour enfant en 2026 ?", respuesta: "Au moins {{ch.kinderzulage}} par enfant et par mois, l'allocation de formation au moins {{ch.ausbildungszulage}}. Les cantons peuvent prévoir des taux minimaux plus élevés ainsi que des allocations de naissance et d'adoption." },
    { pregunta: "Jusqu'à quand l'allocation de formation est-elle versée ?", respuesta: "Jusqu'à la fin de la formation, au plus tard jusqu'à la fin du mois au cours duquel l'enfant atteint 25 ans." },
    { pregunta: "Y a-t-il une allocation pour un enfant incapable d'exercer une activité lucrative ?", respuesta: "Oui. Pour un enfant incapable d'exercer une activité lucrative, l'allocation pour enfant est versée jusqu'à la fin du mois au cours duquel il atteint 20 ans." },
  ],
  glosario: [
    { termino: "Allocation pour enfant", definicion: "Allocation familiale pour les enfants jusqu'à la fin du mois où ils atteignent 16 ans." },
    { termino: "Allocation de formation professionnelle", definicion: "Allocation familiale pour les enfants en formation postobligatoire, au plus jusqu'à 25 ans." },
  ],
});
