import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.impot-interets-epargne",
  h1: "Impôt sur les intérêts du livret d'épargne en Algérie",
  title: "Intérêts d'épargne en Algérie : impôt et retenue à la source",
  description:
    "Les intérêts d'un livret d'épargne subissent une retenue de {{dz.irg-epargne[0].tasa}} jusqu'à {{dz.irg-epargne[0].hasta}} et de {{dz.irg-epargne[1].tasa}} au-delà. Calculez vos intérêts nets.",
  intro: [
    "La banque ou la caisse d'épargne retient l'IRG à la source sur les intérêts qu'elle verse. Le taux dépend du placement : livret ou compte d'épargne d'un particulier, ou dépôt à terme et autres créances.",
    "Indiquez les intérêts bruts de l'année pour connaître la retenue et le montant net.",
  ],
  comoSeCalcula: [
    "Livret ou compte d'épargne : {{dz.irg-epargne[0].tasa}} libératoire sur la fraction des intérêts jusqu'à {{dz.irg-epargne[0].hasta}}, puis {{dz.irg-epargne[1].tasa}} sur la fraction au-delà.",
    "La retenue de {{dz.irg-epargne[1].tasa}} est un crédit d'impôt qui s'impute sur l'imposition définitive.",
    "Dépôts à terme, bons de caisse et autres créances : {{dz.irg-creances}} sur la totalité des intérêts, également imputable.",
  ],
  faq: [
    {
      pregunta: "Faut-il déclarer les intérêts d'un livret d'épargne ?",
      respuesta:
        "Jusqu'à {{dz.irg-epargne[0].hasta}} d'intérêts, la retenue de {{dz.irg-epargne[0].tasa}} est libératoire. Au-delà, la retenue de {{dz.irg-epargne[1].tasa}} constitue un crédit d'impôt sur l'imposition définitive.",
    },
    {
      pregunta: "Quel taux pour un dépôt à terme ?",
      respuesta: "{{dz.irg-creances}} sur les revenus des créances, dépôts et cautionnements, selon l'article 104 du code des impôts directs et taxes assimilées.",
    },
    {
      pregunta: "Qui prélève la retenue ?",
      respuesta: "La banque ou l'établissement qui verse les intérêts retient l'impôt au moment du paiement et le reverse au Trésor. Le montant crédité sur le livret est déjà net de la retenue.",
    },
  ],
  glosario: [
    { termino: "Retenue à la source", definicion: "Impôt prélevé directement par la banque au moment du versement des intérêts." },
    { termino: "Crédit d'impôt", definicion: "Montant déjà payé qui vient en déduction de l'impôt calculé sur la déclaration annuelle." },
  ],
});
