import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.vaterschaftsentschaedigung-rechner",
  h1: "Calcul de l'allocation de paternité",
  title: "Congé de paternité : calcul de l'allocation APG {{anio}}",
  description: "Allocation pour le congé de l'autre parent : {{ch.eo-taggeld-satz}} du revenu, au plus {{ch.eo-hoechstbetrag-taggeld}} par jour, pour {{ch.vaterschaft-taggelder}} indemnités journalières.",
  intro: [
    "L'autre parent, le plus souvent le père, a droit à deux semaines de congé après la naissance. Le régime des APG verse pour cela une allocation de {{ch.eo-taggeld-satz}} du revenu, au plus {{ch.eo-hoechstbetrag-taggeld}} par jour.",
    "Au total, il y a {{ch.vaterschaft-taggelder}} indemnités journalières. Le congé peut être pris dans les six mois qui suivent la naissance, par semaines ou par jours.",
  ],
  comoSeCalcula: [
    "Salariés : salaire mensuel divisé par 30. Indépendants : revenu annuel divisé par 360.",
    "Indemnité : {{ch.eo-taggeld-satz}} de ce montant, au plus {{ch.eo-hoechstbetrag-taggeld}}.",
    "Allocation : indemnité × {{ch.vaterschaft-taggelder}} indemnités journalières. En cas de congé par semaines, 7 indemnités sont versées par semaine. Par jours, 2 indemnités s'ajoutent pour 5 jours pris.",
  ],
  ejemplo: [
    "Pour un salaire mensuel de 6000 francs, l'indemnité journalière s'élève à 160 francs. Pour 14 indemnités, cela fait 2240 francs.",
  ],
  faq: [
    { pregunta: "À combien s'élève l'allocation de paternité ?", respuesta: "{{ch.eo-taggeld-satz}} du revenu moyen avant la naissance, au plus {{ch.eo-hoechstbetrag-taggeld}} par jour, pour {{ch.vaterschaft-taggelder}} indemnités journalières au plus." },
    { pregunta: "Jusqu'à quand dois-je prendre le congé ?", respuesta: "Dans les six mois qui suivent la naissance de l'enfant. Vous pouvez le prendre en une fois, par semaines ou par jours." },
    { pregunta: "Qui y a droit ?", respuesta: "Le père légal au moment de la naissance ou dans les six mois qui suivent, ainsi que l'épouse de la mère si elle est l'autre parent légal au moment de la naissance." },
  ],
  glosario: [
    { termino: "Congé de l'autre parent", definicion: "Deux semaines de congé payé après la naissance, le plus souvent appelé congé de paternité." },
  ],
});
