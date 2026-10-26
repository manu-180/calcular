import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ci.cout-employeur",
  h1: "Coût d'un salarié pour l'employeur",
  title: "Coût employeur Côte d'Ivoire : charges patronales",
  description:
    "Calculez le coût total d'un salarié : cotisations CNPS patronales, contribution à la charge des employeurs et taxe d'apprentissage.",
  intro: [
    "Embaucher coûte plus que le salaire brut. L'employeur paie en plus ses cotisations CNPS et des contributions fiscales sur les salaires.",
    "Indiquez le salaire brut, la catégorie du salarié et le taux accidents du travail. Vous obtenez le coût par mois et par an.",
  ],
  comoSeCalcula: [
    "Cotisations CNPS patronales : retraite {{ci.cnps-taux[retraite-employeur]}}, prestations familiales {{ci.cnps-taux[prestations-familiales]}}, maternité {{ci.cnps-taux[maternite]}} et accidents du travail selon le secteur.",
    "Contribution à la charge des employeurs : {{ci.contribution-employeur[local]}} pour le personnel local, {{ci.contribution-employeur[expatrie]}} pour le personnel expatrié.",
    "Taxe d'apprentissage : {{ci.taxe-apprentissage}} du salaire brut.",
  ],
  ejemplo: [
    "Un salarié local à 300 000 F bruts, avec 2 % d'accidents du travail : 28 525 F de CNPS et 1 200 F de taxe d'apprentissage. Il coûte 329 725 F par mois.",
  ],
  faq: [
    {
      pregunta: "Le personnel local paie-t-il la contribution employeur ?",
      respuesta:
        "Non. Pour le personnel local, le taux est de {{ci.contribution-employeur[local]}}. Seul le personnel expatrié est soumis au taux de {{ci.contribution-employeur[expatrie]}}.",
    },
    {
      pregunta: "Le calcul inclut-il toutes les charges sur salaires ?",
      respuesta:
        "Il retient les cotisations CNPS, la contribution à la charge des employeurs et la taxe d'apprentissage. Ajoutez les autres charges propres à votre entreprise, comme une mutuelle.",
    },
    {
      pregunta: "Quand verser la contribution et la taxe d'apprentissage ?",
      respuesta:
        "Au plus tard le 15 du mois suivant pour les entreprises des centres des impôts. Les grandes et moyennes entreprises ont des dates du 10 au 20 selon leur activité.",
    },
  ],
  glosario: [
    { termino: "Charges patronales", definicion: "Cotisations et contributions payées par l'employeur en plus du salaire brut." },
    { termino: "Taxe d'apprentissage", definicion: "Taxe additionnelle à la contribution à la charge des employeurs, assise sur les salaires." },
  ],
});
