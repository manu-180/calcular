import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.indemnite-de-depart",
  h1: "Calcul de l'indemnité de départ au Luxembourg",
  title: "Indemnité de départ Luxembourg : calcul selon l'ancienneté",
  description: "Indemnité de départ minimale au Luxembourg : de 1 à 12 mois de salaire selon l'ancienneté à partir de 5 ans, calculée sur les douze derniers mois.",
  intro: [
    "Le salarié en contrat à durée indéterminée licencié par l'employeur a droit à une indemnité de départ à partir de cinq années d'ancienneté.",
    "Elle va d'un mois de salaire après 5 ans à douze mois après 30 ans.",
  ],
  comoSeCalcula: [
    "Ancienneté : appréciée à la date d'expiration du préavis.",
    "Mois dus : 1 mois dès 5 ans, 2 dès 10, 3 dès 15, 6 dès 20, 9 dès 25 et 12 dès 30 ans.",
    "Base : les salaires bruts des douze derniers mois, sans heures supplémentaires ni gratifications.",
  ],
  ejemplo: [
    "Après 12 ans avec un salaire moyen de 4.000 euros, l'indemnité minimale est de 2 mois, soit 8.000 euros.",
  ],
  faq: [
    { pregunta: "Quand l'indemnité est-elle payée ?", respuesta: "Au moment où le salarié quitte effectivement le travail." },
    { pregunta: "Quels salaires comptent ?", respuesta: "Les salaires bruts des douze derniers mois, y compris les indemnités de maladie et les primes courantes, mais sans heures supplémentaires ni gratifications." },
    { pregunta: "Une petite entreprise doit-elle la verser ?", respuesta: "Un employeur de moins de vingt salariés peut opter à la place pour un préavis prolongé." },
  ],
  glosario: [
    { termino: "Ancienneté", definicion: "Durée des services continus chez le même employeur." },
  ],
});
