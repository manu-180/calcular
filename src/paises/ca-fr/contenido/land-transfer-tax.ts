import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.land-transfer-tax",
  h1: "Calcul de la taxe de bienvenue (droits de mutation) 2026",
  title: "Calcul de la taxe de bienvenue 2026 au Québec",
  description: "Calculez la taxe de bienvenue (droits de mutation) au Québec avec les taux de 2026, ou les droits de cession en Ontario, à Toronto et en C.-B.",
  intro: [
    "Inscrivez le prix d'achat d'une propriété pour voir les droits de mutation que vous payez à la municipalité après l'achat.",
    "Au Québec, on l'appelle aussi la taxe de bienvenue. Les taux de 2026 viennent de Québec.ca; Montréal a ses propres taux et n'est pas inclus.",
  ],
  comoSeCalcula: [
    "Au Québec, les droits sont de {{ca.qc-transfer-duties[0].tasa}} sur les premiers {{ca.qc-transfer-duties[0].hasta}}, de {{ca.qc-transfer-duties[1].tasa}} jusqu'à {{ca.qc-transfer-duties[1].hasta}} et de {{ca.qc-transfer-duties[2].tasa}} au-delà, en 2026.",
    "Une municipalité peut fixer par règlement un taux plus élevé sur la partie qui dépasse 500 000 $, sans dépasser 3 %, sauf Montréal.",
    "En Ontario, à Toronto et en Colombie-Britannique, le calcul applique les droits de cession de chaque province et les remboursements pour premier acheteur de l'Ontario et de Toronto.",
  ],
  ejemplo: [
    "Au Québec, une propriété de 350 000 $ paie 3 361 $ de droits de mutation : 315 $, 2 521 $ et 525 $ sur chaque tranche.",
  ],
  faq: [
    {
      pregunta: "Sur quel montant les droits sont-ils calculés?",
      respuesta: "Sur le plus élevé de trois montants : le prix payé, le prix indiqué dans l'acte de vente et la valeur marchande de la propriété.",
    },
    {
      pregunta: "Montréal a-t-elle d'autres taux?",
      respuesta: "Oui. La Ville de Montréal peut fixer un taux supérieur à 3 % sur les tranches élevées. Ses taux ne sont pas inclus ici.",
    },
    {
      pregunta: "Qui paie la taxe de bienvenue, et quand?",
      respuesta: "Le nouveau propriétaire. Le droit doit être versé à la municipalité avant le 31e jour qui suit l'envoi du compte, sinon des intérêts courent. Une municipalité peut permettre de payer en plusieurs versements.",
    },
  ],
  glosario: [
    { termino: "Droits de mutation", definicion: "Le droit que la municipalité perçoit lors du transfert d'une propriété, aussi appelé taxe de bienvenue." },
    { termino: "Base d'imposition", definicion: "Le montant sur lequel les droits de mutation sont calculés." },
  ],
});
