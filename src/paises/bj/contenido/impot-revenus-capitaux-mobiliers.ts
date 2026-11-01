import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.impot-revenus-capitaux-mobiliers",
  h1: "Impôt sur les revenus des capitaux mobiliers (IRCM) {{anio}} au Bénin",
  title: "IRCM {{anio}} au Bénin : impôt sur dividendes et intérêts",
  description:
    "Calculez l'impôt sur les dividendes, les obligations et les intérêts au Bénin : {{bj.ircm-taux[dividendes]}} sur les dividendes, {{bj.ircm-taux[creances]}} sur les intérêts de créances et dépôts.",
  intro: [
    "L'IRCM est de {{bj.ircm-taux[dividendes]}} sur les dividendes ordinaires. Il frappe les revenus que rapportent des actions, des obligations, des créances ou des dépôts. Il est retenu à la source par celui qui paie, sur le montant brut.",
    "Choisissez la nature du revenu et saisissez le montant brut. Le calcul donne l'impôt et ce qui revient au bénéficiaire.",
  ],
  comoSeCalcula: [
    "La base est le montant brut des intérêts, arrérages et produits des valeurs mobilières (article 85).",
    "Pour les dividendes, le taux est de {{bj.ircm-taux[dividendes]}}, ramené à {{bj.ircm-taux[dividendes-cotees]}} pour les sociétés cotées dans l'UEMOA et pour les non-résidents, sauf convention plus favorable (article 86).",
    "Les revenus d'obligations sont à {{bj.ircm-taux[obligations]}}, et {{bj.ircm-taux[obligations-publiques]}} pour les obligations d'États de l'UEMOA de cinq à dix ans (article 87). Les intérêts de créances, dépôts et cautionnements sont à {{bj.ircm-taux[creances]}} (article 88).",
  ],
  ejemplo: [
    "Un associé reçoit 5 000 000 F de dividendes d'une société non cotée : l'impôt est de 500 000 F et il touche 4 500 000 F. Sur 400 000 F d'intérêts d'un dépôt, l'impôt à 15 % est de 60 000 F.",
  ],
  faq: [
    {
      pregunta: "Quel taux s'applique aux dividendes au Bénin ?",
      respuesta: "L'article 86 du Code général des impôts retient {{bj.ircm-taux[dividendes]}} pour les dividendes ordinaires et {{bj.ircm-taux[dividendes-cotees]}} pour ceux des sociétés cotées dans l'UEMOA ou versés à des non-résidents.",
    },
    {
      pregunta: "Les obligations d'État sont-elles moins taxées ?",
      respuesta: "L'article 87 fixe {{bj.ircm-taux[obligations-publiques]}} pour les obligations émises par les États de l'UEMOA lorsque leur durée est de cinq à dix ans, contre {{bj.ircm-taux[obligations]}} en règle générale. Ce calculateur ne traite pas les durées supérieures à dix ans.",
    },
    {
      pregunta: "Qui verse l'impôt à l'administration ?",
      respuesta: "L'impôt est dû dès le paiement ou l'inscription des intérêts en compte (article 85), et c'est le débiteur ou la personne qui paie qui le retient.",
    },
  ],
  glosario: [
    { termino: "Valeurs mobilières", definicion: "Actions, parts et obligations qui rapportent des dividendes ou des intérêts." },
    { termino: "Dividende", definicion: "La part du bénéfice d'une société distribuée à ses associés." },
    { termino: "BRVM", definicion: "La Bourse régionale des valeurs mobilières de l'UEMOA." },
  ],
});
