import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.netto-brutto-rechner",
  h1: "Calculer le salaire brut à partir du net",
  title: "Salaire net en brut Suisse : le brut pour votre net",
  description: "Quel salaire brut donne le salaire net souhaité ? Avec AVS/AI/APG, AC, caisse de pension et ANP selon les taux {{anio}}, pour 12 ou 13 salaires mensuels.",
  intro: [
    "Si vous avez un montant net en tête pour une négociation salariale, il vous faut le salaire brut correspondant. Le calculateur indique le salaire brut nécessaire pour qu'il vous reste le montant souhaité.",
    "Le calcul tient compte des cotisations sociales sans les impôts : AVS/AI/APG, AC, la caisse de pension légale et la prime ANP que vous indiquez.",
  ],
  comoSeCalcula: [
    "Le calculateur cherche le salaire brut pour lequel les déductions du calcul brut-net donnent exactement votre salaire net.",
    "L'AVS/AI/APG et l'AC vous coûtent chacune la moitié de {{ch.ahv-iv-eo-beitragssatz}} et de {{ch.alv-beitragssatz}}. La caisse de pension est comptée avec la moitié de la bonification de vieillesse légale.",
    "Si le salaire annuel dépasse {{ch.bvg-eintrittsschwelle}}, la déduction LPP s'ajoute. C'est pourquoi le salaire brut nécessaire fait un saut à ce seuil.",
  ],
  ejemplo: [
    "Pour 5777 francs nets avec 13 salaires mensuels et 35 ans, il faut environ 6500 francs bruts par mois.",
  ],
  faq: [
    { pregunta: "Pourquoi la caisse de pension n'est-elle qu'estimée ?", respuesta: "Chaque caisse de pension a son propre règlement. Le calculateur retient le minimum légal, votre déduction peut être plus élevée." },
    { pregunta: "Les impôts sont-ils pris en compte ?", respuesta: "Non. L'impôt sur le revenu dépend du canton et de la commune. Pour l'impôt fédéral direct, il existe le calculateur de l'impôt fédéral direct." },
    { pregunta: "Que change le 13e salaire ?", respuesta: "Il augmente le salaire annuel. Le salaire coordonné pour la caisse de pension augmente donc lui aussi, et avec lui la déduction LPP mensuelle." },
  ],
  glosario: [
    { termino: "Salaire brut", definicion: "Salaire avant déduction des cotisations sociales et d'un éventuel impôt à la source." },
  ],
});
