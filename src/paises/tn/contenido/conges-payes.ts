import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.conges-payes",
  h1: "Calcul des congés payés en Tunisie",
  title: "Congés payés Tunisie : combien de jours selon le code du travail",
  description:
    "Calculez vos jours de congé annuel payé en Tunisie : {{tn.conges-payes[par-mois]}} par mois de travail, jusqu'à {{tn.conges-payes[plafond]}}, davantage pour les moins de 20 ans.",
  intro: [
    "Tout salarié qui a travaillé au moins un mois chez le même employeur pendant l'année a droit à un congé payé, calculé selon le nombre de mois de travail effectif.",
    "Indiquez vos mois de travail et votre âge pour connaître le nombre de jours minimum prévu par le code du travail.",
  ],
  comoSeCalcula: [
    "20 ans ou plus : {{tn.conges-payes[par-mois]}} par mois, au plus {{tn.conges-payes[plafond]}}.",
    "De 18 à 20 ans : {{tn.conges-payes[par-mois-18-a-20-ans]}} par mois, au plus {{tn.conges-payes[plafond-18-a-20-ans]}}.",
    "Moins de 18 ans : {{tn.conges-payes[par-mois-moins-de-18-ans]}} par mois, au plus {{tn.conges-payes[plafond-moins-de-18-ans]}}.",
  ],
  faq: [
    {
      pregunta: "Combien de jours de congé payé par an en Tunisie ?",
      respuesta: "Le code du travail prévoit {{tn.conges-payes[par-mois]}} par mois de travail, soit au plus {{tn.conges-payes[plafond]}} par an pour un adulte. Les conventions collectives accordent souvent davantage.",
    },
    {
      pregunta: "Les jeunes salariés ont-ils plus de congé ?",
      respuesta: "Oui. Les salariés de moins de 18 ans au 31 décembre ont droit à {{tn.conges-payes[par-mois-moins-de-18-ans]}} par mois, et ceux de 18 à 20 ans à {{tn.conges-payes[par-mois-18-a-20-ans]}} par mois.",
    },
    {
      pregunta: "Faut-il une ancienneté minimale ?",
      respuesta: "Il faut au moins un mois de travail effectif chez le même employeur pendant l'année de référence.",
    },
  ],
  glosario: [
    { termino: "Congé annuel payé", definicion: "Repos annuel pendant lequel le salaire reste dû." },
    { termino: "Travail effectif", definicion: "Période pendant laquelle le salarié a réellement travaillé ou une absence assimilée par la loi." },
    { termino: "Convention collective", definicion: "Accord entre employeurs et syndicats d'un secteur, souvent plus favorable que le code." },
  ],
});
