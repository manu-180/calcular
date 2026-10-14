import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.prelevement-a-la-source",
  h1: "Prélèvement à la source : taux par défaut et montant",
  title: "Prélèvement à la source 2026 : taux par défaut et montant",
  description:
    "Calculez l'impôt prélevé chaque mois sur votre salaire : taux par défaut de la grille 2026 ou votre taux personnalisé, à partir du net imposable.",
  intro: [
    "Depuis 2019, l'impôt sur le revenu est retenu directement sur le salaire. L'employeur applique un taux au salaire net imposable et reverse la somme à l'administration fiscale.",
    "Si l'administration ne vous a pas encore calculé de taux personnalisé (premier emploi, par exemple), ou si vous avez choisi de ne pas le transmettre, votre employeur applique un taux par défaut fixé par une grille officielle.",
  ],
  comoSeCalcula: [
    "Taux par défaut : on cherche dans la grille la tranche qui correspond à votre salaire net imposable du mois. La grille actuelle s'applique depuis le 1er mai 2026.",
    "Taux personnalisé : c'est celui de votre avis d'impôt, calculé sur vos revenus de l'année précédente.",
    "Montant prélevé = salaire net imposable × taux.",
  ],
  ejemplo: [
    "Avec 2 500 € de net imposable et sans taux personnalisé, le taux par défaut est de 5,3 % : 132,50 € sont retenus sur la paie.",
  ],
  faq: [
    {
      pregunta: "Où trouver mon taux de prélèvement à la source ?",
      respuesta: "Sur votre dernier avis d'impôt, sur votre bulletin de paie et dans votre espace particulier sur impots.gouv.fr.",
    },
    {
      pregunta: "Le taux par défaut est-il plus élevé que mon vrai taux ?",
      respuesta:
        "Il peut l'être, car il ne tient pas compte de votre situation de famille ni des revenus de votre foyer. La différence est régularisée l'année suivante, après votre déclaration de revenus.",
    },
    {
      pregunta: "Sur quel montant s'applique le taux ?",
      respuesta:
        "Sur le salaire net imposable, plus élevé que le net à payer car il inclut une partie de la CSG et la CRDS. Il figure sur chaque bulletin de paie.",
    },
    {
      pregunta: "Peut-on modifier son taux en cours d'année ?",
      respuesta:
        "Oui, dans votre espace sur impots.gouv.fr, en cas de changement de revenus ou de situation de famille (mariage, naissance, séparation).",
    },
  ],
  glosario: [
    { termino: "Taux personnalisé", definicion: "Taux calculé par l'administration à partir de votre dernière déclaration de revenus." },
    { termino: "Taux par défaut", definicion: "Taux appliqué sans taux personnalisé, fixé par une grille selon le salaire du mois." },
    { termino: "Net imposable", definicion: "Le salaire net avant impôt, augmenté de la CSG non déductible et de la CRDS." },
  ],
});
