import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.rrsp-contribution-limit",
  h1: "Calcul du plafond de cotisation REER {{anio}}",
  title: "Plafond REER {{anio}} : combien puis-je cotiser?",
  description: "Calculez votre maximum déductible au titre des REER : {{ca.rrsp-earned-income-rate}} du revenu gagné de l'an dernier, jusqu'à {{ca.rrsp-dollar-limit}}, moins le facteur d'équivalence.",
  intro: [
    "Inscrivez votre revenu gagné de l'an dernier, votre facteur d'équivalence et vos droits inutilisés pour voir combien vous pouvez cotiser à votre REER et déduire cette année.",
    "Le plafond annuel en dollars et la règle des {{ca.rrsp-earned-income-rate}} viennent de l'Agence du revenu du Canada.",
  ],
  comoSeCalcula: [
    "Les nouveaux droits correspondent au moins élevé de deux montants : {{ca.rrsp-earned-income-rate}} de votre revenu gagné de l'année précédente, ou le plafond en dollars de cette année ({{ca.rrsp-dollar-limit}} en 2026).",
    "Le facteur d'équivalence d'un régime de retraite de l'employeur est soustrait de ces nouveaux droits.",
    "Les droits inutilisés des années précédentes s'ajoutent. Le total est votre maximum déductible au titre des REER.",
  ],
  ejemplo: [
    "Avec un revenu gagné de 80 000 $ l'an dernier, sans régime de retraite et avec 5 000 $ de droits inutilisés, vos nouveaux droits sont de 14 400 $ et votre maximum est de 19 400 $.",
  ],
  faq: [
    {
      pregunta: "Quel est le plafond REER pour 2026?",
      respuesta: "Le plafond en dollars est de {{ca.rrsp-dollar-limit}}. Vous l'atteignez avec un revenu gagné d'environ 187 834 $ en 2025.",
    },
    {
      pregunta: "Que se passe-t-il si je cotise plus que mon plafond?",
      respuesta: "Les cotisations qui dépassent de plus de 2 000 $ votre maximum déductible sont imposées à 1 % par mois jusqu'à ce que vous les retiriez.",
    },
    {
      pregunta: "Où trouver mon plafond exact?",
      respuesta: "Votre avis de cotisation et Mon dossier de l'ARC indiquent votre maximum déductible au titre des REER pour l'année.",
    },
  ],
  glosario: [
    { termino: "Revenu gagné", definicion: "Le revenu que l'ARC utilise pour les droits de cotisation REER, surtout le revenu d'emploi et de travail autonome." },
    { termino: "Facteur d'équivalence", definicion: "La valeur des prestations acquises dans un régime de retraite de l'employeur, qui réduit vos droits de cotisation REER." },
    { termino: "Droits inutilisés", definicion: "Les droits de cotisation REER des années précédentes que vous n'avez pas utilisés. Ils s'ajoutent aux nouveaux droits." },
  ],
});
