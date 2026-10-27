import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.conges-payes",
  h1: "Calcul des jours de congés payés",
  title: "Congés payés Burkina Faso : combien de jours ?",
  description:
    "Calculez vos jours de congé payé : {{bf.conges-jours-par-mois}} par mois de service effectif, plus les jours d'ancienneté et pour enfants à charge.",
  intro: [
    "Tout travailleur a droit à un congé payé à la charge de l'employeur, qui s'acquiert mois après mois.",
    "Indiquez vos mois de service depuis le dernier congé et votre ancienneté. Vous obtenez le nombre de jours auxquels vous avez droit.",
  ],
  comoSeCalcula: [
    "Chaque mois de service effectif donne {{bf.conges-jours-par-mois}} calendaires de congé, sauf convention ou contrat plus favorable.",
    "Après 20, 25 et 30 ans de services dans l'entreprise, le congé augmente de {{bf.conges-anciennete[20]}}, {{bf.conges-anciennete[25]}} et {{bf.conges-anciennete[30]}} ouvrables.",
    "Les salariées et apprenties de moins de {{bf.conges-age-mere}} ont {{bf.conges-par-enfant}} ouvrables en plus par enfant à charge.",
  ],
  ejemplo: ["Douze mois de service donnent 30 jours de congé. Avec 26 ans d'ancienneté, on ajoute 4 jours : 34 jours."],
  faq: [
    {
      pregunta: "Quand puis-je partir en congé ?",
      respuesta: "Le droit de jouissance du congé s'acquiert après douze mois de service effectif.",
    },
    {
      pregunta: "Que deviennent mes jours si je quitte l'entreprise ?",
      respuesta:
        "Une indemnité compensatrice est due si le contrat prend fin avant que vous ayez droit au congé, ou si vous y aviez droit sans avoir pu en profiter.",
    },
    {
      pregunta: "Les permissions pour événements familiaux réduisent-elles le congé ?",
      respuesta: "Non, dans la limite de quinze jours ouvrables par an pour les événements familiaux qui touchent directement votre foyer.",
    },
  ],
  glosario: [
    { termino: "Jours calendaires", definicion: "Tous les jours du calendrier, dimanches et jours fériés compris." },
    { termino: "Jours ouvrables", definicion: "Les jours où l'on peut travailler, hors repos hebdomadaire et jours fériés." },
  ],
});
