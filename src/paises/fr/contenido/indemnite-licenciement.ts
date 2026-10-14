import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.indemnite-licenciement",
  h1: "Calcul de l'indemnité légale de licenciement",
  title: "Indemnité de licenciement 2026 : calcul du minimum légal",
  description:
    "Calculez l'indemnité légale de licenciement en CDI : 1/4 de mois de salaire par année jusqu'à 10 ans, 1/3 au-delà, sur le salaire le plus favorable.",
  intro: [
    "Un salarié en CDI licencié après au moins {{fr.lic-anciennete-min}} d'ancienneté a droit à une indemnité légale, sauf faute grave ou lourde.",
    "C'est un minimum : si votre convention collective ou votre contrat prévoit plus, c'est le montant le plus élevé qui s'applique.",
  ],
  comoSeCalcula: [
    "Salaire de référence : la moyenne brute des 12 derniers mois ou celle des 3 derniers mois, selon ce qui est le plus favorable.",
    "Jusqu'à {{fr.lic-seuil-annees}} d'ancienneté : 1/{{fr.lic-diviseur-1}} de mois de salaire par année.",
    "Au-delà de {{fr.lic-seuil-annees}} : 1/{{fr.lic-diviseur-2}} de mois de salaire par année supplémentaire.",
    "Les années incomplètes comptent au prorata des mois travaillés.",
  ],
  ejemplo: [
    "Avec un salaire de référence de 1 500 € et 3 ans et 6 mois d'ancienneté : 1 500 × 1/4 × 3,5 = 1 312,50 €.",
    "Avec 12 ans et 9 mois : 1 500 × 1/4 × 10 + 1 500 × 1/3 × 2,75 = 5 125 €.",
  ],
  faq: [
    {
      pregunta: "L'indemnité de licenciement est-elle imposable ?",
      respuesta:
        "L'indemnité légale ou conventionnelle est exonérée d'impôt sur le revenu. Au-delà, l'exonération dépend du montant et de votre rémunération de l'année précédente, dans une limite annuelle. Le calcul de la rupture conventionnelle détaille cette part exonérée.",
    },
    {
      pregunta: "Comment compter l'ancienneté ?",
      respuesta:
        "Le préavis compte dans l'ancienneté, même si l'employeur vous dispense de l'effectuer. En revanche, un arrêt pour maladie non professionnelle n'est pas pris en compte, alors qu'un arrêt pour accident du travail ou maladie professionnelle l'est.",
    },
    {
      pregunta: "Et pour un salarié à temps partiel ?",
      respuesta:
        "L'indemnité est calculée au prorata des périodes à temps plein et à temps partiel. Faites un calcul pour chaque période avec le salaire correspondant, puis additionnez.",
    },
  ],
  glosario: [
    { termino: "Salaire de référence", definicion: "La moyenne mensuelle brute la plus favorable entre les 12 et les 3 derniers mois." },
    { termino: "Faute grave", definicion: "Faute qui rend impossible le maintien du salarié dans l'entreprise, même pendant le préavis." },
    { termino: "Indemnité conventionnelle", definicion: "Indemnité prévue par la convention collective, due si elle est plus élevée que l'indemnité légale." },
  ],
});
