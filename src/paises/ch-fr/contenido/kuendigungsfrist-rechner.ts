import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.kuendigungsfrist-rechner",
  h1: "Calcul du délai de congé en Suisse",
  title: "Délai de congé Suisse : dernier jour de travail selon le CO",
  description: "Délai de congé selon le CO : 7 jours pendant le temps d'essai, puis 1, 2 ou 3 mois selon l'année de service, pour la fin d'un mois. Dernier jour de travail.",
  intro: [
    "Sans autre accord, les délais de congé du Code des obligations s'appliquent en Suisse. Ils dépendent de l'année de service et courent jusqu'à la fin d'un mois.",
    "Le calculateur compte à partir du jour où le congé parvient au destinataire. La date d'envoi ne joue aucun rôle dans ce calcul.",
  ],
  comoSeCalcula: [
    "Temps d'essai : congé possible à tout moment avec un délai de 7 jours. Sans accord, le premier mois est le temps d'essai. Il peut être prolongé à trois mois au plus.",
    "Après le temps d'essai : 1 mois pendant la première année de service, 2 mois de la deuxième à la neuvième année, puis 3 mois.",
    "Le délai commence le lendemain de la réception. Les rapports de travail prennent fin le dernier jour du mois au cours duquel le délai expire.",
  ],
  ejemplo: [
    "Une personne employée depuis mars 2020 qui reçoit son congé le 14 octobre 2026 est dans sa 7e année de service. Avec un délai de 2 mois, les rapports de travail prennent fin le 31 décembre 2026.",
  ],
  faq: [
    { pregunta: "Jusqu'à quand le congé doit-il parvenir ?", respuesta: "Selon le calcul de ce calculateur, le délai doit expirer entièrement avant la fin du mois souhaitée. Avec un délai d'un mois, le congé doit parvenir au plus tard le dernier jour du mois précédent." },
    { pregunta: "D'autres délais peuvent-ils être convenus ?", respuesta: "Oui, par écrit, dans un contrat-type ou dans une convention collective. Un délai de moins d'un mois n'est possible que par convention collective et seulement pendant la première année de service." },
    { pregunta: "Qu'est-ce qu'une période de protection ?", respuesta: "Après le temps d'essai, l'employeur ne peut pas résilier, par exemple, pendant une maladie ou un accident non fautif, pendant la grossesse et les 16 semaines qui suivent l'accouchement. En cas de maladie ou d'accident, la protection dure 30 jours la première année de service, 90 jours de la deuxième à la cinquième année, puis 180 jours." },
  ],
  glosario: [
    { termino: "Temps d'essai", definicion: "Les premières semaines d'un emploi, avec un délai de congé court. Sans accord, c'est le premier mois." },
    { termino: "Période de protection", definicion: "Période pendant laquelle l'employeur ne peut pas résilier après le temps d'essai." },
  ],
});
