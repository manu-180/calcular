import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.preavis",
  h1: "Durée du préavis au Togo",
  title: "Préavis Togo : durée légale et indemnité",
  description:
    "Durée minimale du préavis de démission ou de licenciement au Togo selon votre catégorie, et indemnité compensatrice si le préavis n'est pas effectué.",
  intro: [
    "Un CDI se rompt en respectant un préavis donné par la partie qui prend l'initiative : l'employeur en cas de licenciement, le salarié en cas de démission.",
    "Choisissez votre catégorie pour connaître la durée minimale prévue par le Code du travail et l'indemnité correspondante.",
  ],
  comoSeCalcula: [
    "Le préavis minimum est de {{tg.preavis-jours-horaire}} pour les travailleurs payés à l'heure.",
    "Il est de {{tg.preavis-mois[employes]}} pour les ouvriers, employés et assimilés, et de {{tg.preavis-mois[cadres]}} pour les agents de maîtrise et cadres.",
    "Si le préavis n'est pas respecté, la partie responsable verse la rémunération et les avantages de la période non effectuée.",
  ],
  ejemplo: ["Un cadre payé 900 000 F par mois a droit à trois mois de préavis : 2 700 000 F si l'employeur l'en dispense."],
  faq: [
    {
      pregunta: "Puis-je chercher un emploi pendant mon préavis ?",
      respuesta:
        "En cas de licenciement, oui : le Code du travail accorde un jour de liberté par semaine, payé à plein salaire, à prendre en une fois ou heure par heure.",
    },
    {
      pregunta: "L'employeur peut-il me dispenser du préavis ?",
      respuesta: "Oui. Il vous verse alors une indemnité compensatrice pour la période non effectuée, et vous ne pouvez pas refuser la dispense.",
    },
    {
      pregunta: "Et si c'est moi qui demande à partir plus tôt ?",
      respuesta: "L'employeur peut accepter ou refuser. S'il accepte, il ne doit pas d'indemnité pour la partie du préavis non effectuée.",
    },
  ],
  glosario: [
    { termino: "Préavis", definicion: "Délai entre l'annonce de la rupture du contrat et la fin effective du travail." },
    { termino: "Indemnité compensatrice", definicion: "Somme due pour la partie du préavis qui n'a pas été effectuée." },
  ],
});
