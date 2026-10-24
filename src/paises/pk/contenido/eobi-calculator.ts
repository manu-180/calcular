import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.eobi-calculator",
  h1: "EOBI contribution calculator",
  title: "EOBI calculator: employer 5% and worker 1% contribution",
  description: "Work out EOBI contributions: {{pk.eobi-employer}} from the employer and {{pk.eobi-employee}} from the worker, on the minimum wage.",
  intro: ["Employers covered by the Employees' Old-Age Benefits Act pay EOBI every month for each insured worker. Enter the minimum wage that applies to see the amounts."],
  comoSeCalcula: [
    "The employer pays {{pk.eobi-employer}} of wages and the insured worker {{pk.eobi-employee}}.",
    "For EOBI, wages means the minimum wage declared for unskilled workers, so the contribution is the same for every insured worker in the same area.",
    "If you leave the wage empty, the federal minimum wage of {{pk.minimum-wage}} is used.",
  ],
  ejemplo: ["On the federal minimum wage of Rs. 40,700, the employer pays Rs. 2,035 and the worker Rs. 407 a month."],
  faq: [
    {
      pregunta: "Which employers must pay EOBI?",
      respuesta: "Industrial and commercial establishments where five or more persons are employed, and others the law brings into the scheme.",
    },
    {
      pregunta: "What does EOBI pay?",
      respuesta: "Old-age pension and other benefits for insured persons, depending on their years of contribution.",
    },
    {
      pregunta: "Is EOBI worked out on my full salary?",
      respuesta: "No. The Act defines wages for EOBI as the declared minimum wage.",
    },
  ],
  glosario: [
    { termino: "EOBI", definicion: "Employees' Old-Age Benefits Institution." },
    { termino: "Insured person", definicion: "A worker registered with EOBI." },
  ],
});
