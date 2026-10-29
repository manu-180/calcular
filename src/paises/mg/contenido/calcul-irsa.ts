import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.calcul-irsa",
  h1: "Calcul de l'IRSA à Madagascar",
  title: "Calcul IRSA {{anio}} Madagascar : barème et simulateur",
  description: "Calculez l'IRSA retenu sur votre salaire avec le barème de la loi de finances 2026, de {{mg.irsa-bareme[1].tasa}} à {{mg.irsa-bareme[-1].tasa}}, et la réduction pour personnes à charge.",
  intro: [
    "L'IRSA (impôt sur les revenus salariaux et assimilés) est retenu chaque mois par l'employeur sur le salaire.",
    "Indiquez votre brut et les cotisations de votre bulletin de paie pour connaître l'impôt du mois et votre salaire après impôt.",
  ],
  comoSeCalcula: [
    "Du brut, on retire les heures supplémentaires exonérées, la cotisation retraite (dans la limite de {{mg.irsa-deductions[retraite]}} du brut) et la cotisation santé (dans la limite de {{mg.irsa-deductions[sante]}}). Le résultat est arrondi à la centaine d'ariary inférieure.",
    "Jusqu'à {{mg.irsa-bareme[0].hasta}}, le taux est nul. Ensuite, chaque tranche paie son taux : {{mg.irsa-bareme[1].tasa}} jusqu'à {{mg.irsa-bareme[1].hasta}}, {{mg.irsa-bareme[2].tasa}} jusqu'à {{mg.irsa-bareme[2].hasta}}, {{mg.irsa-bareme[3].tasa}} jusqu'à {{mg.irsa-bareme[3].hasta}}, {{mg.irsa-bareme[4].tasa}} jusqu'à {{mg.irsa-bareme[4].hasta}} et {{mg.irsa-bareme[-1].tasa}} au-delà.",
    "Au-dessus de {{mg.irsa-bareme[0].hasta}} de revenu imposable, l'impôt baisse de {{mg.irsa-reduction-charge}} par personne à charge. Il ne descend jamais sous {{mg.irsa-minimum}}.",
  ],
  ejemplo: [
    "Pour 1 000 000 Ar bruts avec 10 000 Ar de CNaPS et 10 000 Ar d'OSTIE, le revenu imposable est de 980 000 Ar. L'IRSA est de 103 500 Ar, ou 99 500 Ar avec deux enfants à charge.",
  ],
  faq: [
    {
      pregunta: "Qu'est-ce qui a changé pour l'IRSA en 2026 ?",
      respuesta: "La loi de finances initiale 2026 a ajouté une tranche : la part du revenu imposable au-delà de {{mg.irsa-bareme[-1].desde}} par mois est taxée à {{mg.irsa-bareme[-1].tasa}}. Les autres tranches sont les mêmes qu'en 2025.",
    },
    {
      pregunta: "Un salaire sous {{mg.irsa-bareme[0].hasta}} paie-t-il l'IRSA ?",
      respuesta: "Oui, le minimum de {{mg.irsa-minimum}} par mois. Le barème donne zéro, mais le Code des impôts fixe ce minimum de perception.",
    },
    {
      pregunta: "Qui compte comme personne à charge ?",
      respuesta: "Vos enfants et ceux de votre conjoint de moins de 21 ans au 1er janvier, de moins de 25 ans s'ils étudient, ou infirmes, et vos ascendants sans ressources. Un seul des conjoints en profite : celui qui perçoit les allocations familiales.",
    },
    {
      pregunta: "Les heures supplémentaires sont-elles imposées ?",
      respuesta: "La paie des {{mg.irsa-heures-sup}} premières heures supplémentaires du mois est exonérée. Au-delà, elle entre dans la base de l'IRSA.",
    },
  ],
  glosario: [
    { termino: "IRSA", definicion: "Impôt sur les revenus salariaux et assimilés, retenu à la source par l'employeur." },
    { termino: "Minimum de perception", definicion: "Montant d'impôt le plus bas qu'un salarié imposable paie chaque mois." },
  ],
});
