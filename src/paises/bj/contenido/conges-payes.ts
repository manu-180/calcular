import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.conges-payes",
  h1: "Calcul des congés payés au Bénin ({{anio}})",
  title: "Congés payés {{anio}} au Bénin : {{bj.conges-jours-par-mois}} par mois",
  description: "Calculez vos jours de congé payé au Bénin : {{bj.conges-jours-par-mois}} ouvrables par mois de service, plus l'ancienneté et les enfants à charge.",
  intro: [
    "Le Code du travail béninois accorde {{bj.conges-jours-par-mois}} ouvrables par mois de service. Il donne droit à un congé payé après des mois de service effectif. Le nombre de jours augmente avec l'ancienneté, et les mères de famille peuvent bénéficier de jours en plus.",
    "Indiquez vos mois de service, vos années dans l'entreprise et votre situation. Vous obtenez le congé total et son détail.",
  ],
  comoSeCalcula: [
    "Le travailleur acquiert {{bj.conges-jours-par-mois}} ouvrables de congé par mois de service effectif (article 158).",
    "L'ancienneté ajoute des jours : {{bj.conges-supplement-anciennete[20]}} après 20 ans de service, {{bj.conges-supplement-anciennete[25]}} après 25 ans et {{bj.conges-supplement-anciennete[30]}} après 30 ans. Le congé total ne dépasse pas {{bj.conges-plafond}} ouvrables avec ce supplément.",
    "Les mères de famille de moins de 21 ans reçoivent {{bj.conges-meres[par-enfant]}} par enfant à charge de moins de 15 ans, et {{bj.conges-meres[reduit]}} si leur congé normal ne dépasse pas {{bj.conges-meres[seuil-reduction]}}. Après 21 ans, le supplément ne vaut qu'à partir du quatrième enfant.",
  ],
  ejemplo: [
    "Une salariée qui a travaillé 12 mois a droit à 24 jours ouvrables de congé. Avec 3 ans d'ancienneté, aucun supplément ne s'ajoute encore. Après 20 ans de service, le congé passe à 26 jours.",
  ],
  faq: [
    {
      pregunta: "Combien de jours de congé payé par an au Bénin ?",
      respuesta: "L'article 158 du Code du travail accorde {{bj.conges-jours-par-mois}} ouvrables par mois de service effectif, soit 24 jours pour une année complète.",
    },
    {
      pregunta: "Le samedi compte-t-il comme jour ouvrable ?",
      respuesta: "Oui, sauf s'il est votre jour de repos. L'article 158 entend par jours ouvrables tous les jours de la semaine, à l'exception du jour de repos hebdomadaire et des éventuels jours fériés.",
    },
    {
      pregunta: "Que gagnent les salariés de longue ancienneté ?",
      respuesta: "Selon l'article 158, un supplément de {{bj.conges-supplement-anciennete[20]}} après 20 ans, {{bj.conges-supplement-anciennete[25]}} après 25 ans et {{bj.conges-supplement-anciennete[30]}} après 30 ans, dans la limite de {{bj.conges-plafond}}.",
    },
  ],
  glosario: [
    { termino: "Jour ouvrable", definicion: "Tout jour de la semaine, sauf le jour de repos hebdomadaire et les jours fériés." },
    { termino: "Service effectif", definicion: "Le temps réellement travaillé ou assimilé, qui ouvre droit au congé." },
    { termino: "Ancienneté", definicion: "Le nombre d'années passées dans la même entreprise." },
  ],
});
