import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.income-tax-calculator",
  h1: "Calcul de l'impôt sur le revenu 2026 au Québec",
  title: "Calcul de l'impôt 2026 : fédéral et Québec",
  description: "Estimez votre impôt fédéral et du Québec pour 2026, avec votre taux moyen et votre taux marginal. Aussi pour les autres provinces et territoires.",
  intro: [
    "Inscrivez vos revenus et votre province ou votre territoire pour voir combien d'impôt vous payez en 2026, réparti entre le fédéral et le provincial.",
    "Au Québec, le calcul utilise la table d'impôt du ministère des Finances du Québec et réduit l'impôt fédéral de l'abattement du Québec de {{ca.qc-abatement}}.",
  ],
  comoSeCalcula: [
    "Le revenu imposable est votre revenu d'emploi et vos autres revenus, moins les déductions REER et de régime de retraite et les cotisations supplémentaires au RRQ.",
    "L'impôt fédéral applique les tranches de 2026, puis soustrait les crédits au taux fédéral le plus bas : le montant personnel de base, le montant canadien pour emploi de {{ca.canada-employment-amount}}, et vos cotisations de base au RRQ, à l'assurance-emploi et au RQAP. Pour un résident du Québec, il est ensuite réduit de {{ca.qc-abatement}}.",
    "L'impôt du Québec se calcule sur le revenu imposable moins la déduction pour travailleurs, avec la table de {{ca.qc-tax-brackets[0].tasa}} à {{ca.qc-tax-brackets[-1].tasa}} et le montant personnel de base de {{ca.qc-bpa}}.",
    "Le taux marginal est l'impôt sur vos 100 prochains dollars de revenu.",
  ],
  ejemplo: [
    "Un salarié du Québec qui gagne 70 000 $ en 2026 paie 6 041,47 $ d'impôt fédéral après l'abattement et 7 527,62 $ d'impôt du Québec, pour un total de 13 569,09 $. Son taux marginal est de 36,12 %.",
  ],
  faq: [
    {
      pregunta: "Est-ce mon remboursement d'impôt?",
      respuesta: "Non. C'est l'impôt que vous devez pour l'année. Votre remboursement ou votre solde à payer est la différence entre ce montant et l'impôt déjà retenu sur votre paie.",
    },
    {
      pregunta: "Quels sont les taux d'imposition du Québec en 2026?",
      respuesta: "{{ca.qc-tax-brackets[0].tasa}} jusqu'à {{ca.qc-tax-brackets[0].hasta}}, {{ca.qc-tax-brackets[1].tasa}} jusqu'à {{ca.qc-tax-brackets[1].hasta}}, {{ca.qc-tax-brackets[2].tasa}} jusqu'à {{ca.qc-tax-brackets[2].hasta}} et {{ca.qc-tax-brackets[3].tasa}} au-delà.",
    },
    {
      pregunta: "Les autres crédits d'impôt sont-ils inclus?",
      respuesta: "Non. Le calcul compte le montant personnel de base, la déduction pour travailleurs et, au fédéral, le montant canadien pour emploi et les cotisations. Les autres crédits réduiraient encore votre impôt.",
    },
  ],
  glosario: [
    { termino: "Revenu imposable", definicion: "Votre revenu après les déductions, comme les cotisations REER. Les tranches d'imposition s'appliquent à ce montant." },
    { termino: "Taux marginal", definicion: "Le taux combiné fédéral et provincial sur le prochain dollar gagné." },
    { termino: "Abattement du Québec", definicion: "Une réduction de {{ca.qc-abatement}} de l'impôt fédéral de base pour les résidents du Québec." },
  ],
});
