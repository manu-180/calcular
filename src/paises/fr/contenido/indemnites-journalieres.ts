import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.indemnites-journalieres",
  h1: "Indemnités journalières maladie : calcul pour un salarié",
  title: "Indemnités journalières maladie 2026 : calcul et plafond",
  description:
    "Calculez vos indemnités journalières d'arrêt maladie : {{fr.ij-taux}} du salaire journalier de base, plafond de {{fr.ij-maximum}} par jour et {{fr.ij-carence}} de carence.",
  intro: [
    "Pendant un arrêt maladie, l'Assurance maladie verse au salarié des indemnités journalières (IJ) pour compenser en partie la perte de salaire.",
    "Elles représentent {{fr.ij-taux}} du salaire journalier de base, dans la limite de {{fr.ij-maximum}} par jour, et ne sont versées qu'après un délai de carence de {{fr.ij-carence}}.",
  ],
  comoSeCalcula: [
    "Salaire journalier de base : total des 3 derniers salaires bruts avant l'arrêt ÷ {{fr.ij-diviseur}}.",
    "Les salaires sont pris en compte dans la limite de {{fr.ij-plafond-smic}} fois le Smic mensuel.",
    "Indemnité journalière : {{fr.ij-taux}} du salaire journalier de base, au plus {{fr.ij-maximum}}.",
    "Les premiers {{fr.ij-carence}} de l'arrêt ne sont pas indemnisés, sauf exceptions.",
  ],
  ejemplo: [
    "Avec 2 000 € brut par mois, le salaire journalier de base est de 65,75 € et l'indemnité de 32,87 € par jour. Pour un arrêt de 10 jours, 7 jours sont indemnisés : 230,09 €.",
  ],
  faq: [
    {
      pregunta: "Y a-t-il toujours un délai de carence ?",
      respuesta:
        "Non. Il ne s'applique pas si vous reprenez le travail moins de 48 heures entre deux arrêts, ni pour des arrêts successifs liés à une affection de longue durée (ALD).",
    },
    {
      pregunta: "L'employeur complète-t-il les indemnités ?",
      respuesta:
        "Souvent, oui. Selon votre ancienneté et votre convention collective, l'employeur peut maintenir tout ou partie du salaire en plus des indemnités de l'Assurance maladie.",
    },
    {
      pregunta: "Les indemnités journalières sont-elles imposables ?",
      respuesta: "Oui, les indemnités d'un arrêt maladie ordinaire sont imposables. Certaines sont exonérées, en totalité ou en partie, selon le type d'arrêt.",
    },
  ],
  glosario: [
    { termino: "IJ", definicion: "Indemnités journalières versées par l'Assurance maladie pendant un arrêt de travail." },
    { termino: "Délai de carence", definicion: "Premiers jours d'un arrêt pendant lesquels aucune indemnité n'est versée." },
    { termino: "Salaire journalier de base", definicion: "Moyenne journalière des 3 derniers salaires bruts, qui sert au calcul des IJ." },
  ],
});
