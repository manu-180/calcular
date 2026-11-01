import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ci.calcul-its",
  h1: "Calcul de l'ITS en Côte d'Ivoire",
  title: "Calcul ITS Côte d'Ivoire : impôt sur salaire et RICF",
  description:
    "Calculez l'impôt sur les traitements et salaires (ITS) retenu chaque mois, avec le barème en vigueur et la réduction pour charges de famille.",
  intro: [
    "En Côte d'Ivoire, l'employeur retient chaque mois l'impôt sur les traitements et salaires (ITS). Depuis le 1er janvier 2024, un barème progressif unique s'applique au salaire brut mensuel.",
    "Indiquez votre salaire brut imposable, votre situation de famille et vos enfants à charge. Vous obtenez l'impôt du mois et le nombre de parts retenu.",
  ],
  comoSeCalcula: [
    "La part du salaire jusqu'à {{ci.its-bareme[0].hasta}} n'est pas imposée.",
    "Chaque tranche paie son taux : {{ci.its-bareme[1].tasa}} jusqu'à {{ci.its-bareme[1].hasta}}, {{ci.its-bareme[2].tasa}} jusqu'à {{ci.its-bareme[2].hasta}}, {{ci.its-bareme[3].tasa}} jusqu'à {{ci.its-bareme[3].hasta}}, {{ci.its-bareme[4].tasa}} jusqu'à {{ci.its-bareme[4].hasta}}, puis {{ci.its-bareme[-1].tasa}} au-delà.",
    "On retire ensuite la réduction d'impôt pour charges de famille (RICF), qui dépend du nombre de parts : de {{ci.its-ricf[15]}} par mois pour 1,5 part à {{ci.its-ricf[50]}} pour {{ci.its-parts-max}} parts.",
    "Pour une pension de retraite, on déduit d'abord {{ci.its-abattement-pension}} par mois. Après 70 ans, l'impôt est encore réduit de {{ci.its-abattement-retraite-70-ans}}.",
  ],
  ejemplo: [
    "Avec 300 000 F bruts par mois, sans enfant : 26 400 F sur la tranche à 16 % et 12 600 F sur la tranche à 21 %. L'ITS est de 39 000 F. Marié avec deux enfants (3 parts), la RICF de 22 000 F le ramène à 17 000 F.",
  ],
  faq: [
    {
      pregunta: "Comment compter mes parts ?",
      respuesta:
        "Une personne seule sans enfant a 1 part, un couple marié 2 parts. Chaque enfant à charge ajoute une demi-part, et un point entier s'il est infirme. Le célibataire ou divorcé avec enfants part de 1,5 part. Le total ne dépasse jamais {{ci.its-parts-max}} parts.",
    },
    {
      pregunta: "Quels enfants sont à charge ?",
      respuesta:
        "Les enfants légitimes, naturels reconnus ou adoptés, mineurs ou de moins de 27 ans s'ils poursuivent leurs études, et sans revenus propres. La situation retenue est celle du 1er janvier, ou du 31 décembre si la famille s'agrandit en cours d'année.",
    },
    {
      pregunta: "Les pensions de retraite sont-elles imposées ?",
      respuesta:
        "Oui, au même barème, mais après un abattement de {{ci.its-abattement-pension}} par mois. Une pension inférieure à ce montant ne paie donc pas d'ITS. Les retraités de plus de 70 ans ont en plus un abattement de {{ci.its-abattement-retraite-70-ans}} sur l'impôt.",
    },
    {
      pregunta: "Quelles sommes ne sont pas imposables ?",
      respuesta:
        "Entre autres, les frais de cantine pris en charge par l'employeur dans la limite de 30 000 F par mois et par salarié, et les allocations spéciales pour frais d'emploi dans la limite du dixième de la rémunération totale.",
    },
  ],
  glosario: [
    { termino: "ITS", definicion: "Impôt sur les traitements, salaires, pensions et rentes viagères, retenu à la source par l'employeur." },
    { termino: "RICF", definicion: "Réduction d'impôt pour charges de famille, retirée de l'impôt brut selon le nombre de parts." },
    { termino: "Part", definicion: "Unité qui mesure les charges de famille du salarié." },
  ],
});
