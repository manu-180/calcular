import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.irg-revenus-locatifs",
  h1: "Calcul de l'IRG sur les revenus locatifs en Algérie",
  title: "IRG location Algérie 2026 : impôt sur les loyers",
  description:
    "Calculez l'IRG sur vos loyers en Algérie : {{dz.irg-loyers[habitation]}} pour un logement, {{dz.irg-loyers[professionnel]}} pour un local professionnel, libératoire jusqu'à {{dz.irg-loyers-seuil}} par an.",
  intro: [
    "Les loyers tirés d'un logement, d'un local ou d'un terrain loué à titre civil sont soumis à l'IRG au lieu de situation du bien. Pour les loyers modestes, un taux unique s'applique au montant brut et solde l'impôt.",
    "Indiquez le loyer mensuel, le nombre de mois loués et le type de location.",
  ],
  comoSeCalcula: [
    "Location à usage d'habitation : {{dz.irg-loyers[habitation]}} des loyers bruts.",
    "Local commercial ou professionnel non meublé, ou contrat conclu avec une société : {{dz.irg-loyers[professionnel]}}.",
    "Propriété non bâtie : {{dz.irg-loyers[non-bati]}}, ramené à {{dz.irg-loyers[agricole]}} pour une location à usage agricole.",
    "Jusqu'à {{dz.irg-loyers-seuil}} de loyers bruts par an, l'impôt est libératoire. Au-delà, une retenue provisoire de {{dz.irg-loyers[habitation]}} s'impute sur l'IRG global.",
  ],
  ejemplo: ["Un appartement loué 40 000 DA par mois rapporte 480 000 DA par an. L'IRG libératoire est de 33 600 DA, soit 2 800 DA par mois."],
  faq: [
    {
      pregunta: "Quel est le taux de l'impôt sur la location d'un appartement en Algérie ?",
      respuesta: "{{dz.irg-loyers[habitation]}} du loyer brut, tant que les loyers annuels ne dépassent pas {{dz.irg-loyers-seuil}}.",
    },
    {
      pregunta: "Peut-on déduire des charges des loyers ?",
      respuesta: "Non pour l'imposition libératoire : le taux s'applique aux loyers bruts, sans déduction.",
    },
    {
      pregunta: "Que se passe-t-il au-delà de {{dz.irg-loyers-seuil}} de loyers par an ?",
      respuesta:
        "La retenue de {{dz.irg-loyers[habitation]}} n'est plus qu'un acompte. Les loyers entrent dans le revenu global, imposé au barème progressif, et la retenue déjà versée s'en déduit.",
    },
  ],
  glosario: [
    { termino: "Imposition libératoire", definicion: "Impôt qui solde définitivement l'IRG dû sur ce revenu." },
    { termino: "Loyer brut", definicion: "Loyer encaissé avant toute charge ou dépense." },
  ],
});
