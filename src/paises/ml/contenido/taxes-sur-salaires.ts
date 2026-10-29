import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.taxes-sur-salaires",
  h1: "Calcul des taxes sur les salaires au Mali",
  title: "CFE, TFP, TEJ et taxe logement au Mali : calcul",
  description: "Calculez les taxes patronales sur la masse salariale au Mali : CFE de {{ml.taxes-salaires[cfe]}}, TFP, taxe emploi jeunes et taxe logement de {{ml.taxes-salaires[logement]}}.",
  intro: [
    "En plus des cotisations sociales, l'employeur malien paie chaque mois des taxes calculées sur la masse salariale brute. Elles sont déclarées et versées aux Impôts.",
    "Indiquez la masse salariale du mois et si l'entreprise est soumise à l'impôt sur les sociétés, à l'IBIC ou à l'impôt sur les bénéfices agricoles.",
  ],
  comoSeCalcula: [
    "La contribution forfaitaire à la charge des employeurs (CFE) est de {{ml.taxes-salaires[cfe]}}, la taxe de formation professionnelle (TFP) de {{ml.taxes-salaires[tfp]}} et la taxe emploi jeunes (TEJ) de {{ml.taxes-salaires[tej]}}. Leur base est arrondie aux mille francs inférieurs.",
    "La taxe logement est de {{ml.taxes-salaires[logement]}} de la masse salariale brute. Elle est due par tous les employeurs, publics et privés, et finance le Fonds national du logement.",
    "La base comprend les rémunérations, salaires, indemnités et la valeur réelle des avantages en nature.",
  ],
  ejemplo: ["Pour une masse salariale de 5 000 500 F, l'entreprise paie 175 000 F de CFE, 100 000 F de TFP, 100 000 F de TEJ et 50 005 F de taxe logement, soit 425 005 F."],
  faq: [
    {
      pregunta: "Ces taxes sont-elles retenues sur le salaire ?",
      respuesta: "Non. Elles sont entièrement à la charge de l'employeur et ne réduisent pas le salaire net.",
    },
    {
      pregunta: "Existe-t-il des exonérations de CFE ?",
      respuesta: "Oui. Le CGI exonère de CFE pendant trois ans certains jeunes diplômés de moins de 40 ans à l'embauche, et pendant deux ans les salariés recrutés après un licenciement économique.",
    },
    {
      pregunta: "À quoi servent la TFP et la TEJ ?",
      respuesta: "La TFP finance le Fonds d'appui à la formation professionnelle et à l'apprentissage. La TEJ est affectée au Fonds national pour l'emploi des jeunes.",
    },
  ],
  glosario: [
    { termino: "Masse salariale", definicion: "Le total des rémunérations brutes versées au personnel sur la période." },
    { termino: "CFE", definicion: "Contribution forfaitaire à la charge des employeurs." },
  ],
});
