import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.conges-payes",
  h1: "Calcul des congés payés au Mali",
  title: "Congés payés au Mali : jours acquis et allocation",
  description: "Calculez vos jours de congés payés au Mali et l'allocation de congé : {{ml.conges-jours-par-mois}} par mois de travail, plus les jours d'ancienneté et pour enfants.",
  intro: [
    "Au Mali, le droit au congé s'acquiert après douze mois de service. Il se calcule sur la période de référence, de l'embauche ou du retour du dernier congé jusqu'au départ en congé.",
    "Indiquez vos mois de travail, la rémunération perçue sur la période, votre ancienneté et, pour une mère de famille, ses enfants de moins de 15 ans.",
  ],
  comoSeCalcula: [
    "Chaque mois de travail donne {{ml.conges-jours-par-mois}} de congé, soit trente jours par an, jours non ouvrables compris.",
    "L'ancienneté ajoute {{ml.conges-anciennete[1].tasa}} ouvrables après {{ml.conges-anciennete[1].desde}} ans de services, {{ml.conges-anciennete[2].tasa}} après {{ml.conges-anciennete[2].desde}} ans et {{ml.conges-anciennete[-1].tasa}} après {{ml.conges-anciennete[-1].desde}} ans. Les mères de famille ont {{ml.conges-meres-jour-par-enfant}} ouvrable de plus par enfant de moins de 15 ans.",
    "L'allocation de congé est la rémunération totale de la période divisée par {{ml.conges-diviseur-allocation}}. Elle se paie au plus tard la veille du départ en congé.",
  ],
  ejemplo: ["Après une année complète payée 2 400 000 F au total, le salarié a 30 jours de congé et une allocation de 200 000 F."],
  faq: [
    {
      pregunta: "Qu'est-ce qui compte comme temps de travail ?",
      respuesta:
        "Quatre semaines ou 24 jours de travail valent un mois. Comptent aussi les arrêts pour accident du travail, les absences pour maladie constatée dans la limite de six mois, le congé de maternité et les congés spéciaux.",
    },
    {
      pregunta: "Puis-je fractionner mon congé ?",
      respuesta: "Un congé de quinze jours ou moins se prend d'un seul tenant. Au-delà, il peut être fractionné d'accord parties, avec au moins une fraction de quinze jours continus.",
    },
    {
      pregunta: "Peut-on remplacer le congé par une indemnité ?",
      respuesta: "Non. Une telle convention est nulle. Mais si le contrat prend fin avant que vous ayez acquis le droit de prendre le congé, une indemnité calculée sur vos droits acquis vous est payée immédiatement.",
    },
  ],
  glosario: [
    { termino: "Période de référence", definicion: "La période pendant laquelle le salarié acquiert ses jours de congé." },
    { termino: "Allocation de congé", definicion: "La somme versée au salarié pour la durée de son congé." },
  ],
});
