import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.plus-value-immobiliere",
  h1: "Impôt sur la plus-value immobilière en Algérie",
  title: "Plus-value immobilière Algérie : IRG de {{dz.pv-immo-taux}} et abattement",
  description:
    "La plus-value réalisée sur la vente d'un bien immobilier est soumise à l'IRG de {{dz.pv-immo-taux}}, après un abattement pour durée de détention. Calculez l'impôt à payer.",
  intro: [
    "Le particulier qui vend un logement, un terrain ou un local en dehors de son activité professionnelle paie l'IRG sur la plus-value réalisée, au taux libératoire de {{dz.pv-immo-taux}}.",
    "Indiquez les prix de vente et d'achat, les frais et la durée de détention pour obtenir la plus-value imposable et l'impôt.",
  ],
  comoSeCalcula: [
    "Plus-value = prix de cession moins les droits et frais payés par le vendeur, moins le prix d'acquisition majoré des frais justifiés, retenus dans la limite de {{dz.pv-immo-frais}} du prix d'acquisition.",
    "Sans prix d'acquisition connu, celui-ci est fixé à {{dz.pv-immo-forfait}} du prix de vente.",
    "Abattement de {{dz.pv-immo-abattement[annuel]}} par année de détention, dès {{dz.pv-immo-abattement-debut}} de détention, plafonné à {{dz.pv-immo-abattement[plafond]}}.",
    "IRG = plus-value après abattement × {{dz.pv-immo-taux}}, réduit de {{dz.pv-immo-reduction}} pour la vente de l'unique logement qui sert d'habitation principale.",
  ],
  faq: [
    {
      pregunta: "Quel est le taux d'imposition de la plus-value immobilière ?",
      respuesta: "{{dz.pv-immo-taux}}, libératoire d'impôt, selon l'article 104 du code des impôts directs et taxes assimilées.",
    },
    {
      pregunta: "Comment fonctionne l'abattement pour durée de détention ?",
      respuesta:
        "La plus-value imposable est réduite de {{dz.pv-immo-abattement[annuel]}} par an à compter de la troisième année d'entrée en possession du bien, dans la limite de {{dz.pv-immo-abattement[plafond]}} (article 79 du code des impôts directs).",
    },
    {
      pregunta: "Quand faut-il payer l'impôt ?",
      respuesta: "Le vendeur calcule et paie lui-même l'impôt à la recette des impôts du lieu de situation du bien, dans les trente jours qui suivent l'établissement de l'acte de vente.",
    },
    {
      pregunta: "Quelles ventes sont exonérées ?",
      respuesta:
        "La cession d'un bien dépendant d'une succession pour liquider des droits réels indivis, lorsque l'indivisibilité matérielle ou juridique du bien est justifiée, et la cession d'un bien dans le cadre d'un contrat de financement Mourabaha ou Ijara Mountahia Bitamlik.",
    },
  ],
  glosario: [
    { termino: "Plus-value", definicion: "Gain réalisé lors de la vente : différence positive entre le prix de vente et le prix d'achat." },
    { termino: "Impôt libératoire", definicion: "Impôt qui solde définitivement l'imposition de ce revenu, sans déclaration au barème de l'IRG." },
  ],
});
