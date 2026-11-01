import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.conges-payes",
  h1: "Calcul des congés payés au Togo",
  title: "Congés payés Togo : jours acquis et allocation",
  description:
    "Calculez vos congés payés au Togo : {{tg.conges-jours-par-mois}} ouvrables par mois de service et une allocation égale au douzième de la rémunération.",
  intro: [
    "Tout salarié acquiert des congés payés à la charge de l'employeur pour chaque mois de service effectif, sauf convention ou contrat plus favorable.",
    "Indiquez vos mois de service et la rémunération perçue sur la période pour connaître vos jours de congé et l'allocation versée.",
  ],
  comoSeCalcula: [
    "Chaque mois de service effectif donne {{tg.conges-jours-par-mois}} ouvrables de congé, soit 30 jours pour une année.",
    "L'allocation de congé est égale au douzième de la rémunération des douze derniers mois, primes de rendement exclues.",
    "Les absences pour accident du travail, maternité, maladie constatée dans la limite de six mois ou chômage technique ne réduisent pas les droits.",
  ],
  ejemplo: ["Après un an de service avec 3 000 000 F perçus, le salarié a 30 jours ouvrables de congé et une allocation de 250 000 F."],
  faq: [
    {
      pregunta: "Quand puis-je prendre mon congé ?",
      respuesta:
        "Le droit au congé est acquis après un an de service effectif. Les parties peuvent convenir d'un congé au prorata après six mois de travail consécutifs.",
    },
    {
      pregunta: "Peut-on remplacer le congé par de l'argent ?",
      respuesta:
        "Non, sauf convention collective contraire. Seule la rupture du contrat avant le congé donne droit à une indemnité calculée sur les droits acquis.",
    },
    {
      pregunta: "Peut-on reporter son congé ?",
      respuesta: "Oui, d'un commun accord, sans que la période de service ouvrant droit au congé dépasse deux ans.",
    },
  ],
  glosario: [
    { termino: "Jours ouvrables", definicion: "L'unité dans laquelle le Code du travail compte la durée du congé." },
    { termino: "Allocation de congé", definicion: "La somme versée par l'employeur pendant la durée du congé." },
  ],
});
