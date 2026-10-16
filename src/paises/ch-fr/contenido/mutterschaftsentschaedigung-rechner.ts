import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.mutterschaftsentschaedigung-rechner",
  h1: "Calcul de l'allocation de maternité",
  title: "Allocation de maternité : calcul de l'indemnité APG 2026",
  description: "Allocation de maternité APG : {{ch.eo-taggeld-satz}} du revenu, au plus {{ch.eo-hoechstbetrag-taggeld}} par jour, pendant {{ch.mutterschaft-tage}} jours. Indemnité et montant total.",
  intro: [
    "Après la naissance, les mères exerçant une activité lucrative reçoivent une allocation de maternité du régime des allocations pour perte de gain (APG). Elle s'élève à {{ch.eo-taggeld-satz}} du revenu moyen avant la naissance, au plus {{ch.eo-hoechstbetrag-taggeld}} par jour.",
    "L'allocation est versée pendant {{ch.mutterschaft-tage}} jours consécutifs, dès le jour de l'accouchement.",
  ],
  comoSeCalcula: [
    "Salariées : salaire mensuel avant la naissance divisé par 30, ce qui donne le revenu par jour.",
    "Indépendantes : revenu annuel soumis à l'AVS divisé par 360.",
    "Indemnité : {{ch.eo-taggeld-satz}} de ce montant, au plus {{ch.eo-hoechstbetrag-taggeld}}. Montant total : indemnité × {{ch.mutterschaft-tage}} jours.",
  ],
  ejemplo: [
    "Pour un salaire mensuel de 5250 francs, l'indemnité journalière s'élève à 140 francs. Pour 98 jours, cela fait 13 720 francs. À partir d'un salaire mensuel de 8250 francs, l'indemnité maximale est atteinte.",
  ],
  faq: [
    { pregunta: "À combien s'élève l'allocation de maternité ?", respuesta: "{{ch.eo-taggeld-satz}} du revenu moyen de l'activité lucrative avant la naissance, au plus {{ch.eo-hoechstbetrag-taggeld}} par jour." },
    { pregunta: "Combien dure le congé de maternité ?", respuesta: "Selon le Code des obligations, au moins 14 semaines. L'allocation est versée pendant {{ch.mutterschaft-tage}} jours dès le jour de l'accouchement." },
    { pregunta: "Que se passe-t-il si le nouveau-né doit rester à l'hôpital ?", respuesta: "Si l'enfant reste à l'hôpital au moins deux semaines juste après la naissance, l'allocation est prolongée de la durée de l'hospitalisation, au plus de 56 jours. La mère doit prouver qu'elle avait l'intention de reprendre une activité après le congé." },
    { pregunta: "Des cotisations sont-elles déduites ?", respuesta: "Oui. Des cotisations AVS/AI/APG sont perçues sur l'allocation et, pour les salariées, aussi la cotisation à l'assurance-chômage." },
  ],
  glosario: [
    { termino: "APG", definicion: "Régime des allocations pour perte de gain. Il verse les allocations en cas de maternité, de paternité et de service." },
  ],
});
