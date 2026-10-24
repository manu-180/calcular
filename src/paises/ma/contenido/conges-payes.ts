import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ma.conges-payes",
  h1: "Calcul des congés payés au Maroc",
  title: "Congés payés Maroc : {{ma.conges-payes[par-mois]}} par mois de service",
  description:
    "Calculez vos jours de congé annuel payé selon le code du travail : {{ma.conges-payes[par-mois]}} par mois de service, plus des jours pour l'ancienneté, jusqu'à {{ma.conges-payes[maximum]}}.",
  intro: [
    "Après six mois de service continu dans la même entreprise, tout salarié a droit à un congé annuel payé. Sa durée dépend des mois de service et de l'ancienneté.",
    "Indiquez vos mois de service sur la période et votre ancienneté. Vous voyez le nombre de jours ouvrables de congé.",
  ],
  comoSeCalcula: [
    "{{ma.conges-payes[par-mois]}} de travail effectif par mois de service, ou {{ma.conges-payes[par-mois-moins-de-18-ans]}} pour les salariés de moins de 18 ans.",
    "Plus {{ma.conges-payes[par-tranche-de-5-ans]}} par période entière de cinq années de service.",
    "Cette augmentation ne peut pas porter le congé au-delà de {{ma.conges-payes[maximum]}}.",
  ],
  ejemplo: ["Un salarié qui a travaillé toute l'année et compte 7 ans d'ancienneté a droit à 18 jours, plus 1,5 jour pour ancienneté, soit 19,5 jours."],
  faq: [
    {
      pregunta: "Ces règles peuvent-elles être plus favorables ?",
      respuesta: "Oui. Le contrat de travail, la convention collective, le règlement intérieur ou les usages peuvent prévoir davantage de jours.",
    },
    {
      pregunta: "Les cinq ans d'ancienneté doivent-ils être continus ?",
      respuesta: "Non. Le code du travail parle de périodes entières de cinq années de service, continues ou non.",
    },
    {
      pregunta: "Comment comptent les jeunes salariés ?",
      respuesta: "Les salariés de moins de 18 ans acquièrent {{ma.conges-payes[par-mois-moins-de-18-ans]}} par mois de service au lieu de {{ma.conges-payes[par-mois]}}.",
    },
  ],
  glosario: [
    { termino: "Congé annuel payé", definicion: "Les jours de repos rémunérés auxquels le salarié a droit chaque année." },
    { termino: "Jour ouvrable", definicion: "Un jour de travail effectif, compté dans la durée du congé." },
  ],
});
