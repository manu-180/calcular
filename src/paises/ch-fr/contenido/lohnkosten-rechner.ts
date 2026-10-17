import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.lohnkosten-rechner",
  h1: "Coût employeur en Suisse : ce que coûte un poste",
  title: "Coût employeur Suisse : cotisations patronales 2026",
  description: "Que coûte un salaire brut à l'employeur ? AVS/AI/APG, AC, caisse de pension, caisse d'allocations familiales et accidents professionnels par mois et par an.",
  intro: [
    "Au salaire brut s'ajoutent pour l'employeur ses propres cotisations sociales. Il paie la moitié de l'AVS/AI/APG et de l'AC, au moins la moitié de la caisse de pension et toute la prime d'assurance contre les accidents professionnels.",
    "La cotisation à la caisse d'allocations familiales varie selon le canton. Indiquez le taux de votre caisse ainsi que la prime de votre assureur-accidents.",
  ],
  comoSeCalcula: [
    "AVS/AI/APG : la moitié de {{ch.ahv-iv-eo-beitragssatz}} sur le salaire brut.",
    "AC : la moitié de {{ch.alv-beitragssatz}} jusqu'au gain maximal assuré de {{ch.hoechster-versicherter-verdienst}} par an.",
    "Caisse de pension : l'employeur paie au moins autant que l'ensemble de ses salariés. Sans votre indication, le calculateur retient la moitié de la bonification de vieillesse légale sur le salaire coordonné.",
    "CAF et accidents professionnels : le taux indiqué. Comme l'AC, la prime AP ne s'applique que jusqu'au gain maximal assuré.",
  ],
  ejemplo: [
    "Un salaire de 6500 francs (13 salaires mensuels, 35 ans) coûte environ 7288 francs par mois avec 1,5 % de CAF et 0,5 % d'AP. Sur l'année, cela fait environ 94 500 francs.",
  ],
  faq: [
    { pregunta: "Qui paie l'assurance contre les accidents professionnels ?", respuesta: "Les primes de l'assurance des accidents et maladies professionnels sont à la charge de l'employeur. La prime des accidents non professionnels est à la charge du salarié, sauf accord plus favorable." },
    { pregunta: "L'employeur doit-il payer la moitié de la caisse de pension ?", respuesta: "Il doit payer au moins autant que l'ensemble de ses salariés. Il peut payer davantage s'il y consent." },
    { pregunta: "Que manque-t-il dans ce calcul ?", respuesta: "Les frais d'administration de la caisse de compensation AVS, les cotisations prévues par une convention collective et les prestations volontaires. Vérifiez-les dans vos contrats." },
  ],
  glosario: [
    { termino: "CAF", definicion: "Caisse d'allocations familiales. Elle verse les allocations familiales et perçoit pour cela des cotisations sur les salaires." },
    { termino: "AP", definicion: "Assurance contre les accidents professionnels. Sa prime est à la charge de l'employeur." },
  ],
});
