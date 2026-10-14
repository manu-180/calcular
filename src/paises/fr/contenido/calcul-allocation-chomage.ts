import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.allocation-chomage",
  h1: "Calcul de l'allocation chômage (ARE)",
  title: "Calcul allocation chômage 2026 : montant de l'ARE par jour",
  description:
    "Estimez votre allocation chômage (ARE) à partir de votre salaire : formule de France Travail, minimum de {{fr.are-minimum}} par jour et dégressivité.",
  intro: [
    "L'allocation d'aide au retour à l'emploi (ARE) est versée par France Travail aux salariés qui ont perdu leur emploi et remplissent les conditions d'activité antérieure.",
    "Son montant dépend du salaire journalier de référence (SJR), calculé à partir des salaires de la période de référence.",
  ],
  comoSeCalcula: [
    "Allocation journalière brute : le plus élevé entre {{fr.are-partie-fixe}} + {{fr.are-taux-variable}} du SJR, et {{fr.are-taux-minimum}} du SJR.",
    "Elle ne peut pas être inférieure à {{fr.are-minimum}} ni dépasser {{fr.are-taux-maximum}} du SJR.",
    "Une retenue de {{fr.are-retraite}} du SJR finance la retraite complémentaire, sans faire descendre l'allocation sous {{fr.are-minimum}}.",
    "Pour les allocations élevées, une réduction de {{fr.are-degressivite}} s'applique à partir du 7e mois, sans descendre sous {{fr.are-plancher-degressivite}} par jour.",
  ],
  ejemplo: [
    "Avec un salaire de 2 500 € brut par mois, le SJR est d'environ 82,19 €. L'allocation est de 46,85 € brut par jour, 44,38 € après la retenue retraite, soit environ 1 331 € pour un mois de 30 jours.",
  ],
  faq: [
    {
      pregunta: "Combien de temps dure l'indemnisation ?",
      respuesta: "La durée dépend de la période travaillée avant la fin du contrat et de votre âge. Elle est d'au moins 182 jours calendaires.",
    },
    {
      pregunta: "Les allocations ont-elles augmenté en juillet 2026 ?",
      respuesta: "Non. Les montants de juillet 2025 sont restés en vigueur, faute de revalorisation au 1er juillet 2026.",
    },
    {
      pregunta: "Peut-on cumuler l'ARE avec un emploi ?",
      respuesta: "Oui, en partie. Le total de l'allocation et du revenu d'activité ne doit pas dépasser votre salaire journalier de référence sur le mois.",
    },
  ],
  glosario: [
    { termino: "ARE", definicion: "Allocation d'aide au retour à l'emploi, l'allocation chômage des salariés du privé." },
    { termino: "SJR", definicion: "Salaire journalier de référence, moyenne des salaires de la période de référence par jour." },
    { termino: "Dégressivité", definicion: "Baisse de l'allocation à partir du 7e mois pour les montants les plus élevés." },
  ],
});
