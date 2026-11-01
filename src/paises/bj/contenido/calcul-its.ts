import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.calcul-its",
  h1: "Calcul de l'ITS au Bénin",
  title: "Calcul ITS Bénin : impôt sur les salaires",
  description:
    "Calculez l'impôt sur les traitements et salaires (ITS) du mois avec le barème du Code général des impôts, tranche par tranche, et la redevance ORTB.",
  intro: [
    "L'impôt sur les traitements et salaires (ITS) est retenu à la source par l'employeur sur chaque paie.",
    "Indiquez le salaire imposable du mois. Vous voyez l'impôt de chaque tranche, le taux moyen et la redevance ORTB de mars ou de juin.",
  ],
  comoSeCalcula: [
    "Le salaire est découpé en tranches. La première, jusqu'à {{bj.its-bareme[0].hasta}}, n'est pas imposée.",
    "Chaque tranche suivante est taxée à son propre taux, de {{bj.its-bareme[1].tasa}} à {{bj.its-bareme[-1].tasa}} au-delà de {{bj.its-bareme[-1].desde}}.",
    "La redevance ORTB s'ajoute en mars ({{bj.its-redevance-ortb[mars]}}) et en juin ({{bj.its-redevance-ortb[juin]}}), sauf en juin pour un salaire de la première tranche.",
  ],
  ejemplo: ["Pour 300 000 F : rien sur les 60 000 premiers francs, puis 9 000, 15 000 et 9 500 F. L'ITS est de 33 500 F, soit un taux moyen de 11,17 %."],
  faq: [
    {
      pregunta: "Le taux de la dernière tranche s'applique-t-il à tout le salaire ?",
      respuesta: "Non. Chaque taux ne touche que la part du salaire comprise dans sa tranche. C'est pourquoi le taux moyen reste plus bas.",
    },
    {
      pregunta: "Qui verse l'ITS aux impôts ?",
      respuesta: "L'employeur établi au Bénin retient l'impôt sur la paie et le reverse au plus tard le 10 du mois suivant.",
    },
    {
      pregunta: "Comment est imposé un treizième mois ?",
      respuesta:
        "Les treizièmes mois et rémunérations exceptionnelles suivent une méthode d'atténuation fondée sur le salaire moyen des douze derniers mois. Utilisez notre calcul dédié.",
    },
  ],
  glosario: [
    { termino: "Tranche", definicion: "Partie du salaire comprise entre deux limites du barème, taxée à un taux propre." },
    { termino: "Taux moyen", definicion: "L'impôt divisé par le salaire imposable." },
  ],
});
