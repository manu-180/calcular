import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.plus-value-immobiliere",
  h1: "Taxe sur la plus-value immobilière au Togo",
  title: "Plus-value immobilière Togo : calcul de la taxe",
  description:
    "Calculez la taxe sur la plus-value de la vente d'un immeuble ou d'un terrain au Togo : {{tg.plus-value-taux}} de la plus-value, avec réduction après {{tg.plus-value-duree}}.",
  intro: [
    "Le particulier qui vend un immeuble ou un terrain avec un gain paie une taxe libératoire sur la plus-value. Elle est à la charge du vendeur.",
    "Indiquez les prix de vente et d'achat, les frais et la durée de détention pour obtenir la plus-value imposable et la taxe.",
  ],
  comoSeCalcula: [
    "Le prix d'achat est augmenté des frais d'acquisition et des travaux justifiés, ou à défaut d'un forfait de {{tg.plus-value-forfait-travaux}} du prix d'achat.",
    "Après plus de {{tg.plus-value-duree}} de détention, la plus-value est réduite de {{tg.plus-value-reduction[non-bati]}} pour un terrain non bâti et de {{tg.plus-value-reduction[bati]}} pour un autre immeuble.",
    "La taxe est égale à {{tg.plus-value-taux}} de la plus-value imposable.",
  ],
  ejemplo: [
    "Une maison achetée 30 000 000 F et revendue 50 000 000 F après huit ans, sans factures : 11 000 000 F de plus-value, 8 800 000 F après réduction, soit 616 000 F de taxe.",
  ],
  faq: [
    {
      pregunta: "Quelles ventes sont exonérées ?",
      respuesta:
        "La première vente de la résidence principale, les ventes à {{tg.plus-value-seuil}} ou moins, les terrains agricoles et les biens inscrits à l'actif d'une entreprise individuelle.",
    },
    {
      pregunta: "Une moins-value peut-elle compenser une autre vente ?",
      respuesta: "Non. Le Code général des impôts interdit d'imputer la moins-value d'un bien sur la plus-value d'un autre.",
    },
    {
      pregunta: "La taxe s'ajoute-t-elle à l'IRPP ?",
      respuesta: "Non. Elle est libératoire : la plus-value taxée n'est pas soumise une seconde fois à l'impôt sur le revenu.",
    },
  ],
  glosario: [
    { termino: "Plus-value", definicion: "Différence entre le prix de vente et le prix de revient du bien." },
    { termino: "Libératoire", definicion: "Qui solde l'impôt dû sur ce revenu, sans autre imposition." },
  ],
});
