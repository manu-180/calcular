import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.ferienrechner",
  h1: "Calcul des vacances en Suisse : droit aux vacances",
  title: "Calcul des vacances Suisse : jours et indemnité",
  description: "Combien de jours de vacances avez-vous ? Au moins {{ch.ferien-wochen}} semaines par an, jusqu'à 20 ans {{ch.ferien-wochen-jugendliche}}. Au prorata en cas de temps partiel, d'entrée ou de départ.",
  intro: [
    "En Suisse, les salariés ont droit à au moins {{ch.ferien-wochen}} semaines de vacances par année de service. Jusqu'à 20 ans révolus, ils en ont {{ch.ferien-wochen-jugendliche}}.",
    "Le calculateur convertit les semaines en jours de vacances, aussi en cas de temps partiel ou si vous n'êtes pas employé toute l'année de service.",
  ],
  comoSeCalcula: [
    "Jours de vacances par an = semaines de vacances × jours de travail par semaine.",
    "Pour une année de service incomplète, les vacances sont proportionnelles à la durée de l'emploi : jours de vacances × mois / 12.",
    "Le supplément vacances théorique pour un salaire horaire correspond aux semaines de vacances divisées par les autres semaines de l'année : 4 / 48 ou 5 / 47.",
  ],
  ejemplo: [
    "Avec une semaine de 3 jours et une demi-année de service, 4 semaines de vacances donnent 6 jours de vacances.",
  ],
  faq: [
    { pregunta: "Combien de jours de vacances ai-je à temps partiel ?", respuesta: "Autant de semaines que les personnes à plein temps. En jours, c'est moins : 4 semaines à raison de 3 jours de travail par semaine donnent 12 jours de vacances." },
    { pregunta: "L'employeur peut-il payer les vacances au lieu de les accorder ?", respuesta: "Non, tant que durent les rapports de travail. Pendant ce temps, les vacances ne peuvent pas être remplacées par des prestations en argent ou d'autres avantages." },
    { pregunta: "Qui fixe la date des vacances ?", respuesta: "L'employeur fixe la date et tient compte de vos souhaits dans la mesure compatible avec les intérêts de l'entreprise. Deux semaines de vacances au moins doivent être consécutives." },
  ],
  glosario: [
    { termino: "Année de service", definicion: "L'année qui commence au début des rapports de travail, et non l'année civile." },
  ],
});
