import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ci.prime-anciennete",
  "h1": "Calcul de la prime d'ancienneté",
  "title": "Prime d'ancienneté Côte d'Ivoire : taux et montant",
  "description": "Calculez votre prime d'ancienneté : {{ci.prime-anciennete-taux[initial]}} après {{ci.prime-anciennete-annees[debut]}} ans, puis {{ci.prime-anciennete-taux[par-annee]}} de plus par année jusqu'à la 25e.",
  "intro": [
    "La convention collective interprofessionnelle prévoit une prime d'ancienneté pour tout salarié qui reste dans la même entreprise.",
    "Indiquez le salaire minimum de votre catégorie et votre ancienneté. Vous obtenez le taux et le montant mensuel."
  ],
  "comoSeCalcula": [
    "La prime commence à {{ci.prime-anciennete-taux[initial]}} après {{ci.prime-anciennete-annees[debut]}} ans d'ancienneté.",
    "Elle augmente de {{ci.prime-anciennete-taux[par-annee]}} par année de service supplémentaire, jusqu'à la {{ci.prime-anciennete-annees[plafond]}}e année incluse.",
    "Le taux s'applique au salaire minimum de la catégorie, pas au salaire réel."
  ],
  "ejemplo": [
    "Avec 10 ans d'ancienneté et un salaire minimum de catégorie de 150 000 F : 10 %, soit 15 000 F par mois."
  ],
  "faq": [
    {
      "pregunta": "Quelles absences comptent dans l'ancienneté ?",
      "respuesta": "Les congés payés, les congés de maternité, les accidents du travail, les absences pour maladie dans les limites prévues et les stages organisés par l'employeur, entre autres."
    },
    {
      "pregunta": "Où trouver le salaire minimum de ma catégorie ?",
      "respuesta": "Dans la grille de la convention collective de votre secteur. Il figure souvent sur le bulletin de paie."
    },
    {
      "pregunta": "La prime est-elle imposable ?",
      "respuesta": "Oui. Elle fait partie du salaire brut et entre dans la base de l'ITS et des cotisations CNPS."
    }
  ],
  "glosario": [
    {
      "termino": "Ancienneté",
      "definicion": "Le temps passé de façon continue au service de l'entreprise."
    },
    {
      "termino": "Convention collective interprofessionnelle",
      "definicion": "L'accord du 19 juillet 1977 qui s'applique aux secteurs sans convention propre."
    }
  ]
});
