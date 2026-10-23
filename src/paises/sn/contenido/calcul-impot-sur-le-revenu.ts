import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sn.calcul-impot-sur-le-revenu",
  h1: "Calcul de l'impôt sur le revenu au Sénégal (salariés)",
  title: "Calcul de l'impôt sur le revenu au Sénégal",
  description: "Calculez l'impôt sur le revenu retenu sur votre salaire et la TRIMF, avec le barème du CGI, l'abattement de 30 % et la réduction pour charges de famille.",
  intro: [
    "Inscrivez votre salaire brut mensuel et votre situation de famille pour voir l'impôt sur le revenu et la TRIMF retenus chaque mois.",
    "Le calcul suit le Code général des impôts publié par la Direction générale des Impôts et des Domaines.",
  ],
  comoSeCalcula: [
    "Le salaire brut de l'année est réduit d'un abattement forfaitaire de {{sn.ir-abattement[taux]}}, plafonné à {{sn.ir-abattement[plafond]}}. Le résultat est arrondi au millier de francs inférieur.",
    "Le barème progressif s'applique ensuite : {{sn.ir-bareme[0].tasa}} jusqu'à {{sn.ir-bareme[0].hasta}}, puis de {{sn.ir-bareme[1].tasa}} à {{sn.ir-bareme[-1].tasa}} au-delà de {{sn.ir-bareme[-1].desde}}.",
    "L'impôt est réduit pour charges de famille selon le nombre de parts, entre un minimum et un maximum, et ne peut pas dépasser {{sn.ir-plafond}} du revenu imposable.",
    "La TRIMF est un montant fixe lu dans un tableau selon le revenu brut annuel.",
  ],
  ejemplo: [
    "Un salarié marié avec 2 enfants, dont le conjoint a des revenus, gagne 500 000 francs par mois. Son revenu imposable est de 5 100 000 francs, l'impôt du barème de 1 309 000 francs et la réduction de 300 000 francs : il paie 1 009 000 francs par an, environ 84 083 francs par mois, plus 1 000 francs de TRIMF.",
  ],
  faq: [
    {
      pregunta: "Comment se calcule le nombre de parts?",
      respuesta: "Une part pour une personne seule sans enfant, une part et demie pour une personne mariée, et une demi-part de plus par enfant à charge. Une demi-part s'ajoute quand un seul des conjoints a des revenus. Le maximum est de 5 parts.",
    },
    {
      pregunta: "Quelle est la réduction pour 2 parts?",
      respuesta: "{{sn.ir-reduction-taux[2]}} de l'impôt, avec un minimum de {{sn.ir-reduction-min[2]}} et un maximum de {{sn.ir-reduction-max[2]}}.",
    },
    {
      pregunta: "L'impôt peut-il dépasser un certain taux?",
      respuesta: "Non. Après la réduction, l'impôt ne peut pas dépasser {{sn.ir-plafond}} du revenu imposable.",
    },
  ],
  glosario: [
    { termino: "Abattement forfaitaire", definicion: "La déduction de {{sn.ir-abattement[taux]}} du salaire brut qui représente les cotisations de retraite et les frais professionnels, plafonnée à {{sn.ir-abattement[plafond]}} par an." },
    { termino: "TRIMF", definicion: "Taxe représentative de l'impôt du minimum fiscal, retenue sur les salaires selon un tableau de montants fixes." },
  ],
});
