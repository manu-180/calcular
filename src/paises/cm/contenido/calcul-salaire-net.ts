import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.calcul-salaire-net",
  h1: "Calcul du salaire net au Cameroun",
  title: "Calcul salaire net Cameroun : du brut au net à payer",
  description:
    "Passez du brut au net : IRPP et centimes communaux, pension CNPS de {{cm.cnps-pension[salarie]}}, Crédit foncier, redevance CRTV et taxe de développement local.",
  intro: [
    "Votre bulletin de paie retire du brut plusieurs retenues : l'IRPP et ses centimes additionnels communaux, la pension vieillesse de la CNPS, le Crédit foncier, la redevance audiovisuelle et la taxe de développement local.",
    "Indiquez votre brut taxable du mois. Vous obtenez le net à payer et le détail de chaque retenue, calculés avec le Code général des impôts en vigueur.",
  ],
  comoSeCalcula: [
    "La CNPS retient {{cm.cnps-pension[salarie]}} du brut pour la pension, sur un salaire limité à {{cm.cnps-plafond}} par mois.",
    "L'IRPP se calcule sur l'année : on retire du brut {{cm.irpp-frais-professionnels}} de frais professionnels (au plus {{cm.irpp-plafond-frais}} par an), la pension CNPS, puis un abattement de {{cm.irpp-abattement}}. Le barème va de {{cm.irpp-bareme[0].tasa}} à {{cm.irpp-bareme[-1].tasa}} et l'impôt est divisé par 12.",
    "Les centimes additionnels communaux ajoutent {{cm.cac}} de l'IRPP. Sous {{cm.irpp-seuil-retenue}} de brut par mois, l'employeur ne retient pas d'IRPP.",
    "Le Crédit foncier prend {{cm.cfc-taux[salarie]}} du brut arrondi au millier. La redevance audiovisuelle et la taxe de développement local sont des montants fixes selon votre tranche de salaire.",
  ],
  ejemplo: [
    "Avec 500 000 F bruts : 21 000 F de CNPS, 38 500 F d'IRPP, 3 850 F de centimes communaux, 5 000 F de Crédit foncier, 5 850 F de redevance CRTV et 2 250 F de taxe de développement local. Le net est de 423 550 F.",
  ],
  faq: [
    {
      pregunta: "Pourquoi la pension CNPS ne dépasse-t-elle pas un certain montant ?",
      respuesta: "La cotisation de pension s'applique au salaire dans la limite de {{cm.cnps-plafond}} par mois. Au-delà, la retenue reste la même.",
    },
    {
      pregunta: "Les frais professionnels sont-ils déduits sans justificatif ?",
      respuesta:
        "Oui. Le Code général des impôts retient un forfait de {{cm.irpp-frais-professionnels}} du brut, plafonné à {{cm.irpp-plafond-frais}} par an. Vous n'avez rien à prouver.",
    },
    {
      pregunta: "Quel salaire sert pour la taxe de développement local ?",
      respuesta:
        "Le salaire de base mensuel, sans les primes ni les indemnités. Si vous ne l'indiquez pas, le calcul prend le brut, ce qui peut donner une tranche plus élevée.",
    },
    {
      pregunta: "Les allocations familiales sont-elles imposées ?",
      respuesta:
        "Non. Les allocations à caractère familial et les remboursements de frais liés à l'emploi sont exclus du salaire taxable. Ajoutez-les dans la case prévue : elles vont directement au net.",
    },
  ],
  glosario: [
    { termino: "Brut taxable", definicion: "Salaire, primes, indemnités imposables et avantages en nature, avant toute retenue." },
    { termino: "CAC", definicion: "Centimes additionnels communaux : une majoration de l'IRPP versée aux communes." },
    { termino: "CFC", definicion: "Crédit foncier du Cameroun, qui finance l'habitat. Le salarié et l'employeur y contribuent." },
  ],
});
