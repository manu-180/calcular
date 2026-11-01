import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.calcul-ircm",
  h1: "Calcul de l'IRCM sur dividendes et intérêts",
  title: "IRCM Madagascar : impôt sur dividendes et intérêts",
  description: "Calculez l'impôt sur les revenus des capitaux mobiliers (IRCM) : {{mg.ircm-taux[general]}} après un abattement de {{mg.ircm-abattement-dividendes}} sur les dividendes, {{mg.ircm-taux[cooperative]}} pour les coopératives.",
  intro: [
    "L'IRCM est retenu à la source sur les dividendes, les intérêts de placements et de prêts, les jetons de présence des administrateurs et les revenus des coopératives.",
    "Choisissez la nature du revenu et indiquez le montant brut pour connaître l'impôt et ce que vous percevez.",
  ],
  comoSeCalcula: [
    "Les dividendes bénéficient d'un abattement de {{mg.ircm-abattement-dividendes}}. Les autres revenus sont imposés en totalité.",
    "Le revenu imposable est arrondi au millier d'ariary inférieur, puis taxé à {{mg.ircm-taux[general]}}. Les intérêts sur parts sociales et les ristournes de coopératives sont taxés à {{mg.ircm-taux[cooperative]}}.",
  ],
  ejemplo: ["Pour 10 000 000 Ar de dividendes, la base est de 5 000 000 Ar et l'IRCM de 1 000 000 Ar. L'associé perçoit 9 000 000 Ar."],
  faq: [
    {
      pregunta: "Faut-il redéclarer ces revenus à l'impôt sur les revenus ?",
      respuesta: "Non. L'IRCM est libératoire : sur justification, il tient lieu d'impôt sur les revenus pour les sommes qui l'ont supporté.",
    },
    {
      pregunta: "Les intérêts d'un compte d'épargne sont-ils concernés ?",
      respuesta: "Oui. Les placements bancaires, auprès des assurances et en bons du Trésor (BTA, Bons du Trésor Fihary) sont soumis à l'IRCM.",
    },
    {
      pregunta: "Un non-résident paie-t-il le même taux ?",
      respuesta: "Le Code fixe {{mg.ircm-taux[general]}} sous réserve des conventions fiscales contre la double imposition. Une convention peut prévoir un autre taux.",
    },
  ],
  glosario: [
    { termino: "IRCM", definicion: "Impôt sur les revenus des capitaux mobiliers." },
    { termino: "Libératoire", definicion: "Qui règle définitivement l'impôt sur ce revenu." },
  ],
});
