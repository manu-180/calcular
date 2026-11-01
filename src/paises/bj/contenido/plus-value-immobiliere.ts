import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.plus-value-immobiliere",
  h1: "Taxe sur les plus-values immobilières {{anio}} au Bénin",
  title: "Plus-value immobilière {{anio}} au Bénin : taxe de {{bj.tpvi-taux}}",
  description:
    "Calculez la taxe sur la plus-value de la vente d'un terrain ou d'une maison au Bénin : {{bj.tpvi-taux}} de la plus-value, jamais moins de {{bj.tpvi-minimum}} du prix de cession.",
  intro: [
    "Au Bénin, la taxe est de {{bj.tpvi-taux}} de la plus-value. Quand un particulier vend un terrain ou un immeuble plus cher qu'il ne l'a payé, la différence est taxée. La loi fixe aussi un montant minimum, même si la vente ne dégage aucun gain.",
    "Indiquez le prix de vente de la parcelle, celui de la construction s'il y en a une, et le prix d'achat. Le calcul sépare le terrain de la construction comme l'exige la déclaration de cession.",
  ],
  comoSeCalcula: [
    "La plus-value est la différence entre le prix de cession et la valeur d'acquisition établie par des actes de date certaine (articles 111 et 112).",
    "Pour une construction, la plus-value est fixée à {{bj.tpvi-plus-value-construction}} de son prix de cession, et la déclaration doit distinguer la parcelle de la construction (article 113).",
    "Le taux est de {{bj.tpvi-taux}} de la plus-value. Le montant ne peut jamais être inférieur à {{bj.tpvi-minimum}} du prix de cession (article 115).",
  ],
  ejemplo: [
    "Un terrain acheté 8 000 000 F et vendu 20 000 000 F dégage 12 000 000 F de plus-value. La taxe est de 600 000 F, supérieure au minimum de 200 000 F. Un terrain revendu 10 000 000 F après un achat à 12 000 000 F ne dégage aucun gain, mais la taxe minimale de 100 000 F reste due.",
  ],
  faq: [
    {
      pregunta: "Quel est le taux de la taxe sur les plus-values immobilières ?",
      respuesta: "L'article 115 du Code général des impôts fixe {{bj.tpvi-taux}}, avec un minimum de {{bj.tpvi-minimum}} du prix de cession.",
    },
    {
      pregunta: "Comment la plus-value d'une maison est-elle calculée ?",
      respuesta: "L'article 113 fixe la plus-value sur la construction à {{bj.tpvi-plus-value-construction}} de son prix de cession, la parcelle étant traitée à part.",
    },
    {
      pregunta: "Et si je n'ai pas de document d'achat ?",
      respuesta: "L'article 112 prévoit alors une valeur d'acquisition de référence, fixée et révisée par arrêté du ministre chargé des finances. Ce calculateur n'en connaît pas les montants : saisissez le prix d'achat réel.",
    },
  ],
  glosario: [
    { termino: "Prix de cession", definicion: "Le prix auquel l'immeuble est vendu." },
    { termino: "Valeur d'acquisition", definicion: "La somme déboursée pour devenir propriétaire, prouvée par des actes de date certaine." },
    { termino: "Plus-value", definicion: "L'écart entre le prix de cession et la valeur d'acquisition." },
  ],
});
