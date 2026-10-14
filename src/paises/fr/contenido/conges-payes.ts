import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.conges-payes",
  h1: "Calcul des congés payés : jours acquis et indemnité",
  title: "Calcul congés payés : jours acquis et indemnité 2026",
  description:
    "Combien de jours de congés payés avez-vous acquis et combien serez-vous payé ? Comparaison de la règle du dixième et du maintien de salaire.",
  intro: [
    "Chaque mois de travail effectif donne droit à {{fr.cp-jours-par-mois}} ouvrables de congés payés, soit {{fr.cp-jours-max}} (5 semaines) pour une année complète.",
    "Pendant vos congés, l'employeur verse une indemnité calculée de deux façons. Vous recevez le montant le plus favorable.",
  ],
  comoSeCalcula: [
    "Jours acquis : {{fr.cp-jours-par-mois}} par mois de travail, arrondis au jour supérieur, dans la limite de {{fr.cp-jours-max}} ouvrables.",
    "Règle du dixième : {{fr.cp-dixieme}} de la rémunération brute de la période de référence, pour la totalité des congés. Pour une partie des congés, on applique la proportion des jours pris (sur 25 jours ouvrés par an).",
    "Maintien de salaire : le salaire que vous auriez touché en travaillant. Ici, salaire mensuel × jours de congé ÷ jours ouvrés du mois.",
    "L'employeur compare les deux montants et verse le plus élevé.",
  ],
  ejemplo: [
    "Un salarié a gagné 24 000 € brut sur la période et touche 2 000 € par mois. Il prend 2 semaines, soit 10 jours ouvrés, dans un mois de 21 jours ouvrés.",
    "Maintien : 2 000 × 10 ÷ 21 = 952,38 €. Dixième : 2 400 × 10 ÷ 25 = 960 €. Il reçoit 960 €.",
  ],
  faq: [
    {
      pregunta: "Jours ouvrables ou jours ouvrés ?",
      respuesta:
        "Les jours ouvrables vont du lundi au samedi (6 par semaine). Les jours ouvrés correspondent aux jours réellement travaillés, en général du lundi au vendredi (5 par semaine). 30 jours ouvrables équivalent à 25 jours ouvrés.",
    },
    {
      pregunta: "Acquiert-on des congés pendant un arrêt maladie ?",
      respuesta:
        "Oui. Un arrêt pour maladie non professionnelle donne droit à 2 jours ouvrables par mois, dans la limite de 24 jours par an. Ce calcul porte sur les mois de travail effectif.",
    },
    {
      pregunta: "Quelle est la période de référence ?",
      respuesta:
        "En général du 1er juin de l'année précédente au 31 mai de l'année en cours, sauf si un accord ou une convention collective prévoit une autre période.",
    },
  ],
  glosario: [
    { termino: "Jours ouvrables", definicion: "Tous les jours de la semaine sauf le dimanche et les jours fériés chômés." },
    { termino: "Jours ouvrés", definicion: "Les jours normalement travaillés dans l'entreprise, souvent du lundi au vendredi." },
    { termino: "Règle du dixième", definicion: "Calcul de l'indemnité égale au dixième de la rémunération brute de la période de référence." },
  ],
});
