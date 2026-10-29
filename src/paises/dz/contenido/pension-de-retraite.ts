import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.pension-de-retraite",
  h1: "Calcul de la pension de retraite en Algérie",
  title: "Calcul retraite Algérie : {{dz.retraite[annuite]}} par année validée",
  description:
    "La pension de retraite de la CNR vaut {{dz.retraite[annuite]}} du salaire de référence par année validée, dans la limite de {{dz.retraite[plafond]}}. Estimez votre pension.",
  intro: [
    "La pension de retraite des salariés est versée par la Caisse nationale des retraites (CNR). Elle dépend du nombre d'années validées et du salaire soumis à cotisation retenu comme base de calcul.",
    "Indiquez votre salaire mensuel de référence et vos années validées pour obtenir une estimation de la pension mensuelle avant retenues.",
  ],
  comoSeCalcula: [
    "Taux de la pension = {{dz.retraite[annuite]}} × nombre d'années validées, chaque trimestre comptant pour un quart d'année.",
    "Le taux ne peut pas dépasser {{dz.retraite[plafond]}}.",
    "Pension mensuelle = salaire mensuel de référence × taux.",
    "Conditions : {{dz.retraite-conditions[age]}} au moins, ou {{dz.retraite-conditions[age-femme]}} pour une femme qui le demande, et {{dz.retraite-conditions[duree]}} de travail.",
  ],
  faq: [
    {
      pregunta: "À quel âge peut-on partir à la retraite en Algérie ?",
      respuesta:
        "À {{dz.retraite-conditions[age]}} au moins. Une femme peut partir à sa demande à partir de {{dz.retraite-conditions[age-femme]}} révolus. La loi n° 16-15 a supprimé la retraite sans condition d'âge à compter du 1er janvier 2017.",
    },
    {
      pregunta: "Combien d'années faut-il pour une retraite à taux plein ?",
      respuesta: "À {{dz.retraite[annuite]}} par année validée, il faut 32 années pour atteindre le taux maximal de {{dz.retraite[plafond]}}.",
    },
    {
      pregunta: "Peut-on continuer à travailler après 60 ans ?",
      respuesta: "Oui. Le salarié peut choisir de poursuivre son activité pendant cinq ans au plus après l'âge légal, période pendant laquelle l'employeur ne peut pas prononcer sa mise à la retraite.",
    },
  ],
  glosario: [
    { termino: "CNR", definicion: "Caisse nationale des retraites, qui liquide et verse les pensions des salariés." },
    { termino: "Année validée", definicion: "Année de travail ou assimilée prise en compte pour le calcul de la pension." },
  ],
});
